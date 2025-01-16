const mockFilesListResult = {
  success: true,
  files: [
    'test1.csv',
    'test2.csv',
    'test3.csv',
    'test18.csv',
    'test4.csv',
    'test5.csv',
    'test6.csv',
    'test9.csv',
    'test15.csv'
  ]
}

const mockFilesListResponse = {
  filesListResult: {
    success: true,
    files: [
      'test1.csv',
      'test2.csv',
      'test3.csv',
      'test18.csv',
      'test4.csv',
      'test5.csv',
      'test6.csv',
      'test9.csv',
      'test15.csv'
    ]
  }
}

const mockFilesListResultShort = {
  success: true,
  files: ['test2.csv', 'test3.csv', 'test18.csv']
}

const mockFileDataWithErrors = {
  file: 'test2.csv',
  lines: [
    {
      text: 'JZBFbFXzFjKQSVof',
      number: 110,
      hex: '85366e832977798819d0eb9c1d920579'
    }
  ],
  errors: [
    {
      file: 'test2.csv',
      error: 'Incomplete data',
      errorLine: 1
    }
  ]
}

const mockFileDataWithoutErrors = {
  success: true,
  lines: [{ text: 'Example', number: 1, hex: 'abc' }]
}

const mockFilteredLinesFromAPI = {
  success: true,
  lines: [
    'test2.csv,oULmU',
    'test2.csv,JZBFbFXzFjKQSVof,110,85366e832977798819d0eb9c1d920579'
  ]
}

module.exports = { mockFilesListResponse, mockFilesListResult, mockFileDataWithErrors, mockFileDataWithoutErrors, mockFilteredLinesFromAPI, mockFilesListResultShort }
