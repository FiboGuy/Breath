import React from 'react'
import Router from './Router'
import configureStore from './redux/configureStore'
import {Provider} from 'react-redux'

const store = configureStore()

const App = () => {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
}

export default App