module SampleWeb.Common.Model.User {
    export interface ILoggedInUser {
        EmailAddress?: string;
        FullName?: string;
        Profiles?: Array<string>;
        UserId?: string;
        UserName?: string;
        ActiveCurrency?: string;
        CurrencySign?: string;
    }
}