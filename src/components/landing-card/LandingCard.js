import React from 'react'
import './landingCard.css'
import { removeAccount } from '../../redux/actions/accountsActions'
import { connect } from 'react-redux'

const LandingCard = ({ account, removeAccount }) => {
  const { email, firstName, avatar } = account
  return (
    <div className='card'>
      <div onClick={() => removeAccount(email)} className='card__img--delete'>
        <i className='fas fa-times-circle'></i>
      </div>
      <img className='card__img' src={avatar} alt='Profile' />
      <div className='card__name'>
        <h2>{firstName}</h2>
      </div>
    </div>
  )
}

export default connect(null, { removeAccount })(LandingCard)
