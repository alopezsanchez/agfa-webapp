'use strict';

class TeamController {

    constructor(Auth, $http, $mdDialog, $mdToast, $state, appConfig) {
        this.teams = [];
        this.title = 'Equipos';
        this.$http = $http;
        this.dialog = $mdDialog;
        this.toast = $mdToast;
        this.state = $state;
        this.imagesServer = appConfig.imagesServer;
        this.Auth = Auth;

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
                        .parent(angular.element(document.body))
                        .textContent('Equipo eliminado')
                        .position('top right')
                        .hideDelay(3000)
                    );
                };

                this.showSimpleToast();
            });
    }

    createTeam(ev) {
        this.dialog.show({
            templateUrl: 'app/team/create/create-team.html',
            controller: 'CreateTeamController',
            controllerAs: '$ctrl',
            targetEvent: ev,
            openFrom: angular.element(document.body.querySelector('.new-team-button')),
            clickOutsideToClose: true,
            escapeToClose: false
        }).then(() => {
            this.$http.get('/api/teams')
                .then(response => {
                    this.teams = response.data;
                });
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
        this.dialog.show(confirm).then(function() {
            _this.delete(team);
        });
    }

    goToEdit(id) {
        this.state.go('editTeam', { id: id });
    }
}


angular.module('agfaWebappApp').controller('TeamController', TeamController);