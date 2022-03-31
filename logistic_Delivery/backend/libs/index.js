module.exports.caculateWarningPackage = ({ gross, height, width, length }) => {
  if (!Number(gross) || !Number(height) || !Number(width) || !Number(length)) {
    return true
  }
  const score = 1000000 * Number(gross) / (Number(height) * Number(width) * Number(length));
  return 140 > score || score > 250
}