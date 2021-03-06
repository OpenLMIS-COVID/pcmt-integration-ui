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
     * @name pcmt-execution-list:ExecutionListController
     *
     * @description
     * Controller for execution list view screen.
     */
    angular
        .module('pcmt-execution-list')
        .controller('ExecutionListController', controller);

    controller.$inject = [
        '$state', '$stateParams', 'executions', 'queueItems',
        'usersMap', 'users', 'notificationService'
    ];

    function controller($state, $stateParams, executions, queueItems,
                        usersMap, users, notificationService) {

        var vm = this;

        vm.$onInit = onInit;
        vm.refreshPage = refreshPage;
        vm.showUser = showUser;

        /**
         * @ngdoc property
         * @propertyOf pcmt-execution-list:ExecutionListController
         * @name usersMap
         * @type {Object}
         *
         * @description
         * Map of users who started execution.
         */
        vm.usersMap = undefined;

        /**
         * @ngdoc property
         * @propertyOf pcmt-execution-list:ExecutionListController
         * @name users
         * @type {Array}
         *
         * @description
         * List of users who started execution.
         */
        vm.users = undefined;
        /**
         * @ngdoc method
         * @propertyOf pcmt-execution-list:ExecutionListController
         * @name $onInit
         *
         * @description
         * Method that is executed on initiating ExecutionListController.
         */
        function onInit() {
            vm.executions = executions;
            vm.queueItems = queueItems;
            vm.usersMap = usersMap;
            vm.users = users;
        }

        /**
         * @ngdoc method
         * @propertyOf pcmt-execution-list:ExecutionListController
         * @name showUser
         *
         * @description
         * This method shows username.
         */
        function showUser(user) {
            if (user) {
                return user.firstName + ' ' + user.lastName;
            }
            if (!user) {
                return 'System';
            }
        }

        function refreshPage() {
            $state.go($state.current, $stateParams, {
                reload: true
            });
            notificationService.success('pcmtExecutionList.pageHasBeenRefreshed');
        }

    }
})();
