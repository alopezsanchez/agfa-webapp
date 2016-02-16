'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var competitionCtrlStub = {
  index: 'competitionCtrl.index',
  show: 'competitionCtrl.show',
  create: 'competitionCtrl.create',
  update: 'competitionCtrl.update',
  destroy: 'competitionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var competitionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './competition.controller': competitionCtrlStub
});

describe('Competition API Router:', function() {

  it('should return an express router instance', function() {
    expect(competitionIndex).to.equal(routerStub);
  });

  describe('GET /api/competitions', function() {

    it('should route to competition.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'competitionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/competitions/:id', function() {

    it('should route to competition.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'competitionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/competitions', function() {

    it('should route to competition.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'competitionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/competitions/:id', function() {

    it('should route to competition.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'competitionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/competitions/:id', function() {

    it('should route to competition.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'competitionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/competitions/:id', function() {

    it('should route to competition.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'competitionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
