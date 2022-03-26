import {
   QUERY_ALL_DATA,
   QUERY_ALL_DATA_SUCCESS,
   UPDATE_DATE_SELECTION,
} from "../constants";

/* -------------------------------------------------------- */
export const queryAllData = (response) => {
   return {
      type: QUERY_ALL_DATA,
      payload: response
   };
};
export const queryAllDataSuccess = (response) => {
   return {
      type: QUERY_ALL_DATA_SUCCESS,
      payload: response,
   };
};
export const updateDateSelection = (response) => {
   return {
      type: UPDATE_DATE_SELECTION,
      payload: response,
   };
};
 /* -------------------------------------------------------- */
