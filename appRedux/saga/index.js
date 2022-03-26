import { all, fork, call, put, takeEvery } from 'redux-saga/effects'

import {
   QUERY_ALL_DATA
} from "../constants";

// actions
import { 
   queryAllDataSuccess 
} from '../actions'

// services
import {
   queryAllDataApi,
} from "../api";

function* queryAllDataRequest({ payload }) {
   console.log(payload)

   try {
      const data = yield call(queryAllDataApi, payload);
      
      console.log("dataQuery: ", data)

      if (data) {
         yield put(queryAllDataSuccess(data));
      }
   } catch (error) {
      console.log(error)
   }
}

export function* queryAllData() {
   yield takeEvery(QUERY_ALL_DATA, queryAllDataRequest)
}

function* rootSaga() {
   yield all([
      fork(queryAllData)
   ])
}

export default rootSaga