import React from 'react'

const UserResultSubmit = (props) => {
  const { name, email } = props.formData;
  return (
    <div>
      <p>Name: { name }</p>
      <p>Email: { email }</p>
    </div>
  )
}

export default UserResultSubmit