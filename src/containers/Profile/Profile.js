import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Profile = (props) => {
const user = props.gitUser
  return (
    <div className="Profile">
        <img src={user.avatar_url} alt=""/>
        <h2>{user.name}</h2>
        <div>{user.location}</div>
        <a href={user.email}>{user.email}</a>
        <a href={user.html_url}>{user.html_url}</a>
    </div>
  )
}

Profile.propTypes = {
    gitUser: {
        avatar_url: PropTypes.string,
        user: PropTypes.string,
        location: PropTypes.string,
        email: PropTypes.string,
        html_url: PropTypes.string,
    }
}

export default Profile
