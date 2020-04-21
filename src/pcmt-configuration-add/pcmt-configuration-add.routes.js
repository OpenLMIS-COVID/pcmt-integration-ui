/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2017 VillageReach
 *
 * This program is free software: you can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU Affero General Public License for more details. You should have received a copy of
 * the GNU Affero General Public License along with this program. If not, see
 * http://www.gnu.org/licenses.  For additional information contact info@OpenLMIS.org. 
 */

(function() {

    'use strict';

    angular
        .module('pcmt-configuration-add')
        .config(pcmtConfigurationAddRoutes);

    pcmtConfigurationAddRoutes.$inject = ['modalStateProvider'];

    function pcmtConfigurationAddRoutes(modalStateProvider) {

        modalStateProvider.state('openlmis.administration.pcmt.configurations.add', {
            controller: 'ConfigurationAddEditController',
            controllerAs: 'vm',
            templateUrl: 'pcmt-configuration-add/pcmt-configuration-add.html',
            url: '/add',
            resolve: {
                configuration: function(Configuration) {
                    return new Configuration({
                        authenticationDetails: {}
                    });
                }
            }
        });

    }

})();
