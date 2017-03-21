'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var uploadImageCtrlStub = {
  create: 'uploadImageCtrl.create',
};

var routerStub = {
  post: sinon.spy()
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

  describe('POST /api/upload-images', function() {

    it.skip('should route to uploadImage.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'uploadImageIndex.upload', 'uploadImageCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

});
