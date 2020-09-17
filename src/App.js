import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import { loadUser } from './redux/actions/userActions'
import { connect } from 'react-redux'

const App = ({ loadUser }) => {
  useEffect(() => {
    const facebookToken = localStorage.getItem('facebook-token')
    if (facebookToken) {
      loadUser(facebookToken)
    }
  }, [loadUser])

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
      </Switch>
    </Router>
  )
}

export default connect(null, { loadUser })(App)
