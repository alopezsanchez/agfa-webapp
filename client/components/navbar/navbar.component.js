'use strict';

const Navbar = {
  templateUrl: 'components/navbar/navbar.html',
  controller: 'NavbarController as nav'
};

angular
  .module('agfaWebappApp')
  .component('navbar', Navbar);
