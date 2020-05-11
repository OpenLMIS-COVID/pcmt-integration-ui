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

    /**
     * @ngdoc controller
     * @name pcmt-integration-list:IntegrationListController
     *
     * @description
     * Controller for execution list view screen.
     */
    angular
        .module('pcmt-integration-list')
        .controller('IntegrationListController', controller);

    controller.$inject = [
        '$state', '$stateParams', '$q', 'IntegrationResource',
        'confirmService', 'loadingModalService', 'integrations',
        'notificationService'
    ];

    function controller($state, $stateParams, $q, IntegrationResource,
                        confirmService, loadingModalService, integrations,
                        notificationService) {

        var vm = this;

        vm.$onInit = onInit;
        vm.deleteIntegration = deleteIntegration;
        vm.refreshState = refreshState;
        /**
         * @ngdoc method
         * @propertyOf pcmt-integration-list:IntegrationListController
         * @name $onInit
         *
         * @description
         * Method that is executed on initiating IntegrationListController.
         */
        function onInit() {
            vm.integrations = integrations;
        }

        function deleteIntegration(integration) {
            return confirmService
                .confirmDestroy('pcmtIntegrationList.delete.confirm', 'pcmtIntegrationList.delete')
                .then(function() {
                    loadingModalService.open();
                    return new IntegrationResource()
                        .delete(integration);
                })
                .then(function() {
                    refreshState($stateParams);
                })
                .catch(function(error) {
                    return $q.reject(error);
                })
                .finally(function() {
                    loadingModalService.close();
                })
                .then(function() {
                    notificationService.success('pcmtIntegrationList.scheduleDeleted');
                });
        }

        function refreshState(stateParams) {
            $state.go('openlmis.administration.pcmt.integrations', stateParams, {
                reload: true
            });
            notificationService.success('pcmtIntegrationList.pageHasBeenRefreshed');
        }

    }
})();
