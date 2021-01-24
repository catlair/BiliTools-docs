Object.copy = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

Object.isEmpty = function (obj) {
  return JSON.stringify(obj) === '{}'
}
