import React from 'react'
import PropTypes from 'prop-types'

import withStyle from '@material-ui/core/styles/withStyles'

import Routes from '../config/router'
import backgroundImage from '../public/3790904986439281061.jpg'

const style = {
  root: {
    paddingTop: '1px',
    margin: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  },
}

let Temp = ({ classes }) => (
  <div className={classes.root}>
    <Routes key="routes" />
  </div>
)

Temp.propTypes = {
  classes: PropTypes.object,
}

Temp = withStyle(style)(Temp)


export default class App extends React.Component {
  componentDidMount() {
    // dos something
  }

  render() {
    return (
      <Temp />
    )
  }
}
