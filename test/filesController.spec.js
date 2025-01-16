/* eslint-disable no-unused-expressions */
const chai = require('chai')
const sinon = require('sinon')

const { handleFilesData, fetchAllFiles } = require('../controllers/filesController.js')
const services = require('../services/filesService.js')
const utils = require('../utils/index.js')
const { mockFileDataWithoutErrors, mockFileDataWithErrors, mockFilteredLinesFromAPI, mockFilesListResultShort, mockFilesListResult } = require('./mocks.js')

const { expect } = chai

describe('Controller Unit Tests', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('1- fetchAllFiles', () => {
    it('1.1- Should return the list of files', async () => {
      const req = {}
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(services, 'fetchFilesData').resolves(mockFilesListResult)

      await fetchAllFiles(req, res)

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.calledWith({ filesListResult: mockFilesListResult })).to.be.true
    })

    it('1.2- Should handle errors when fetching file list fails', async () => {
      const req = {}
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(services, 'fetchFilesData').resolves({
        success: false,
        status: 500,
        message: 'Failed to fetch files'
      })

      await fetchAllFiles(req, res)

      expect(res.status.calledWith(500)).to.be.true
      expect(res.json.calledWith({ message: 'Failed to fetch files' })).to.be.true
    })
  })

  describe('2- HandleFilesData', () => {
    it('2.1- Should return transformed data for a single file', async () => {
      const req = { query: { fileName: 'test2.csv' } }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(services, 'fetchFileData').resolves(mockFilteredLinesFromAPI)
      sinon.stub(utils, 'transformFileLines').resolves(mockFileDataWithErrors)

      await handleFilesData(req, res)

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.calledWith(mockFileDataWithErrors)).to.be.true
    })

    it('2.2- Should return a list of transformed data for all files', async () => {
      const req = { query: {} }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(services, 'fetchFilesData').resolves(mockFilesListResultShort)
      sinon.stub(services, 'fetchFileData').resolves(mockFilteredLinesFromAPI)
      sinon.stub(utils, 'transformFileLines').resolves(mockFileDataWithoutErrors)

      await handleFilesData(req, res)

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.called).to.be.true
    })

    it('2.3- Should handle errors when a file fetch fails', async () => {
      const req = { query: { fileName: 'test2.csv' } }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(services, 'fetchFileData').resolves({
        success: false,
        status: 404,
        message: 'File not found'
      })

      await handleFilesData(req, res)

      expect(res.status.calledWith(404)).to.be.true
      expect(res.json.calledWith({ success: false, message: 'File not found' })).to.be.true
    })
  })
})
