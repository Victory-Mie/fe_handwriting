function parseUrlParams(url) {
  const search = new URL(url).search.substring(1);
  const params = {};
  if (search) {
    const paramPairs = search.split("&");
    paramPairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      params[key] = decodeURIComponent(value || "");
    });
  }
  return params;
}

// 示例用法
const url = "https://example.com?name=John&age=30";
const paramsObject = parseUrlParams(url);
console.log(paramsObject);
