
// 通过url获取参数
export function urlParse() {
  let url = window.location.search;
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg)
  // ['?id=1234', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).substr('=')
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val
    })
  }
  return obj;
}