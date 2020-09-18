import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { tokenExpires } from './redux/actions/userActions'
import { connect } from 'react-redux'
import { auth } from './firebase/firebase'
import Landing from './pages/landing/Landing'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'

const App = ({ users: { user }, tokenExpires }) => {
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        tokenExpires()
      }
    })
  }, [tokenExpires])

  return (
    <Router>
      {user !== null && <Navbar />}
      <Switch>
        <Route exact path='/' render={() => (user === null ? <Landing /> : <Home />)} />
      </Switch>
    </Router>
  )
}

const mapState = state => ({
  users: state.users
})

export default connect(mapState, { tokenExpires })(App)
