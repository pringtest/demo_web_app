import {
   QUERY_DYNAMO_DB,
   QUERY_DYNAMO_DB_SUCCESS,
   QUERY_RDS,
   QUERY_RDS_SUCCESS,
} from '../constants'

import { HYDRATE } from 'next-redux-wrapper'


const initialState = {
   dynamoDB_Data: {},
   rds_Data: {},
   dynamoDB_Data_loader: false,
   rds_Data_loader: false,
}

const rootReducer = (state = initialState, action) => {
   // console.log(action)
   // console.log(state)

   switch (action.type) {
      case HYDRATE: {
         return {
            ...state,
            ...action.payload
         }
      }

      case QUERY_DYNAMO_DB: {
         return {
            ...state,
            dynamoDB_Data_loader: true,
         }
      }
      case QUERY_DYNAMO_DB_SUCCESS: {
         return {
            ...state,
            dynamoDB_Data_loader: false,
            dynamoDB_Data: action.payload
         }
      }

      case QUERY_RDS: {
         return {
            ...state,
            rds_Data_loader: true,
         }
      }
      case QUERY_RDS_SUCCESS: {
         return {
            ...state,
            rds_Data_loader: false,
            rds_Data: action.payload
         }
      }

      default:
         return state
   }
}

export default rootReducer
