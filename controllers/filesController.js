import { fetchFilesData, fetchFileData } from '../services/filesService.js'

export const getFilesData = async (req, res) => {
  const filesListResult = await fetchFilesData()

  if (!filesListResult.success) {
    return res.status(filesListResult.status).json({ message: filesListResult.message })
  }

  const files = filesListResult.files
  const successResults = []
  const errorResults = []

  for (const fileName of files) {
    const fileDataResult = await fetchFileData(fileName)

    if (!fileDataResult.success) {
      errorResults.push({
        file: fileName,
        error: fileDataResult.message.includes('empty')
          ? 'Empty file'
          : 'Incomplete data'
      })
      continue
    }

    const lines = fileDataResult.lines.map((line, i) => {
      const [file, text, number, hex] = line.split(',')

      // Ensure data integrity
      if (!file || !text || !number || !hex) {
        errorResults.push({ file: fileName, error: 'Incomplete data', errorLine: i + 1 })
        return null
      }

      return { text, number: parseInt(number, 10), hex }
    }).filter((line) => line !== null)

    if (lines.length === 0) {
      errorResults.push({ file: fileName, error: 'Empty file' })
    } else {
      successResults.push({ file: fileName, lines })
    }
  }

  res.status(200).json({ successData: successResults, errorsData: errorResults })
}
