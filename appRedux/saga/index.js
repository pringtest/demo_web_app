import { all, fork, call, put, takeEvery } from 'redux-saga/effects'

import {
   QUERY_DYNAMO_DB
} from "../constants";

// actions
import { 
   queryDynamoDBSuccess,
   queryRDSSuccess,
} from '../actions'

// services
import {
   queryDynamoDBApi,
   queryRDSApi,
} from "../api";

function* queryDynamoDBRequest({ payload }) {
   try {
      const data = yield call(queryDynamoDBApi, payload);
      console.log("dataQuery: ", data)
      if (data) {
         yield put(queryDynamoDBSuccess(data));
      } else {
         throw data
      }
   } catch (error) {
      console.log(error)
   }
}
function* queryRDSRequest({ payload }) {
   try {
      const data = yield call(queryRDSApi, payload);
      console.log("dataQuery: ", data)
      if (data) {
         yield put(queryRDSSuccess(data));
      } else {
         throw data
      }
   } catch (error) {
      console.log(error)
   }
} 

export function* queryDynamoDB() {
   yield takeEvery(QUERY_DYNAMO_DB, queryDynamoDBRequest)
}
export function* queryRDS() {
   yield takeEvery(QUERY_DYNAMO_DB, queryRDSRequest)
}

function* rootSaga() {
   yield all([
      fork(queryDynamoDB),
      fork(queryRDS)
   ])
}

export default rootSaga