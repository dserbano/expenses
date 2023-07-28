import {Command, RequestMetaInformation} from '../command';

export class DeleteExpense implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/delete_expense/',
      verb: 'DELETE',
      queryParams: [],
      bodyParams: ['id'],
      formParams: []
    };
  }

}

export class DeleteExpenseResponse {
    success: boolean;
    
    constructor( success: boolean){
      this.success = success;
    }
}