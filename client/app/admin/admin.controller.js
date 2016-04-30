'use strict';

(function () {

	class AdminController {
		constructor(User, $scope, $mdDialog) {
			// Use the User $resource to fetch all users
			this.users = User.query();
			this.dialog = $mdDialog;
			this.scope = $scope;
		}

		delete(user) {
			user.$remove();
			this.users.splice(this.users.indexOf(user), 1);
		}
		

		showConfirm(ev, user) {
			console.log(user);
			let _this = this;
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = this.dialog.confirm()
				.title('Would you like to delete your debt?')
				.textContent('All of the banks have agreed to forgive you your debts.')
				.ariaLabel('Lucky day')
				.targetEvent(ev)
				.ok('Please do it!')
				.cancel('Sounds like a scam');
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
