'use strict';

class TeamController {

  constructor($http, $mdDialog, $mdToast, $state) {
    this.teams = [];
    this.$http = $http;
    this.dialog = $mdDialog;
    this.toast = $mdToast;
    this.state = $state;

    this.$http.get('/api/teams')
    .then(response => {
      this.teams = response.data;
    });
  }

  delete(team) {
    this.$http.delete(`/api/teams/${team._id}`)
    .then(() => {
      this.teams.splice(this.teams.indexOf(team), 1);
      this.showSimpleToast = () => {
        this.toast.show(
          this.toast.simple()
            .parent(angular.element('.main-container'))
            .textContent('Equipo eliminado')
            .position('top right')
            .hideDelay(3000)
          );
      };

      this.showSimpleToast();
    });

  }


  showConfirm(ev, team) {
    let _this = this;
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = this.dialog.confirm()
      .title('¿Está seguro de eliminar el equipo ' + team.name + '?')
      .textContent('Este cambio es irreversible')
      .ariaLabel('Eliminar equipo')
      .targetEvent(ev)
      .ok('Eliminar')
      .cancel('Cancelar');
    this.dialog.show(confirm).then(function () {
      _this.delete(team);
    });
  }

  goToEdit(id) {
    this.state.go('editTeam', {id: id});
  }
}


angular.module('agfaWebappApp').controller('TeamCtrl', TeamController);
