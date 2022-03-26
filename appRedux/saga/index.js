import { all, fork, call, put, takeEvery } from 'redux-saga/effects'

import {
   QUERY_DYNAMO_DB
} from "../constants";

// actions
import { 
   queryDynamoDBSuccess 
} from '../actions'

// services
import {
   queryDynamoDBApi,
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

export function* queryDynamoDB() {
   yield takeEvery(QUERY_DYNAMO_DB, queryDynamoDBRequest)
}

function* rootSaga() {
   yield all([
      fork(queryDynamoDB)
   ])
}

export default rootSaga