'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var uploadImageCtrlStub = {
  index: 'uploadImageCtrl.index',
  show: 'uploadImageCtrl.show',
  create: 'uploadImageCtrl.create',
  update: 'uploadImageCtrl.update',
  destroy: 'uploadImageCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var multerStub = {
  single(file) {
    return 'multer.single.' + file;
  }
}

// require the index with our stubbed out modules
var uploadImageIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './upload-image.controller': uploadImageCtrlStub,
  //'multer': multerStub
});

describe('UploadImage API Router:', function() {

  it('should return an express router instance', function() {
    expect(uploadImageIndex).to.equal(routerStub);
  });

  describe('GET /api/upload-images', function() {

    it('should route to uploadImage.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'uploadImageCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/upload-images/:id', function() {

    it('should route to uploadImage.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'uploadImageCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/upload-images', function() {

    it.skip('should route to uploadImage.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'uploadImageIndex.upload', 'uploadImageCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/upload-images/:id', function() {

    it('should route to uploadImage.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'uploadImageCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/upload-images/:id', function() {

    it('should route to uploadImage.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'uploadImageCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/upload-images/:id', function() {

    it('should route to uploadImage.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'uploadImageCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
