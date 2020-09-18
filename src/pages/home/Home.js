import React from 'react'
import './home.css'
import { signOut } from '../../redux/actions/userActions'
import { connect } from 'react-redux'

const Home = ({ signOut }) => {
  return (
    <section className='home'>
      <h1>Home</h1>
      <button onClick={signOut} style={{ color: 'white', backgroundColor: 'var(--facebook-blue' }}>
        Se déconnecter
      </button>
    </section>
  )
}

export default connect(null, { signOut })(Home)
