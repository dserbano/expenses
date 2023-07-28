import {Command, RequestMetaInformation} from '../command';
import { Expense } from '../../models';

export class EditExpense implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/edit_expense/',
      verb: 'PUT',
      queryParams: [],
      bodyParams: ["id", "name", "group", "category", "cost", "currency"],
      formParams: []
    };
  }

}

export class EditExpenseResponse {
    success: boolean;
  
    constructor( success: boolean){
      this.success = success;
    }
  }