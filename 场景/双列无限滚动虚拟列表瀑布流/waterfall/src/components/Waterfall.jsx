import { useState, useRef, useEffect, useCallback } from "react";

/**
 * 双列无限滚动虚拟列表瀑布流组件
 * @param {Object} props
 * @param {Array} props.items - 要显示的数据项数组
 * @param {Function} props.renderItem - 渲染每个数据项的函数
 * @param {Function} props.getItemHeight - 获取每个数据项高度的函数（可选，默认使用动态测量）
 * @param {number} props.columnGap - 列间距（像素）
 * @param {number} props.rowGap - 行间距（像素）
 * @param {number} props.containerHeight - 容器高度（像素）
 * @param {Function} props.loadMore - 加载更多数据的回调函数
 * @param {boolean} props.hasMore - 是否还有更多数据可加载
 * @param {number} props.overscan - 可视区域外预渲染的项数
 */
const Waterfall = ({
  items = [],
  renderItem,
  getItemHeight,
  columnGap = 16,
  rowGap = 16,
  containerHeight = 800,
  loadMore,
  hasMore = false,
  overscan = 5,
}) => {
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const loadingRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const itemsRef = useRef({});

  // 存储每列的当前高度
  const [columnHeights, setColumnHeights] = useState([0, 0]);

  // 存储每个项的位置信息
  const [positions, setPositions] = useState([]);

  // 可视区域的起始和结束索引
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });

  // 容器宽度
  const [containerWidth, setContainerWidth] = useState(0);

  // 计算每列的宽度
  const getColumnWidth = useCallback(() => {
    if (!containerWidth) return 0;
    return (containerWidth - columnGap) / 2;
  }, [containerWidth, columnGap]);

  // 初始化容器宽度
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);

      // 监听容器大小变化
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });

      resizeObserver.observe(containerRef.current);
      resizeObserverRef.current = resizeObserver;

      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current);
        }
      };
    }
  }, []);

  // 计算项的位置
  const calculatePositions = useCallback(() => {
    if (!items.length || !containerWidth) return;

    const columnWidth = getColumnWidth();
    const newColumnHeights = [0, 0];
    const newPositions = [];

    items.forEach((item, index) => {
      // 确定放入哪一列（选择高度较小的列）
      const columnIndex = newColumnHeights[0] <= newColumnHeights[1] ? 0 : 1;

      // 计算项的高度（如果提供了getItemHeight函数则使用，否则使用默认高度）
      let itemHeight = 200; // 默认高度
      if (getItemHeight) {
        itemHeight = getItemHeight(item, index, columnWidth);
      }

      // 计算项的位置
      const position = {
        left: columnIndex === 0 ? 0 : columnWidth + columnGap,
        top: newColumnHeights[columnIndex],
        width: columnWidth,
        height: itemHeight,
      };

      newPositions[index] = position;

      // 更新列高度
      newColumnHeights[columnIndex] += itemHeight + rowGap;
    });

    setPositions(newPositions);
    setColumnHeights(newColumnHeights);
  }, [items, containerWidth, getColumnWidth, getItemHeight, columnGap, rowGap]);

  // 当数据项或容器宽度变化时重新计算位置
  useEffect(() => {
    calculatePositions();
  }, [items, containerWidth, calculatePositions]);

  // 动态测量实际渲染后的项高度并更新位置
  const updateItemHeight = useCallback(
    (index, height) => {
      if (!positions[index] || positions[index].height === height) return;

      const newPositions = [...positions];
      const oldHeight = newPositions[index].height;
      const columnIndex = newPositions[index].left === 0 ? 0 : 1;
      const heightDiff = height - oldHeight;

      // 更新当前项的高度
      newPositions[index] = {
        ...newPositions[index],
        height,
      };

      // 更新后续同列项的位置
      let currentTop = newPositions[index].top + height + rowGap; // 加上行间距

      for (let i = index + 1; i < newPositions.length; i++) {
        const currColumnIndex = newPositions[i].left === 0 ? 0 : 1;
        if (currColumnIndex === columnIndex) {
          newPositions[i] = {
            ...newPositions[i],
            top: currentTop,
          };
          currentTop += newPositions[i].height + rowGap; // 加上行间距
        }
      }

      // 更新列高度
      const newColumnHeights = [...columnHeights];
      newColumnHeights[columnIndex] = currentTop - rowGap; // 减去最后一个多余的行间距

      setPositions(newPositions);
      setColumnHeights(newColumnHeights);
    },
    [positions, columnHeights, rowGap]
  );

  // 设置IntersectionObserver监听滚动
  useEffect(() => {
    if (!loadMore || !hasMore) return;

    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        loadMore();
      }
    }, options);

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore]);

  // 计算可视区域内的项
  const calculateVisibleItems = useCallback(() => {
    if (!containerRef.current || !positions.length) return;

    const scrollTop = containerRef.current.scrollTop;
    const viewportTop = scrollTop;
    const viewportBottom = scrollTop + containerHeight;

    let startIndex = 0;
    let endIndex = positions.length - 1;

    // 找到第一个底部在可视区域内的项
    for (let i = 0; i < positions.length; i++) {
      const itemBottom = positions[i].top + positions[i].height;
      if (itemBottom >= viewportTop - overscan * positions[i].height) {
        startIndex = Math.max(0, i);
        break;
      }
    }

    // 找到最后一个顶部在可视区域内的项
    for (let i = startIndex; i < positions.length; i++) {
      if (positions[i].top > viewportBottom + overscan * positions[i].height) {
        endIndex = i - 1;
        break;
      }
    }

    setVisibleRange({ start: startIndex, end: endIndex });
  }, [positions, containerHeight, overscan]);

  // 监听滚动事件
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      calculateVisibleItems();
    };

    container.addEventListener("scroll", handleScroll);

    // 初始计算
    calculateVisibleItems();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [calculateVisibleItems]);

  // 当项位置变化时重新计算可视区域
  useEffect(() => {
    calculateVisibleItems();
  }, [positions, calculateVisibleItems]);

  // 渲染可见的项
  const renderVisibleItems = () => {
    if (!positions.length) return null;

    return items
      .slice(visibleRange.start, visibleRange.end + 1)
      .map((item, relativeIndex) => {
        const index = visibleRange.start + relativeIndex;
        const position = positions[index];

        if (!position) return null;

        return (
          <div
            key={index}
            ref={(el) => {
              itemsRef.current[index] = el;

              // 如果元素存在且没有getItemHeight函数，则测量实际高度
              if (el && !getItemHeight) {
                const actualHeight = el.offsetHeight;
                if (actualHeight && actualHeight !== position.height) {
                  updateItemHeight(index, actualHeight);
                }
              }
            }}
            style={{
              position: "absolute",
              left: position.left,
              top: position.top,
              width: position.width,
              height: getItemHeight ? position.height : "auto",
              boxSizing: "border-box",
            }}
          >
            {renderItem(item, index)}
          </div>
        );
      });
  };

  // 计算容器的总高度
  const containerStyle = {
    position: "relative",
    height: containerHeight,
    overflow: "auto",
    width: "100%",
  };

  // 计算内容的总高度
  const contentHeight = Math.max(...columnHeights) || 0;

  const contentStyle = {
    position: "relative",
    height: contentHeight,
    width: "100%",
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={contentStyle}>{renderVisibleItems()}</div>
      {hasMore && (
        <div
          ref={loadingRef}
          style={{ textAlign: "center", padding: "20px 0" }}
        >
          加载中...
        </div>
      )}
    </div>
  );
};

export default Waterfall;
