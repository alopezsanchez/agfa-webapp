'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var teamCtrlStub = {
  index: 'teamCtrl.index',
  show: 'teamCtrl.show',
  create: 'teamCtrl.create',
  upsert: 'teamCtrl.upsert',
  update: 'teamCtrl.update',
  destroy: 'teamCtrl.destroy'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var teamIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './team.controller': teamCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Team API Router:', function() {
  it('should return an express router instance', function() {
    expect(teamIndex).to.equal(routerStub);
  });

  describe('GET /api/teams', function() {
    it('should route to team.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'teamCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/teams/:id', function() {
    it('should route to team.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'authService.hasRole.admin', 'teamCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/teams', function() {
    it('should route to team.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'teamCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/teams/:id', function() {
    it('should route to team.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'teamCtrl.update')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/teams/:id', function() {
    it('should route to team.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'teamCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
