var  app = angular.module('mailer', []);

app.controller('MailController', ['$scope', '$http', function($scope, $http) {
	$scope.mail = {'from': 'YOUR EMAIL'};

	$scope.sendMail = function() {
	// console.log($scope.mail);

        $http.post('/send', $scope.mail)
            .then(function(response) {
                if(response.data == 'success') {
                    console.log('mail is sent successfully');
                    $scope.mail = null;
                }
            }, function(err) {
                console.log('error: ' + err);
            });
	
	}
}]);

// app.service('mailService', ['$http', '$q', function($http, $q) {
//     var sendEmail = function(mail) {
//         var d = $q.defer();
//         $http({
//             method: 'POST',
//             data: mail,
//             url: '/send'
//         }).success(function (data) {
//             d.resolve(data);
//         })
//         .error(function (data) {
//             d.reject(data);
//         });
//         return d.promise;
//     };

//     return {
//         sendEmail : sendEmail
//     }
// }]);
