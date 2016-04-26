
var app = angular.module("spa",["ngResource", "ngRoute"]);

app.factory("employeeService", function ($resource) {
    return $resource('/api/employees/:id',
        { id: '@id' }, {
            update: { method: 'PUT' }
        });
});

app.factory("departmentService", function ($resource) {
    return $resource('/api/departments/:id',
    {id:'@id'},
    {
        update:{method:'PUT'}
    });
});

app.controller("mainController", function ($scope) {


});

app.controller("employeeController", function ($scope, employeeService) {


    $scope.employees = employeeService.query();

    $scope.employee = {
        Id: 0,
        Name: '',
        Position: '',
        DepartmentId: 0
    };

    $scope.deleteEmployee = function (employee) {
        employeeService.remove(employee, $scope.refreshData);
    };

    $scope.refreshData = function () {
        $scope.employees = employeeService.query();
    };

    $scope.showAddDialog = function () {
        $('#modal-dialog').modal('show');
    };

    $scope.saveEmployee = function () {
        employeeService.save($scope.employee, $scope.refreshData);
        $('#modal-dialog').modal('hide');
        $scope.clearCurrentEmployee();

    };

    $scope.clearCurrentEmployee = function () {
        $scope.employee = {
            Id: 0,
            Name: '',
            Position: '',
            DepartmentId: 0
        };
    };


});

app.controller("departmentController", function ($scope, departmentService) {

    $scope.title = '';
    $scope.errors = [];

    $scope.errorMessage = function (response) {
        var errors = [];
        for (var key in response.data.ModelState) {
            for (var i = 0; i < response.data.ModelState[key].length; i++) {
                errors.push(response.data.ModelState[key][i]);
            }
        }
        $scope.errors = errors;
    };
    $scope.departments = departmentService.query();

    $scope.department = {
        Id: 0,
        Name: ''
    };

    $scope.selectDepartment = function (dpmt) {
        $scope.department = dpmt;
        $scope.showUpdateDialog();
        $scope.showAddDialog();
    };

    $scope.deleteDepartment = function (department) {
        departmentService.remove(department, $scope.refreshData,$scope.errorMessage);
    };

    $scope.refreshData = function () {
        $scope.departments = departmentService.query();
                $('#modal-dialog').modal('hide');
    };

    $scope.showUpdateDialog = function () {
        $scope.title = 'Update department';
        $('#modal-dialog').modal('show');
    };

    $scope.showAddDialog = function () {
        $scope.clearCurrentDepartment;
        $scope.clearErrors();
        $scope.title = 'Add department';
        $('#modal-dialog').modal('show');
    };

    $scope.clearErrors = function () {
        $scope.errors = [];
    };

    $scope.saveDepartment = function () {
        if ($scope.department.Id > 0) {
            departmentService.update($scope.department, $scope.refreshData, $scope.errorMessage);
        } else {
            departmentService.save($scope.department, $scope.refreshData, $scope.errorMessage);
        }

    };

    $scope.clearCurrentDepartment = function () {
        $scope.department = { Id: 0, Name: '' };
    };

});

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: "mainController"
    })
    .when('/employees', {
        templateUrl: "/Content/Views/Employees.html",
        controller: "employeeController"
    })
    .when('/departments', {
        templateUrl: "/Content/Views/Departments.html",
        controller: "departmentController"
    })
});