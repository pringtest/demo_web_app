import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from '../reducer'
import rootSaga from '../saga'

const bindMiddleware = (middleware) => {
   if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
   }
   return applyMiddleware(...middleware)
}

export const makeStore = () => {
   const sagaMiddleware = createSagaMiddleware()
   const store = createStore(
      rootReducer,
      bindMiddleware([sagaMiddleware]),
   )
   store.sagaTask = sagaMiddleware.run(rootSaga)

   return store
}

export const wrapper = createWrapper(makeStore, { debug: false })