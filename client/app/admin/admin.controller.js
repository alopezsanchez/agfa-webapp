'use strict';

(function () {

	class AdminController {
		constructor(User, $scope, $mdDialog, $mdToast) {
			// Use the User $resource to fetch all users
			this.users = User.query();
			this.dialog = $mdDialog;
			this.toast = $mdToast;
			this.scope = $scope;
		}

		delete(user) {
			user.$remove();
			this.users.splice(this.users.indexOf(user), 1);
			let _this = this;

			_this.scope.showSimpleToast = function () {
				_this.toast.toast.show(
					_this.toast.simple()
						.textContent('Usuario eliminado')
						.position({
							bottom: false,
							top: true,
							left: false,
							right: true
						})
						.hideDelay(3000)
					);
			};
			
			_this.scope.showSimpleToast();
		}


		showConfirm(ev, user) {
			console.log(user);
			let _this = this;
			var userName = user.name;
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = this.dialog.confirm()
				.title('¿Está seguro de eliminar el usuario ' + user.name + '?')
				.textContent('Este cambio es irreversible')
				.ariaLabel('Eliminar usuario')
				.targetEvent(ev)
				.ok('Eliminar')
				.cancel('Cancelar');
			this.dialog.show(confirm).then(function () {
				_this.delete(user);
			}, function () {
				_this.scope.status = 'You decided to keep your debt.';
			});
		}
	}

	angular.module('agfaWebappApp.admin')
		.controller('AdminController', AdminController);

})();
