module SampleWeb.Common.SampleDirective {
    export function sampleDirective($http, $window): ng.IDirective {
        return <ng.IDirective>{
            templateUrl: (elem, attrs) => {
                return attrs.templateUrl || "sampleDirective.html";
            },
            controller: "",
            controllerAs: "",
            scope: {
                name: "=",
                sourceUrl: "@",
            }
        }
    }

    angular.module("sampleModule").directive("sampleDirective", ["$http", "$window", sampleDirective]);
    
}