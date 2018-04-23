
export function isAvailable(item: any) {
  return !isNotAvailable(item);
}

export function exists(item: any) {
  return isAvailable(item);
}

export function isNotAvailable(item: any) {
  return item == undefined || item == null || item == '';
}
