'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var matchCtrlStub = {
    index: 'matchCtrl.index',
    show: 'matchCtrl.show',
    create: 'matchCtrl.create',
    upsert: 'matchCtrl.upsert',
    patch: 'matchCtrl.patch',
    destroy: 'matchCtrl.destroy'
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
var matchIndex = proxyquire('./index.js', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './match.controller': matchCtrlStub,
    '../../auth/auth.service': authServiceStub
});

describe('Match API Router:', function() {
    it('should return an express router instance', function() {
        expect(matchIndex).to.equal(routerStub);
    });

    describe('GET /api/matches', function() {
        it('should route to match.controller.index', function() {
            expect(routerStub.get
                .withArgs('/', 'authService.hasRole.admin', 'matchCtrl.index')
            ).to.have.been.calledOnce;
        });
    });

    describe('GET /api/matches/:id', function() {
        it('should route to match.controller.show', function() {
            expect(routerStub.get
                .withArgs('/:id', 'authService.hasRole.admin', 'matchCtrl.show')
            ).to.have.been.calledOnce;
        });
    });

    describe('POST /api/matches', function() {
        it('should route to match.controller.create', function() {
            expect(routerStub.post
                .withArgs('/', 'authService.hasRole.admin', 'matchCtrl.create')
            ).to.have.been.calledOnce;
        });
    });

    describe('PUT /api/matches/:id', function() {
        it('should route to match.controller.upsert', function() {
            expect(routerStub.put
                .withArgs('/:id', 'authService.hasRole.admin', 'matchCtrl.upsert')
            ).to.have.been.calledOnce;
        });
    });

    describe('PATCH /api/matches/:id', function() {
        it('should route to match.controller.patch', function() {
            expect(routerStub.patch
                .withArgs('/:id', 'authService.hasRole.admin', 'matchCtrl.patch')
            ).to.have.been.calledOnce;
        });
    });

    describe('DELETE /api/matches/:id', function() {
        it('should route to match.controller.destroy', function() {
            expect(routerStub.delete
                .withArgs('/:id', 'authService.hasRole.admin', 'matchCtrl.destroy')
            ).to.have.been.calledOnce;
        });
    });
});