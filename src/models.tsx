export enum Currency {
    USD = "USD",
    INR = "INR",
    EUR = "EUR",
    GBP = "GBP",
    CAD = "CAD",
    JPY = "JPY"
};

export enum ExpenseType {
    Accomodation = "Accomodation",
    Transportation = "Transportation",
    Food = "Food",
    Services = "Services",
    Hobbies = "Hobbies",
    Turism = "Turism",
    Misc = "Misc" 
}

export class Expense {
    id: string;
    name: string;
    group: string;
    category: ExpenseType;
    cost: number;
    currency: Currency;
    date: Date;
    rates:any;
    
    constructor( id: string, group:string, name: string, category: ExpenseType, cost: number, currency: Currency, date: Date, rates: any){
        this.id = id;
        this.group = group;
        this.name = name;
        this.category = category;
        this.cost = cost;
        this.currency = currency;
        this.date = date;
        this.rates = rates;
    }
}