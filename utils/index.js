const { ERROR_TYPE_INCOMPLETE_DATA } = require('./contants.js')

const transformFileLines = async (fileName, data) => {
  const errors = []
  const lines = data.lines.map((line, i) => {
    const [file, text, number, hex] = line.split(',')

    // Ensure data integrity
    if (!file || !text || !number || !hex) {
      errors.push({ file: fileName, error: ERROR_TYPE_INCOMPLETE_DATA, errorLine: i + 1 })
      return null
    }

    return { text, number: parseInt(number, 10), hex }
  }).filter((line) => line !== null)

  return { lines, errors }
}

module.exports = { transformFileLines }
