import React, { PropTypes } from 'react'

App.propTypes = {
  children: PropTypes.object,
}

export default function App (props) {
  return (
    <div className={app}>
      {props.children}
    </div>
  )
}
