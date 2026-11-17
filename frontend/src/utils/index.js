// 项目名缩写：占位封面与角标使用（去空格取前两字，拉丁字母大写）
export function abbr(name) {
  return (name || '').replace(/\s+/g, '').slice(0, 2).toUpperCase()
}
