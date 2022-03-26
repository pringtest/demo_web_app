import { Service } from '../services';

const domainAWS = 'https://34irp00joi.execute-api.ap-southeast-1.amazonaws.com/dev';
const path = 'weatherdata';

export const queryAllDataApi = async ({ dateFrom, dateTo, paramList }) => {
  try {
    let method = 'GET';
    var queryParam = '?'
      + `dateFrom=${dateFrom}` + '&'
      + `dateTo=${dateTo}` + '&' 
      + `parameters=${paramList}`;
    
    var newPath = path + queryParam;
    
    let response = await Service(domainAWS, newPath, { method });
    
    return response;
  } catch (error) {
    throw error;
  }
}