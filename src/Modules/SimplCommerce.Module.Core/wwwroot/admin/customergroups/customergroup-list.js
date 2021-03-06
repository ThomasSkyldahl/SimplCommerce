﻿/*global angular*/
(function () {
    angular
        .module('simplAdmin.core')
        .controller('CustomerGroupListCtrl', CustomerGroupListCtrl);

    /* @ngInject */
    function CustomerGroupListCtrl(customergroupService, translateService) {
        var vm = this,
            tableStateRef;
        vm.customergroups = [];
        vm.translate = translateService;

        vm.getCustomerGroups = function getCustomerGroups(tableState) {
            tableStateRef = tableState;
            vm.isLoading = true;
            customergroupService.getCustomerGroups(tableState).then(function (result) {
                vm.customergroups = result.data.items;
                tableState.pagination.numberOfPages = result.data.numberOfPages;
                vm.isLoading = false;
            });
        };

        vm.deleteCustomerGroup = function deleteCustomerGroup(customergroup) {
            bootbox.confirm('Are you sure you want to delete this customer group: ' + customergroup.name, function (result) {
                if (result) {
                    customergroupService.deleteCustomerGroup(customergroup)
                        .then(function (result) {
                            vm.getCustomerGroups(tableStateRef);
                            toastr.success(customergroup.name + ' has been deleted');
                        })
                        .catch(function (response) {
                            toastr.error(response.data.error);
                        });
                }
            });
        };
    }
})();