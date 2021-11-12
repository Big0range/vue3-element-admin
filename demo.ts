function debounce(func: Function, wait = 1000, immediate?: boolean) {
  const timeout = setTimeout(() => {}, wait)
  return (...arg: any) => {
    if (timeout) return false
  }
}
