import {
   QUERY_ALL_DATA,
   QUERY_ALL_DATA_SUCCESS,
   UPDATE_DATE_SELECTION
} from '../constants'

import { HYDRATE } from 'next-redux-wrapper'

function roundMinutes(date) {
   date.setHours(0);
   date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

   return date;
}

const initialState = {
   allData: {
      param: ["empty"],
      data: []
   },
   allData_loader: false,
   dateSelection: {
      startDate: roundMinutes(new Date()),
      endDate: roundMinutes(new Date()),
      key: 'selection'
   }
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

      case QUERY_ALL_DATA: {
         return {
            ...state,
            allData_loader: true,
         }
      }
      case QUERY_ALL_DATA_SUCCESS: {
         return {
            ...state,
            allData_loader: false,
            allData: action.payload
         }
      }
      case UPDATE_DATE_SELECTION: {
         return {
            ...state,
            dateSelection: action.payload.selection,
         }
      }

      default:
         return state
   }
}

export default rootReducer
