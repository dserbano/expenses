import {Command, RequestMetaInformation} from '../command';
import { Expense } from '../../models';

export class NewExpense implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/new_expense/',
      verb: 'POST',
      queryParams: [],
      bodyParams: ["name", "group", "category", "cost", "currency"],
      formParams: []
    };
  }

}

export class NewExpenseResponse {
  success: boolean;
  
  constructor( success: boolean){
    this.success = success;
  }
}