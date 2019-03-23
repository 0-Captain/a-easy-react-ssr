import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    background: 'transparent',
    textAlign: 'center',
  },
}

const Container = ({ classes, children }) => (
  <Paper className={classes.root}>
    {children}
  </Paper>
)

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}

export default withStyles(styles)(Container)
