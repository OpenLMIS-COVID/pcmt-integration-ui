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

describe('IntegrationListController', function() {

    beforeEach(function() {
        module('pcmt-integration-list');
        module('pcmt-integration');

        inject(function($injector) {
            this.$q = $injector.get('$q');
            this.$controller = $injector.get('$controller');
            this.$state = $injector.get('$state');
            this.$rootScope = $injector.get('$rootScope');
            this.IntegrationDataBuilder = $injector.get('IntegrationDataBuilder');
            this.IntegrationResource = $injector.get('IntegrationResource');
            this.loadingModalService = $injector.get('loadingModalService');
            this.confirmService = $injector.get('confirmService');
            this.notificationService = $injector.get('notificationService');
        });

        this.integration = new this.IntegrationDataBuilder().build();
        this.integrations = [
            this.integration,
            new this.IntegrationDataBuilder().build()
        ];

        this.stateParams = {
            page: 0,
            size: 10
        };

        this.vm = this.$controller('IntegrationListController', {
            integrations: this.integrations,
            $stateParams: this.stateParams
        });
        this.vm.$onInit();

        spyOn(this.$state, 'go').andReturn();
        spyOn(this.confirmService, 'confirmDestroy').andReturn(this.$q.resolve());
        spyOn(this.loadingModalService, 'open').andReturn(this.$q.resolve());
        spyOn(this.IntegrationResource.prototype, 'delete').andReturn(this.$q.resolve());
        spyOn(this.notificationService, 'success').andReturn();

    });

    describe('onInit', function() {

        it('should expose integrations array', function() {
            expect(this.vm.integrations).toEqual(this.integrations);
        });

    });

    describe('deleteIntegration', function() {

        it('should call deleteIntegration method', function() {
            this.vm.deleteIntegration(this.integration);
            this.$rootScope.$apply();

            expect(this.confirmService.confirmDestroy).toHaveBeenCalledWith(
                'pcmtIntegrationList.delete.confirm',
                'pcmtIntegrationList.delete'
            );

            expect(this.loadingModalService.open).toHaveBeenCalled();
            expect(this.IntegrationResource.prototype.delete).toHaveBeenCalledWith(this.integration);
            expect(this.$state.go).toHaveBeenCalled();
            expect(this.notificationService.success)
                .toHaveBeenCalledWith('pcmtIntegrationList.scheduleDeleted');
        });
    });

    describe('refreshState', function() {

        it('should call state go method', function() {
            this.vm.refreshState();

            expect(this.$state.go).toHaveBeenCalled();
            expect(this.notificationService.success)
                .toHaveBeenCalledWith('pcmtIntegrationList.pageHasBeenRefreshed');
        });
    });
});
