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

// 方法二
const getUrlParams = (url) => {
  const arrSearch = url.split("?").pop().split("#").shift().split("&");
  let obj = {};
  arrSearch.forEach((item) => {
    const [k, v] = item.split("=");
    obj[k] = v;
    return obj;
  });
  return obj;
};

// test
const url2 = "http://sample.com/?a=1&b=2&c=xx&d=2#hash";
const paramsObject2 = getUrlParams(url2);
console.log(paramsObject2);
