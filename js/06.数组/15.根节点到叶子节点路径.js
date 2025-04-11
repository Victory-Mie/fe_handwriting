// 后端返回一个数组的树，每个节点有id、name和pid，输入叶子节点的name，输出从根节点到这个叶子的路径
const treeData = [
  { id: "1", name: "总裁办", pid: "" },
  { id: "2", name: "财务部", pid: "1" },
  { id: "3", name: "财务核算部", pid: "2" },
  { id: "4", name: "薪资管理部", pid: "2" },
  { id: "5", name: "技术部", pid: "1" },
  { id: "6", name: "java技术部", pid: "5" },
  { id: "7", name: "spring技术部", pid: "6" },
];

function findPathByLeafName(tree, leafName) {
  const path = [];

  function traverse(node, currentPath) {
    if (!node) return;
    currentPath.push(node.name);
    if (node.name === leafName) {
      path.push([...currentPath]);
      return;
    }
    // 遍历子节点,进行深度优先遍历
    for (const child of tree) {
      if (child.pid === node.id) {
        traverse(child, currentPath.slice()); // 复制一份路径
      }
    }
    currentPath.pop();
  }

  // 查找根节点并开始遍历
  //   const rootNodes = tree.filter((item) => item.pid === "");
  for (const root of treeData) {
    if (root.pid === "") traverse(root, []);
  }

  return path.length ? path : null; // 返回路径或 null
}

// 测试
const leafName = "spring技术部";
const result = findPathByLeafName(treeData, leafName);
console.log(result); // 输出: ['总裁办', '技术部', 'java技术部', 'spring技术部']
