import {Command, RequestMetaInformation} from '../command';
import { Expense } from '../../models';

export class GetExpense implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/get_expense/',
      verb: 'GET',
      queryParams: ['id'],
      bodyParams: [],
      formParams: []
    };
  }

}

export class GetExpenseResponse {
    expense: Expense;
  
    constructor(expense: Expense){
      this.expense = expense;
    }
  }