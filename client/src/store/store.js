import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer'; // combine all reducer and use it as a root reducer



//A store  It's just an object with a few methods on it. To create it, pass your 
//root reducing function to createStore.


// Store Methods
// getState()
// dispatch(action)
// subscribe(listener)
// replaceReducer(nextReducer)

const initialState = {};    //Initially its empty

const middleware = [thunk]; //Just initialize to the middleware.

const store = createStore(  //createStore(reducer, [preloadedState], [enhancer])
  rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;

// connect react and redux using provider.