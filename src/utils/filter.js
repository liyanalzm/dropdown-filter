export const filterList = (value, list, matchFromStart) => {
  const filteredItems = list.filter(item => {
    return matchFromStart ? item.label.toLowerCase().startsWith(value.toLowerCase()) : item.label.toLowerCase().indexOf(value.toLowerCase()) >= 0
  })

  return filteredItems
}