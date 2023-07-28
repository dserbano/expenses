import {Command, RequestMetaInformation} from '../command';
import { Expense } from '../../models';

export class AllExpenses implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/all_expenses/',
      verb: 'GET',
      queryParams: ["category"],
      bodyParams: [],
      formParams: []
    };
  }

}

export class AllExpensesResponse {
    expenses: Array<Expense>;
  
    constructor( expenses: Array<Expense>){
      this.expenses = expenses;
    }
  }