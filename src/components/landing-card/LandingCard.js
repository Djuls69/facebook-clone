import React from 'react'
import './landingCard.css'

const LandingCard = ({ name, avatar }) => {
  return (
    <div className='card'>
      <div className='card__img--delete'>
        <i className='fas fa-times-circle'></i>
      </div>
      <img className='card__img' src={avatar} alt='Profile' />
      <div className='card__name'>
        <h2>{name}</h2>
      </div>
    </div>
  )
}

export default LandingCard
