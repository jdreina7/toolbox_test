import fetch from 'node-fetch'

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
        message: `Failed to fetch files list: ${response.statusText}`
      }
    }

    const data = await response.json()
    return { success: true, files: data.files }
  } catch (error) {
    console.error('Error fetching files list:', error.message)
    return {
      success: false,
      status: 500,
      message: 'Internal server error while fetching files list'
    }
  }
}

// Fetch individual file data from external API
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
        message: `Failed to fetch file data for ${fileName}: ${response.statusText}`
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
    console.error(`Error fetching data for file ${fileName}:`, error.message)
    return {
      success: false,
      status: 500,
      message: `Internal server error while fetching file data for ${fileName}`
    }
  }
}
