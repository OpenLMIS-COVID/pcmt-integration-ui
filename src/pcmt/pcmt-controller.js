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
     * @name pcmt.controller:PcmtController
     *
     * @description
     * Exposes method for adding/removing user roles.
     */
    angular
        .module('pcmt')
        .controller('PcmtController', controller);

    controller.$inject = ['$state'];

    function controller($state) {

        var vm = this;

        vm.$onInit = onInit;

        /**
         * @ngdoc method
         * @methodOf pcmt.controller:PcmtController
         * @name $onInit
         *
         * @description
         * Initialization method of the PcmtController.
         */

        function onInit() {
            vm.tabs = [{
                state: 'openlmis.administration.pcmt.executions',
                name: 'pcmt.executions'
            }, {
                state: 'openlmis.administration.pcmt.integrations',
                name: 'pcmt.integrations'
            }];

            if ($state.is('openlmis.administration.pcmt')) {
                $state.go('openlmis.administration.pcmt.integrations');
            }
        }

    }
})();
