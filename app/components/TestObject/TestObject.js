import React from 'react'
import { testImg, testImg2 } from './styles.css'

export default class TestObject extends React.Component {
  static get propTypes () {
    return {
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      testObject: null,
    }
  }

  render () {
    return (
      <div>
        <div>
          {'Test Object'}
        </div>
        <div className={testImg}></div>
        <div className={testImg2}>
          <img src='/public/blue.png'/>
        </div>
      </div>
    )
  }
}
