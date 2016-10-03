/**
 * Created by DAY on 23-03-2016.
 */
var complaintApp = angular.module('ComplaintForm', ['ngRoute', 'ui.bootstrap', 'ngMaterial', 'ngMessages']);
complaintApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/landing', {
                templateUrl: 'landingPage.html',
                controller: 'complaintlandingPageCtrl'
            })
            .when('/Complaintform', {
                templateUrl: 'Complaintform.html',
                controller: 'complaintFrmCtrl as vm'
            })
            .when('/escaltedComplaintForm', {
                templateUrl: 'escaltedComplaintForm.html',
                controller: 'complaintFrmCtrl as vm'

            })
            .when('/resolvedComplaintForm', {
                templateUrl: 'resolvedComplaintForm.html',
                controller: 'complaintFrmCtrl as vm'

            })
            .when('/modalTemplate', {
                templateUrl: 'modalTemplate.html',
                controller: 'ModalInstanceCtrl'
            })
            .when('/preview', {
                templateUrl: 'preview.html'
            })
            .otherwise({
                redirectTo: '/landing'
            })
    }
]);
