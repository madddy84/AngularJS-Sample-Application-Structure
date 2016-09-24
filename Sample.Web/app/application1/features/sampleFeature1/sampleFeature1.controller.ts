module SampleWeb.Application1.Features.SampleFeature {
    
    export interface ISampleFeature1Controller {
        firstName: string;
        lastName: string;
        saveUser():void;
    }

    export class SampleFeature1Controller implements ISampleFeature1Controller {
        firstName: string;
        lastName: string;

        public static $inject = ["dependency1", "dependency2"];

        constructor(public dependency1: any, public dependency2: any) {
            
        }

        saveUser(): void { }
    }

    angular.module("sampleFeature1").controller("SampleFeature1Controller", SampleFeature1Controller);
}