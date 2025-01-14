import fetch from 'node-fetch'

import { FAILED_FETCHING_DATA_FOR_FILE, FAILED_FETCHING_FILES, FAILED_FETCHING_FILES_LIST, INTERNAL_SERVER_ERROR_FETCHING_DATA_FOR_FILE, INTERNAL_SERVER_ERROR_LISTING_FILES_LIST } from '../utils/contants.js'

const BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret'
const BEARER_TOKEN = 'Bearer aSuperSecretKey'

// Fetch list of files from external API
export const fetchFilesData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/files`, {
      headers: {
        Authorization: BEARER_TOKEN
      }
    })

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: `${FAILED_FETCHING_FILES} ${response.statusText}`
      }
    }

    const data = await response.json()
    return { success: true, files: data.files }
  } catch (error) {
    console.error(FAILED_FETCHING_FILES_LIST, error.message)
    return {
      success: false,
      status: 500,
      message: INTERNAL_SERVER_ERROR_LISTING_FILES_LIST
    }
  }
}

// OPTIONAL POINT: Fetch individual file data from external API
export const fetchFileData = async (fileName) => {
  try {
    const response = await fetch(`${BASE_URL}/file/${fileName}`, {
      headers: {
        Authorization: BEARER_TOKEN
      }
    })

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: `${FAILED_FETCHING_DATA_FOR_FILE} ${fileName}: ${response.statusText}`
      }
    }

    const text = await response.text()
    const lines = text.split('\n').slice(1) // Skip header row
    const filteredLines = lines.filter((line) => line.trim() !== '') // Remove empty lines

    return {
      success: true,
      lines: filteredLines
    }
  } catch (error) {
    console.error(`${FAILED_FETCHING_DATA_FOR_FILE} ${fileName}:`, error.message)
    return {
      success: false,
      status: 500,
      message: `${INTERNAL_SERVER_ERROR_FETCHING_DATA_FOR_FILE} ${fileName}`
    }
  }
}
