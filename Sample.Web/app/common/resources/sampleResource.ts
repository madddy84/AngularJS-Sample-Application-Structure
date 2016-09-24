module SampleWeb.Common.Resources {

    export interface ISampleResource {
        sampleWebApi(parameter1: any, parameter2: any): any;
    }

    export class SampleResource implements ISampleResource {
        
        public constructor($http: ng.IHttpService) {
        }

        public sampleWebApi(parameter1: any, parameter2: any): any {

        };
    }

    angular.module("commonResources").factory("sampleResource", ["$http", ($http: ng.IHttpService): ISampleResource => {
        return new SampleResource($http);
    }]);

}