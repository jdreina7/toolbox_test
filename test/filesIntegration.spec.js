/* eslint-disable no-unused-expressions */
const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
// const { handleFilesData } = require('../controllers/filesController.js')
// const services = require('../services/filesService.js')
const server = require('../index.js')
const { mockFilesListResponse } = require('./mocks.js')

chai.should()
chai.use(chaiHttp)

describe('Controller Integration Tests', () => {
  afterEach(() => {
    sinon.restore() // Restaurar mocks después de cada test
  })

  describe('1- Integration fetchAllFiles', () => {
    it('1.1- Should fetch all files in the external endpoint', (done) => {
      chai.request(server)
        .get('/files/list')
      // eslint-disable-next-line n/handle-callback-err
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.be.eql(mockFilesListResponse)
          res.body.should.have.property('filesListResult')
          res.body.should.have.property('filesListResult').property('success')
          res.body.should.have.property('filesListResult').property('files')
          res.body.should.have.property('filesListResult').property('files').eql(mockFilesListResponse.filesListResult.files)
          done()
        })
    })
  })
})
