/**
 * Created by ryan on 12/5/16.
 */


angular.module("imageClass")
//handle homeindex request
    .controller("urlController",["$scope", "$http", "$routeParams",
        function ($scope, $http,$routeParams) {
        $http.get("/api/v1/urls/" + $routeParams.shortUrl)
            .success(function (data) {
                $scope.longUrl = data.longUrl;
                $scope.shortUrl = data.shortUrl;
                $scope.shortUrlToShow =data.shortUrl;
            });


    }]);