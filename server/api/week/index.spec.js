'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var weekCtrlStub = {
	index: 'weekCtrl.index',
	show: 'weekCtrl.show',
	create: 'weekCtrl.create',
	upsert: 'weekCtrl.upsert',
	patch: 'weekCtrl.patch',
	destroy: 'weekCtrl.destroy'
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
var weekIndex = proxyquire('./index.js', {
	express: {
		Router() {
			return routerStub;
		}
	},
	'../../auth/auth.service': authServiceStub,
	'./week.controller': weekCtrlStub
});

describe('Week API Router:', function () {
	it('should return an express router instance', function () {
		expect(weekIndex).to.equal(routerStub);
	});

	describe('GET /api/weeks', function () {
		it('should route to week.controller.index', function () {
			expect(routerStub.get
				.withArgs('/', 'authService.hasRole.admin', 'weekCtrl.index')
			).to.have.been.calledOnce;
		});
	});

	describe('GET /api/weeks/:id', function () {
		it('should route to week.controller.show', function () {
			expect(routerStub.get
				.withArgs('/:id', 'authService.hasRole.admin', 'weekCtrl.show')
			).to.have.been.calledOnce;
		});
	});

	describe('POST /api/weeks', function () {
		it('should route to week.controller.create', function () {
			expect(routerStub.post
				.withArgs('/', 'authService.hasRole.admin', 'weekCtrl.create')
			).to.have.been.calledOnce;
		});
	});

	describe('PUT /api/weeks/:id', function () {
		it('should route to week.controller.upsert', function () {
			expect(routerStub.put
				.withArgs('/:id', 'authService.hasRole.admin', 'weekCtrl.upsert')
			).to.have.been.calledOnce;
		});
	});

	describe('PATCH /api/weeks/:id', function () {
		it('should route to week.controller.patch', function () {
			expect(routerStub.patch
				.withArgs('/:id', 'authService.hasRole.admin', 'weekCtrl.patch')
			).to.have.been.calledOnce;
		});
	});

	describe('DELETE /api/weeks/:id', function () {
		it('should route to week.controller.destroy', function () {
			expect(routerStub.delete
				.withArgs('/:id', 'authService.hasRole.admin', 'weekCtrl.destroy')
			).to.have.been.calledOnce;
		});
	});
});
