import React from 'react'

const Alerts = (props) => {
  return (
    <div>
      <div class="alert alert-primary" role="alert">
      {props.message}
      </div>
    </div>
  )
}

export default Alerts
