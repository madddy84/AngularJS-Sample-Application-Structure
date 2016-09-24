module SampleWeb.Application1.Services {

    export interface ISampleService  {
        sampleMethod():any;
    }
    
    export class SampleService implements ISampleService {
        
        public static $inject = ["dependency1", "dependency2"];

        constructor(public dependency1, public dependency2) {

            
        }

        sampleMethod() {
            
        }
    }

    angular.module("commonServices").service("localizationService", SampleService);
}
