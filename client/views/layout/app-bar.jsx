import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import HomeIcon from '@material-ui/icons/Home'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'transparent',
  },
  text: {
    flex: 1,
    marginLeft: '3em',
    fontSize: '2em',
  },
  bar: {
    height: '3em',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    marginLeft: '1em',
    marginRight: '1em',
  },
}

class MainAppBar extends React.Component {
  onHomeIconClick = () => {
    // do
  }

  loginButtonClick = () => {
    // do
  }

  createTopic = () => {
    // do
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar className={classes.bar}>
          <ToolBar>
            {/* <IconButton color="secondary" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton> */}
            <Typography className={classes.text} color="error">RNode</Typography>
            <Button variant="contained" color="secondary" onClick={this.createTopic} className={classes.button}>新建话题</Button>
            <Button onClick={this.loginButtonClick} color="primary" className={classes.button}>登陆</Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainAppBar)
