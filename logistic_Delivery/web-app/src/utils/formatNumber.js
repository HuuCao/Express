export default function formatNumber(num) {
  if (!num) return 0;
  try {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  } catch ({ error }) {
    return 0;
  }
}
