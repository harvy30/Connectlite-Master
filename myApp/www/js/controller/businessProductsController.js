angular.module('starter')
.controller('BusinessProductsController',['$scope', '$interval', '$timeout', '$ionicModal', '$filter','userInformationService' ,'$ionicSideMenuDelegate' ,'$ionicPopup','$http', '$stateParams', function BusinessProductsController($scope, $interval, $timeout, $ionicModal, $filter,userInformationService,$ionicSideMenuDelegate, $ionicPopup,$http, $stateParams) {

	var self = this;
	self.bankCustomers;
	self.user={};
	
	$scope.client={};
	$scope.customercount=6;

  // to unbind infinte scroll;  
  self.completedLoading = false;
  var recordsLength=0,totalPages=0;  
  $scope.numberOfItemsToDisplay =0; 
  
  self.getCustomerData = function getCustomerData() {  
  	if($scope.client){		
  		getCustomerService();
  	}
  };
  
  var getCustomerService = function getCustomerService(){
  	userInformationService.getCustomer($scope.client).then(function(data){			
  		if(data != "failure"){
  			if(!self.bankCustomers){
  				self.bankCustomers = [];
  			}
  self.bankCustomers=self.bankCustomers.concat(data.customerSearchResponse.customerSearchResult);
  			var pagingResponseDetail=data.customerSearchResponse.pagingResponseDetail;
  			$scope.client.pageStart=pagingResponseDetail.pageStart;
  			if(recordsLength == 0){
  				recordsLength=pagingResponseDetail.totalAvailable;
				  //minus 1 as we are already showing one page on page load
				  totalPages=Math.ceil(pagingResponseDetail.totalAvailable/10)-1;
				}
			} else {
				self.bankCustomers = [];
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');			
		});			  
  };

  // for adding customers on scroll
  $scope.addItems = function addItems() {
  	if($scope.client.pageStart==recordsLength){
  		self.completedLoading=true;
  		self.completedLoadingMsg="No more clients to show";
  	} else {	  		  		  
  		getCustomerService();		  
  	}	 	  
  };

  self.getCustomerFullName = function getCustomerFullName(cst) {	
  	return  (cst.firstName + ' ' +cst.lastName);
  };
  self.getCustomerAddress = function getCustomerAddress(addr) {	 
  	return  ((addr.addressLine1?addr.addressLine1:"")+''+(addr.city?addr.city+', ' :"")+''+(addr.state? addr.state.code+', ' :"")+''+(addr.postalArea? addr.postalArea+', ':"")+''+(addr.country? addr.country.value :""));
  };    

  $scope.showPopup = function showPopup() {
  	$scope.data = {}

      // Custom popup
      var myPopup = $ionicPopup.show({
      	template: '<input type="text" ng-model="data.model">',
      	title: 'Title',
      	subTitle: 'Subtitle',
      	scope: $scope,

      	buttons: [
      	{ text: 'Cancel' }, {
      		text: '<b>Save</b>',
      		type: 'button-positive',
      		onTap: function(e) {

      			if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                        e.preventDefault();
                    } else {
                    	return $scope.data.model;
                    }
                }
            }
            ]
        });

      myPopup.then(function(res) {
      	console.log('Tapped!', res);
      });    
  };


  $scope.displayCustomers = function displayCustomers() {

  	$scope.client.firstName=$filter('uppercase')(self.user.firstName);
  	$scope.client.lastName=$filter('uppercase')(self.user.lastName);
  	$scope.client.pageStart=0;
  	$scope.customercount=6;
  	$ionicModal.fromTemplateUrl('partials/client.html', {
  		scope: $scope,
  		animation: 'slide-in-up',
  		hardwareBackButtonClose: true
  	}).then(function(modal) {
  		$scope.modal = modal;
  		$scope.modal.show();
  	});
  };
 	self.displayCustomersBell = function displayCustomersBell() {
/*   $scope.client.firstName=$filter('uppercase')('JOHN');
$scope.client.lastName=$filter('uppercase')('SMITH');*/
/*$scope.customercount=0;*/

$ionicModal.fromTemplateUrl('partials/notificationModal.html', {
	scope: $scope,
	animation: 'slide-in-up',
	hardwareBackButtonClose: true
}).then(function(modal) {
	$scope.modal = modal;
	$scope.modal.show();
});

};

$interval(function() {
	angular.element(document.querySelector('.badge-assertive')).removeClass('hide');
	if($scope.customercount < 5){
		/*$scope.customercount += 1;*/
	}

}, 10000);

  $scope.swiper = {}; //initialize
  $scope.onReadySwiper = function onReadySwiper(swiper) {
    $scope.swiper = swiper; //update when the swiper is ready
};



$scope.openModal = function openModal() {
	self.bankCustomers = [];
	self.getCustomerData();
};
$scope.closeModal = function closeModal(customer) {
	$scope.modal.hide();
};
self.pushedData =
[{  
	"EnterpriseCustomer":[  
	{  
		"EnterpriseID":"0059391510",
		"IndividualBusinessCode":"I",
		"CustomerSubType":{  
			"Code":"999"
		},
		"SSNTIN":"507267194",
		"EnterpriseIndNonIndInfo":{  
			"EnterpriseIndInfo":{  
				"IndName":{  
					"FirstName":"JOHN",
					"LastName":"LEWIS"
				}
			}
		},
		"Address":{  
			"AddressLine1":"4301 OAKVIEW CIR",
			"City":"ALPINE",
			"State":{  
				"Code":"UT"
			},
			"PostalArea":"840040000",
			"Country":"United States/US territories"
		},
		"Email":"MASKED.EMAIL2@JPMCHASE.COM",
		"DOB":"06/22/1981",
		"COSTCENTER":"02345",
		"PHONENUMBER":[  
		{  
			"homeWorkCode":"HOME",
			"number": "2315579989"
		},
		{  
			"homeWorkCode":"WORK",
			"number": "2313233233"
		}],
		"RecentActivities":[{
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
  }],

		"NotificationMessage":"Customer at the ATM"
	},
	{  
		"EnterpriseID":"0263322565",
		"IndividualBusinessCode":"I",
		"CustomerSubType":{  
			"Code":"999"
		},
		"SSNTIN":"528350619",
		"EnterpriseIndNonIndInfo":{  
			"EnterpriseIndInfo":{  
				"IndName":{  
					"FirstName":"KEVIN",
					"LastName":"GIBBONS"
				}
			}
		},
		"Address":{  
			"AddressLine1":"375 CRIMSON CIR APT 11R",
			"City":"SALT LAKE CITY",
			"State":{  
				"Code":"UT"
			},
			"PostalArea":"840040000",
			"Country":"United States/US territories"
		},
		"Email":"MASKED.EMAIL2@JPMCHASE.COM",
		"DOB":"06/22/1981",
		"COSTCENTER":"02345",
		"PHONENUMBER":[  
		{  
			"homeWorkCode":"HOME",
			"number": "2315579989"
		},
		{  
			"homeWorkCode":"WORK",
			"number": "2313233233"
		}],
		"RecentActivities":[{
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
  }],
		"NotificationMessage":"Made a deposit of $25,000.00 in account ending in XXXXXX1752"
	},
	{  
		"EnterpriseID":"0059391554",
		"IndividualBusinessCode":"I",
		"CustomerSubType":{  
			"Code":"999"
		},
		"SSNTIN":"507267194",
		"EnterpriseIndNonIndInfo":{  
			"EnterpriseIndInfo":{  
				"IndName":{  
					"FirstName":"JOHN",
					"LastName":"LEWIS"
				}
			}
		},
		"Address":{  
			"AddressLine1":"4301 OAKVIEW CIR",
			"City":"ALPINE",
			"State":{  
				"Code":"UT"
			},
			"PostalArea":"840040000",
			"Country":"United States/US territories"
		},
		"Email":"MASKED.EMAIL2@JPMCHASE.COM",
		"DOB":"06/22/1981",
		"COSTCENTER":"02345",
		"PHONENUMBER":[  
		{  
			"homeWorkCode":"HOME",
			"number": "2315579989"
		},
		{  
			"homeWorkCode":"WORK",
			"number": "2313233233"
		}],
		"RecentActivities":[{
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
  }],
		"NotificationMessage":"Made a withdrawal of $30,000.00 from account ending in XXXXXX4235"
	},
	{  
		"EnterpriseID":"0059391509",
		"IndividualBusinessCode":"I",
		"CustomerSubType":{  
			"Code":"999"
		},
		"SSNTIN":"507267143",
		"EnterpriseIndNonIndInfo":{  
			"EnterpriseIndInfo":{  
				"IndName":{  
					"FirstName":"STAN",
					"LastName":"LEE"
				}
			}
		},
		"Address":{  
			"AddressLine1":"4301 OAKVIEW CIR",
			"City":"ALPINE",
			"State":{  
				"Code":"UT"
			},
			"PostalArea":"840040000",
			"Country":"United States/US territories"
		},
		"Email":"MASKED.EMAIL2@JPMCHASE.COM",
		"DOB":"06/22/1981",
		"COSTCENTER":"02345",
		"PHONENUMBER":[  
		{  
			"homeWorkCode":"HOME",
			"number": "2315579989"
		},
		{  
			"homeWorkCode":"WORK",
			"number": "2313233233"
		}],
		"RecentActivities":[{
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
  }],
		"NotificationMessage":"Customer at the teller"
	},
	{  
		"EnterpriseID":"0263391242",
		"IndividualBusinessCode":"I",
		"CustomerSubType":{  
			"Code":"999"
		},
		"SSNTIN":"507267194",
		"EnterpriseIndNonIndInfo":{  
			"EnterpriseIndInfo":{  
				"IndName":{  
					"FirstName":"KARENA",
					"LastName":"HAIRELL"
				}
			}
		},
		"Address":{  
			"AddressLine1":"4301 OAKVIEW CIR",
			"City":"ALPINE",
			"State":{  
				"Code":"UT"
			},
			"PostalArea":"840040000",
			"Country":"United States/US territories"
		},
		"Email":"MASKED.EMAIL2@JPMCHASE.COM",
		"DOB":"06/22/1981",
		"COSTCENTER":"02345",
		"PHONENUMBER":[  
		{  
			"homeWorkCode":"HOME",
			"number": "2315579989"
		},
		{  
			"homeWorkCode":"WORK",
			"number": "2313233233"
		}],
		"RecentActivities":[{
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
  }],
		"NotificationMessage":"Customer in the branch"
	},
	{  
		"EnterpriseID":"0059391511",
		"IndividualBusinessCode":"I",
		"CustomerSubType":{  
			"Code":"999"
		},
		"SSNTIN":"507267194",
		"EnterpriseIndNonIndInfo":{  
			"EnterpriseIndInfo":{  
				"IndName":{  
					"FirstName":"JOHN",
					"LastName":"LEWIS"
				}
			}
		},
		"Address":{  
			"AddressLine1":"4301 OAKVIEW CIR",
			"City":"ALPINE",
			"State":{  
				"Code":"UT"
			},
			"PostalArea":"840040000",
			"Country":"United States/US territories"
		},
		"Email":"MASKED.EMAIL2@JPMCHASE.COM",
		"DOB":"06/22/1981",
		"COSTCENTER":"02345",
		"PHONENUMBER":[  
		{  
			"homeWorkCode":"HOME",
			"number": "2315579989"
		},
		{  
			"homeWorkCode":"WORK",
			"number": "2313233233"
		}],
		"RecentActivities":[  
		{  
			"taskDescription":"Note Created",
			"Date":"12/31/2015",
			"Category":"note"
		},
		{  
			"taskDescription":"Oppurtunity Created",
			"Date":"12/31/2015",
			"Category":"Oppurtunity"
		},
		{  
			"taskDescription":"Money Deposited",
			"Date":"12/31/2015",
			"Category":"transaction"
		},
		{  
			"taskDescription":"Note Created",
			"Date":"12/31/2015",
			"Category":"note"
		},
		{  
			"taskDescription":"Oppurtunity Created",
			"Date":"12/31/2015",
			"Category":"Oppurtunity"
		}
		],
		"NotificationMessage":"Anniversary"
	}

	]
}];


$scope.IndividualDataId = $stateParams.id;
//console.log($scope.IndividualDataId);
var getIndividualData= function getIndividualData(){
		for (data in self.pushedData[0].EnterpriseCustomer) {
	    	//console.log(self.pushedData[0].EnterpriseCustomer[data]);
		    if (self.pushedData[0].EnterpriseCustomer[data].EnterpriseID == $scope.IndividualDataId) {
		        	dataObj = self.pushedData[0].EnterpriseCustomer[data];
		        console.log(dataObj);
		        break;
		    }

		}
		return dataObj;
};


$scope.getIndividualData = getIndividualData;


}]);
