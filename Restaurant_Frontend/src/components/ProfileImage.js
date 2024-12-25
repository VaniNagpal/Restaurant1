import React from 'react'

const ProfileImage = (props) => {

    return (
        <img src={props.imageUrl} className="w-8 h-8  m-2 rounded-full border-2 object-cover"></img>
    )
}

export default ProfileImage