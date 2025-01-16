const services = require('../services/filesService.js')
const { ERROR_TYPE_EMPTY, ERROR_TYPE_INCOMPLETE_DATA, FAILED_FETCHING_FILES_LIST, INTERNAL_SERVER_ERROR_FETCHING_DATA, INTERNAL_SERVER_ERROR_LISTING_FILES, INTERNAL_SERVER_ERROR_LISTING_FILES_LIST } = require('../utils/contants.js')
const { transformFileLines } = require('../utils/index.js')

const handleFilesData = async (req, res) => {
  const { fileName } = req.query

  if (fileName) {
    try {
      const fileData = await services.fetchFileData(fileName)

      if (!fileData.success) {
        return res.status(fileData.status).json({
          success: false,
          message: fileData.message
        })
      }

      const { lines, errors } = await transformFileLines(fileName, fileData)

      return res.status(200).json({ file: fileName, lines, errors })
    } catch (error) {
      console.error(INTERNAL_SERVER_ERROR_FETCHING_DATA, error.message)

      return res.status(500).json({
        success: false,
        message: INTERNAL_SERVER_ERROR_FETCHING_DATA
      })
    }
  } else {
    try {
      const filesListResult = await services.fetchFilesData()

      if (!filesListResult.success) {
        return res.status(filesListResult.status).json({ message: filesListResult.message })
      }

      const files = filesListResult.files
      const successResults = []
      const errorResults = []

      for (const fileName of files) {
        const fileDataResult = await services.fetchFileData(fileName)

        if (!fileDataResult.success) {
          errorResults.push({
            file: fileName,
            error: fileDataResult.message.includes('empty')
              ? ERROR_TYPE_EMPTY
              : ERROR_TYPE_INCOMPLETE_DATA
          })
          continue
        }

        const { lines, errors } = await transformFileLines(fileName, fileDataResult)

        if (errors.length > 0) {
          errorResults.push(...errors)
        }

        if (lines.length === 0) {
          errorResults.push({ file: fileName, error: ERROR_TYPE_EMPTY })
        } else {
          successResults.push({ file: fileName, lines })
        }
      }

      res.status(200).json({ successData: successResults, errorsData: errorResults })
    } catch (error) {
      console.error(INTERNAL_SERVER_ERROR_LISTING_FILES, error.message)

      return res.status(500).json({
        success: false,
        message: INTERNAL_SERVER_ERROR_LISTING_FILES
      })
    }
  }
}

const fetchAllFiles = async (req, res) => {
  try {
    const filesListResult = await services.fetchFilesData()

    if (!filesListResult.success) {
      return res.status(filesListResult.status).json({ message: filesListResult.message })
    }

    res.status(200).json({ filesListResult })
  } catch (error) {
    console.error(FAILED_FETCHING_FILES_LIST, error.message)
    return {
      success: false,
      status: 500,
      message: INTERNAL_SERVER_ERROR_LISTING_FILES_LIST
    }
  }
}

module.exports = { handleFilesData, fetchAllFiles }
