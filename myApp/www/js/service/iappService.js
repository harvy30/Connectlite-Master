angular.module('starter')
.service('userInformationService', ['$http',function userInformationService($http) {
	var _getCustomer = function _getCustomer(user) {
		var promise=$http.get('http://10.149.66.6:8080/customerSearch',{params:user}).
			then(function(response){
				return response.data;
			},function(reason){
				return "failure";
			});
	
		return promise;
	};
	var _getCustomerProfile = function _getCustomerProfile(ecid) {
		var promise=$http.get('http://10.149.66.6:8080/customerProfile',{params:ecid}).
			then(function(response){
				return response.data;
			},function(reason){
				return "failure";
			});
	
		return promise;
	};	

	return {
		getCustomer : _getCustomer,
		getCustomerProfile : _getCustomerProfile
	};
}]);
