import { Command, RequestMetaInformation } from './command';


export class Server
{

    host = 'http://localhost:8000';

    public run(cmd: Command) : Promise<any> {   

      let requestMetaInformation : RequestMetaInformation = cmd.requestMeta();

      let queryParams = {};
      let bodyParams = {};
      let formParams = new FormData();

      for(let key in cmd) {
        if(typeof cmd[key] !== "function") {
          if (requestMetaInformation.queryParams.find(k => key === k)) queryParams[key] = cmd[key];
          if (requestMetaInformation.bodyParams.find(k => key === k)) bodyParams[key] = cmd[key];
          if (requestMetaInformation.formParams.find(k => key === k)) formParams.append(key, cmd[key]);
        }
      }


      const requestOptions = {
        method: requestMetaInformation.verb,
        headers: { 'Content-Type': 'application/json' }      
      };

      if (Object.keys(bodyParams).length > 0 || Object.keys(formParams).length >0) {
        requestOptions["body"] = Object.keys(bodyParams).length > 0 ? JSON.stringify(bodyParams) : JSON.stringify(formParams)
      }

      let address = this.host + requestMetaInformation.route + '?' + new URLSearchParams(queryParams).toString();;

      return fetch(address, requestOptions)
      .then(response => {
          return response.json();
      });
    }
}
  