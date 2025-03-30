let input = [
  {
    id: 1,
    val: "学校",
    parentId: null,
  },
  {
    id: 2,
    val: "班级1",
    parentId: 1,
  },
  {
    id: 3,
    val: "班级2",
    parentId: 1,
  },
  {
    id: 4,
    val: "学生1",
    parentId: 2,
  },
  {
    id: 5,
    val: "学生2",
    parentId: 3,
  },
  {
    id: 6,
    val: "学生3",
    parentId: 3,
  },
];

const arrToTree = (arr, config = {}) => {
  const res = [];

  const { id = "id", parentId = "parentId", children = "children" } = config;

  // 第一步：创建节点映射表，便于快速查找节点
  const map = new Map();

  // 为每个节点创建一个副本，并初始化children数组
  arr.forEach((node) => {
    map.set(node[id], { ...node, [children]: [] });
  });

  // 第二步：构建树形结构
  arr.forEach((node) => {
    const nodeId = node[id];
    const parent = map.get(node[parentId]);
    // 如果找到父节点，将当前节点添加到父节点的children数组中
    if (parent) {
      parent[children].push(map.get(nodeId));
    } else {
      // 如果没有找到父节点，说明当前节点是根节点，直接添加到结果数组
      res.push(map.get(nodeId));
    }
  });
  return res;
};
console.log(arrToTree(input));
