import React, { useRef, useEffect } from "react";

/**
 * 瀑布流卡片组件
 * @param {Object} props
 * @param {Object} props.data - 卡片数据
 * @param {Function} props.onHeightChange - 高度变化回调函数
 */
const Card = ({ data, onHeightChange }) => {
  const cardRef = useRef(null);

  // 监测卡片高度变化
  useEffect(() => {
    if (cardRef.current && onHeightChange) {
      // 获取实际渲染高度
      const height = cardRef.current.offsetHeight;
      onHeightChange(height);

      // 使用ResizeObserver监听尺寸变化
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { height } = entry.contentRect;
          onHeightChange(height);
        }
      });

      resizeObserver.observe(cardRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [onHeightChange]);

  return (
    <div
      ref={cardRef}
      className="waterfall-card"
      style={{
        boxSizing: "border-box",
        backgroundColor: data.color,
        padding: "16px",
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease",
        height: data.height ? `${data.height}px` : "auto",
      }}
    >
      <div style={{ margin: "0 0 8px 0" }}>{data.title}</div>
      <div style={{ margin: 0 }}>{data.content}</div>
    </div>
  );
};

export default Card;
