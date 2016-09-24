module SampleWeb.Common.Model {
    export class UserDetails {
        userName: string;
        password: string;
        emailId: string;
        fullName: string;
        firstName: string;
        lastName: string;
        organizationId: number;
        selectUserProfileIds: Array<number>;
        selectedCostCenterIds: Array<number>;
        selectedCostCenterName: string;
        selectedPerson: any;
        selectedPersonId: number;
        isUserBlocked: boolean;
        selectedPersonFullName: string;
        notifyEndUser: boolean;
        selectedInvoiceRefernces: Array<number>;

    }
}