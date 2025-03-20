/**
 * 模拟瀑布流数据
 * 包含不同高度的卡片数据，用于测试瀑布流组件
 */

// 生成随机高度的卡片数据
const generateMockItems = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `卡片 ${index + 1}`,
    height: Math.floor(Math.random() * 200) + 100, // 随机高度 100-300px
    color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 80%)`, // 随机颜色
    content: `这是卡片内容 ${index + 1}，高度随机生成,测试瀑布流布局效果。`,
  }));
};

// 初始数据
const initialItems = generateMockItems(20);

// 模拟加载更多数据
const loadMoreItems = (currentCount) => {
  return generateMockItems(10).map((item) => ({
    ...item,
    id: currentCount + item.id,
  }));
};

export { initialItems, loadMoreItems };
