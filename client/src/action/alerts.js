import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout=4000) => dispatch => {
  const id = uuidv4();
  //console.log(uuidv4());
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id}
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

// middleware allow us to   write action creators that return a function instead of an action. 

//The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain 
//condition is met. 


  //setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);

  //Redux middleware can thus solve for many critical asynchronous needs

  // Check what the incoming action is:
  // If it is a regular action object, Redux-Thunk does not do anything and the action object is
  // processed by the store’s reducer
  // 2. If the action is a function, Redux-Thunk invokes it and passes it the store’s dispatch and 
  //getState methods and any extra arguments (e.g., axios)
  // 3. After the function runs, the thunk then dispatches the action, which will then 
  //update the state accordingly