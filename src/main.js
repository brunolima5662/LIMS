import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { reduxBatch }  from '@manaflair/redux-batch'
import App from './components/App'

import thunk from 'redux-thunk'
import api   from './modules/api'
import LIMS  from './reducers'

// Build redux store
const store = createStore(
    LIMS,
    compose( applyMiddleware( thunk.withExtraArgument({ api }) ), reduxBatch )
)

// render app
render(
        <Provider store={ store }>
            <App />
        </Provider>,
document.getElementById( 'app' ))