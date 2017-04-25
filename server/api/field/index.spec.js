'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var fieldCtrlStub = {
  index: 'fieldCtrl.index',
  show: 'fieldCtrl.show',
  create: 'fieldCtrl.create',
  upsert: 'fieldCtrl.upsert',
  patch: 'fieldCtrl.patch',
  destroy: 'fieldCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var fieldIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './field.controller': fieldCtrlStub
});

describe('Field API Router:', function() {
  it('should return an express router instance', function() {
    expect(fieldIndex).to.equal(routerStub);
  });

  describe('GET /api/fields', function() {
    it('should route to field.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'fieldCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/fields/:id', function() {
    it('should route to field.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'fieldCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/fields', function() {
    it('should route to field.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'fieldCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/fields/:id', function() {
    it('should route to field.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'fieldCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/fields/:id', function() {
    it('should route to field.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'fieldCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/fields/:id', function() {
    it('should route to field.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'fieldCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
