import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import TestObject from 'components/TestObject/TestObject'
import App from 'components/App/App'

export default function RootContainer () {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={TestObject} />
      </Route>
    </Router>
  )
}

ReactDOM.render(
  <RootContainer/>,
  document.getElementById('app'))
