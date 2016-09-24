module SampleWeb.Application1.Models {

    export class SampleModel {
        public firstName: string;
        public email: string;

        public isValidEmail = (): boolean => {
            return true;
        }
    }

}