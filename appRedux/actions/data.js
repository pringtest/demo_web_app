import {
   QUERY_DYNAMO_DB,
   QUERY_DYNAMO_DB_SUCCESS,
   QUERY_RDS,
   QUERY_RDS_SUCCESS,
} from "../constants";


export const queryDynamoDB = (response={}) => {
   return {
      type: QUERY_DYNAMO_DB,
      payload: response
   };
};
export const queryDynamoDBSuccess = (response={}) => {
   return {
      type: QUERY_DYNAMO_DB_SUCCESS,
      payload: response,
   };
};
export const queryRDS = (response={}) => {
   return {
      type: QUERY_RDS,
      payload: response
   };
};
export const queryRDSSuccess = (response={}) => {
   return {
      type: QUERY_RDS_SUCCESS,
      payload: response,
   };
};
