angular.module('starter')
.controller('CustomerDetailsController',['$scope','$stateParams','userInformationService',function CustomerDetailsController($scope,$stateParams,userInformationService){ 
	var self = this;		
	
	userInformationService.getCustomerProfile({'ECID':$stateParams.id}).then(function(data){
		console.log(data.customerProfileResponse.enterpriseCustomer);
		$scope.customerDetail=data.customerProfileResponse.enterpriseCustomer;

	});
	
	

	$scope.getCustomerName = function getCustomerName() {
		return  ($scope.customerDetail.enterpriseIndNonIndInfo.enterpriseIndInfo.indName.firstName + ' ' +
			$scope.customerDetail.enterpriseIndNonIndInfo.enterpriseIndInfo.indName.lastName);
	}; 


  
  self.recentActivities = [{
  	"taskDescription": "Profiled",
  	"Date": "12/25/2015",
  	"Category": "note",
  	"Status": "completed",
  	"CustomerNote":"Opened a new Account"
  }, {
  	"taskDescription": "Customer Call",
  	"Date": "12/26/2015",
  	"Category": "Oppurtunity",
  	"Status": "completed",
  	"CustomerNote":"Increased the Credit Limit"
  }, {
  	"taskDescription": "Profiled",
  	"Date": "12/27/2015",
  	"Category": "transaction",
  	"Status": "pending",
  	"CustomerNote":"Increased the Credit Limit"
  }, {
  	"taskDescription": "Scheduled Appointment",
  	"Date": "12/28/2015",
  	"Category": "note",
  	"Status": "pending",
  	"CustomerNote":"Opened a new Account"
  }, {
  	"taskDescription": "Scheduled Appointment",
  	"Date": "12/29/2015",
  	"Category": "Oppurtunity",
  	"Status": "pending",
  	"CustomerNote":"Opened a new Account"
  }];

   /* self.getCustomerActivities = function getCustomerActivities(cst) {
      self.recentActivities = cst.RecentActivities;
      
      return self.recentActivities;
   };

    self.getCustomerActivities($scope.customerDetail);
    */  

    $scope.formatCustomerActivities = function (cst) {
    	console.log("mee too");
    	return  (cst.taskDescription + ' ' +
    		cst.Date);
    };

}		
]);
