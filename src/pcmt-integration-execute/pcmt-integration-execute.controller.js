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
     * @name pcmt-integration-execute:IntegrationExecuteController
     *
     * @description
     * Controller for managing manual execution view screen.
     */
    angular
        .module('pcmt-integration-execute')
        .controller('IntegrationExecuteController', controller);

    controller.$inject = [
        '$state', '$stateParams', 'ExecutionResource',
        'loadingModalService', 'notificationService'
    ];

    function controller($state, $stateParams, ExecutionResource,
                        loadingModalService, notificationService) {

        var vm = this;

        vm.$onInit = onInit;
        vm.goToIntegrationList  = goToIntegrationList;
        vm.startManualExecution = startManualExecution;

        /**
         * @ngdoc property
         * @propertyOf pcmt-integration-execute:IntegrationExecuteController
         * @name integrationId
         * @type {String}
         *

         * @description
         * A integration UUID.
         */
        vm.integrationId = undefined;

        /**
         * @ngdoc property
         * @propertyOf pcmt-integration-execute:IntegrationExecuteController
         * @name description
         * @type {String}
         *

         * @description
         * A description for this manual execution.
         */
        vm.description = undefined;

        /**
         * @ngdoc method
         * @propertyOf pcmt-integration-execute:IntegrationExecuteController
         * @name $onInit
         *
         * @description
         * Method that is executed on initiating IntegrationExecuteController.
         */
        function onInit() {
            vm.integrationId = $stateParams.id;
        }

        /**
         * @ngdoc method
         * @methodOf pcmt-integration-execute:IntegrationExecuteController
         * @name goToExecutionList
         *
         * @description
         * Redirects to execution list screen.
         */
        function goToIntegrationList() {
            $state.go('openlmis.administration.pcmt.integrations', {}, {});
        }

        /**
         * @ngdoc method
         * @methodOf pcmt-integration-execute:IntegrationExecuteController
         * @name startManualExecution
         *
         * @description
         * Start manual execution and return to the execution list on success.
         */
        function startManualExecution() {
            loadingModalService.open();
            return new ExecutionResource()
                .startManualExecution({
                    integrationId: vm.integrationId,
                    description: vm.description
                })
                .then(function() {
                    $state.go('openlmis.administration.pcmt.executions', {}, {
                        realod: true
                    });
                })
                .then(function() {
                    notificationService.success('pcmtIntegrationExecute.manualExecutionStarted');
                });

        }
    }
})();
