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

describe('IntegrationExecuteController', function() {

    beforeEach(function() {
        module('pcmt-integration-execute');
        module('pcmt-integration');
        module('pcmt-execution');
        module('pcmt-configuration');

        inject(function($injector) {
            this.$q = $injector.get('$q');
            this.$controller = $injector.get('$controller');
            this.$state = $injector.get('$state');
            this.$rootScope = $injector.get('$rootScope');
            this.IntegrationDataBuilder = $injector.get('IntegrationDataBuilder');
            this.ExecutionResource = $injector.get('ExecutionResource');
            this.loadingModalService = $injector.get('loadingModalService');
            this.notificationService = $injector.get('notificationService');
        });

        this.integration = new this.IntegrationDataBuilder().build();

        this.description = 'Description';

        this.stateParams = {
            page: 0,
            size: 10
        };

        this.vm = this.$controller('IntegrationExecuteController', {
            integrationId: this.integration.id,
            $stateParams: this.stateParams
        });
        this.vm.$onInit();

        spyOn(this.$state, 'go').andReturn();
        spyOn(this.loadingModalService, 'open').andReturn(this.$q.resolve());
        spyOn(this.ExecutionResource.prototype, 'startManualExecution').andReturn(this.$q.resolve());
        spyOn(this.notificationService, 'success').andReturn();
    });

    describe('onInit', function() {

        it('should expose integrationId', function() {
            expect(this.vm.integrationId).toEqual(this.integrationId);
        });

    });

    describe('startManualExecution', function() {

        it('should call startManualExecution method', function() {
            this.vm.integrationId = this.integration.id;
            this.vm.description = this.description;

            this.vm.startManualExecution();
            this.$rootScope.$apply();

            expect(this.loadingModalService.open).toHaveBeenCalled();
            expect(this.ExecutionResource.prototype.startManualExecution)
                .toHaveBeenCalledWith({
                    integrationId: this.integration.id,
                    description: this.description
                });

            expect(this.$state.go).toHaveBeenCalled();
            expect(this.notificationService.success)
                .toHaveBeenCalledWith('pcmtIntegrationExecute.manualExecutionStarted');
        });
    });

    describe('goToIntegrationList', function() {

        it('should call state go method', function() {
            this.vm.goToIntegrationList();

            expect(this.$state.go).toHaveBeenCalled();
        });
    });
});
