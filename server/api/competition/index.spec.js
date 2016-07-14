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

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

// require the index with our stubbed out modules
var competitionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './competition.controller': competitionCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Competition API Router:', function() {

  it('should be authenticated and return an express router instance', function() {
    expect(competitionIndex).to.equal(routerStub);
  });

  describe('GET /api/competitions', function() {

    it('should be authenticated and route to competition.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'competitionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/competitions/:id', function() {

    it('should be authenticated and route to competition.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'competitionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/competitions', function() {

    it('should be authenticated and route to competition.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'competitionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/competitions/:id', function() {

    it('should be authenticated and route to competition.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'authService.isAuthenticated', 'competitionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/competitions/:id', function() {

    it('should be authenticated and route to competition.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'authService.isAuthenticated', 'competitionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/competitions/:id', function() {

    it('should be authenticated and route to competition.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.isAuthenticated', 'competitionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
