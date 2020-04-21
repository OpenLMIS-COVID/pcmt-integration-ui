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
        .module('pcmt-execution-response-body')
        .config(pcmtExecutionResponseBodyRoutes);

    pcmtExecutionResponseBodyRoutes.$inject = ['modalStateProvider'];

    function pcmtExecutionResponseBodyRoutes(modalStateProvider) {

        modalStateProvider.state('openlmis.administration.pcmt.executions.responsebody', {
            controller: 'ExecutionResponseBodyController',
            controllerAs: 'vm',
            templateUrl: 'pcmt-execution-response-body/pcmt-execution-response-body.html',
            url: '/:id/responsebody',
            resolve: {
                execution: function(ExecutionResource, Execution, $stateParams) {
                    return new ExecutionResource()
                        .get($stateParams.id)
                        .then(function(json) {
                            return new Execution(json);
                        });
                }
            }
        });

    }

})();
