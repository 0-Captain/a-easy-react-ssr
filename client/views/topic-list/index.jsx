import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types' // eslint-disable-line
import { AppState } from '../../store/app-state' // eslint-disable-line

@inject('appState') @observer class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {
    // do something
  }

  changeName(event) {
    this.props.appState.changeName(event.target.value) // eslint-disable-line
  }

  render() {
    const { appState } = this.props // eslint-disable-line
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        msg-&gt;&nbsp;
        {appState.msg}
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList
