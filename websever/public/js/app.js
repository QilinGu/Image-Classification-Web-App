/**
 * Created by ryan on 12/4/16.
 */
var app = angular.module("imageClass",["ngRoute"]);

angular.module('AppName', ['ngRoute']);

//based on url, change webpage

app.config(function ($routeProvider) {
    $routeProvider
        .when("/",{
            templateUrl:"./public/views/home.html",
            controller: "homeController"
        })
        .when("/urls/:shortUrl", {
             templateUrl:"./public/views/url.html",
             controller: "urlController"
        });
});

