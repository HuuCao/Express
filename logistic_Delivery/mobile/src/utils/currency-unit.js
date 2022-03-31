export function StringToVND(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ"
}

export function VNDToString(value) {
  return value.replaceAll(",", "").replace("VNĐ", "")
}
