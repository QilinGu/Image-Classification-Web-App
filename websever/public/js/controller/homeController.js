/**
 * Created by ryan on 12/4/16.
 */


// callback function

angular.module("imageClass")
    //handle homeindex request
    .controller("homeController",["$scope", "$http", "$location", function ($scope, $http, $location) {
        //send http request
        $scope.submit =function () {
            $http.post("/api/v1/urls",{
                longUrl: $scope.longUrl
            })
                .success(function (data) {
                    $location.path("/urls/" + data.shortUrl);
            });
        }
    }]);