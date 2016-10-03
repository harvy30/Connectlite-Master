complaintApp.controller('complaintlandingPageCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $scope.continue = function() {
            if ($scope.formvalue == 'form-1') {
                $location.path('/Complaintform');
            } else if ($scope.formvalue == 'form-2') {
                $location.path('/escaltedComplaintForm');
            } else if ($scope.formvalue == 'form-3') {
                $location.path('/resolvedComplaintForm');
            } else if ($scope.formvalue == 'form-4') {
                $location.path('/preview');
            }
        }


        $scope.options = [{
            "engagement_id": "It is a long established fact that a reader",
            "engagement_name": "It is a long established fact that a reader will be distracted",
            "lob_id": "lob-id-1001",
            "forms": "form-1",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."

        }, {
            "engagement_id": "engmnt-id-1001",
            "engagement_name": "engment-name-1001",
            "lob_id": "lob-id-1001",
            "forms": "form-1",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."

        }, {
            "engagement_id": "engmnt-id-1001",
            "engagement_name": "engment-name-1001",
            "lob_id": "lob-id-1001",
            "forms": "form-1",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."

        }, {
            "engagement_id": "engmnt-id-1001",
            "engagement_name": "engment-name-1001",
            "lob_id": "lob-id-1001",
            "forms": "form-1",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."

        }, {
            "engagement_id": "engmnt-id-1001",
            "engagement_name": "engment-name-1001",
            "lob_id": "lob-id-1001",
            "forms": "form-1",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."

        }, {
            "engagementId": "engmnt-id-1002",
            "engagement_name": "engment-name-1002",
            "lob_id": "lob-id-1002",
            "forms": "form-1, form-2, form-3, form-4",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters."

        }];

        var data = $scope.options;
        $scope.getForms = function(engId) {


            if ($scope.optionVal) {
                $scope.forms = $scope.optionVal.split(',');
                $scope.complaint = true;
            } else {
                $scope.forms = [];
            }

        }
        // $scope.truncate = function() {
        //     var maxLength = 5;
        //     $('#dropdown').text(function(i, text) {
        //         if (text.length > maxLength) {
        //             return text.substr(0, maxLength) + '...';
        //         }
        //     });
        // }
        // $http.get('js/dummyjson.json').then(function sucessCallback(res) {
        //             data = res.data;
        //     }, function errorcallback(res) {
        //         // body...
        //     });
        //          $scope.addLineBreak = function () {

        //           $(function () {

        //              $scope.addline = $("#dropdown").selectBoxIt({

        //              autoWidth: false
        //          });

        //      });


        //  };
        // $scope.addLineBreak();
    }
]);