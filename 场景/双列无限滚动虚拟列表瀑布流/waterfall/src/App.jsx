import { useState, useCallback } from "react";
import "./App.css";

// 导入瀑布流组件和模拟数据
import Waterfall from "./components/Waterfall";
import Card from "./components/Card";
import { initialItems, loadMoreItems } from "./data/mockData";

function App() {
  // 瀑布流数据状态
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 加载更多数据
  const handleLoadMore = useCallback(() => {
    if (loading) return;

    setLoading(true);

    // 模拟异步加载
    setTimeout(() => {
      const newItems = loadMoreItems(items.length);
      setItems((prevItems) => [...prevItems, ...newItems]);

      // 模拟数据上限，加载到100条数据后停止
      if (items.length + newItems.length >= 100) {
        setHasMore(false);
      }

      setLoading(false);
    }, 800);
  }, [items.length, loading]);

  // 渲染卡片
  const renderCard = useCallback((item, index) => {
    return <Card key={item.id} data={item} />;
  }, []);

  // 预估卡片高度（可选）
  const getItemHeight = useCallback((item) => {
    return item.height || 200;
  }, []);

  return (
    <div
      className="app-container"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <h1>双列无限滚动虚拟列表瀑布流</h1>
      <p style={{ marginBottom: "20px" }}>
        高性能瀑布流组件，支持虚拟列表和无限滚动加载
      </p>

      <Waterfall
        items={items}
        renderItem={renderCard}
        getItemHeight={getItemHeight}
        columnGap={16}
        rowGap={16}
        containerHeight={600}
        loadMore={handleLoadMore}
        hasMore={hasMore}
        overscan={5}
      />
    </div>
  );
}

export default App;
