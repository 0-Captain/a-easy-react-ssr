import React from 'react'
import PropType from 'prop-types'

import withStyle from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

const style = {
  root: {
    backgroundColor: '#333',
  },
}

const RightCard = ({ classes }) => (
  <Card className={classes.root}>
    <CardContent>
      <Typography>
        RNode: React搭建的CNode社区
      </Typography>
      <Typography>
        您可以点击此处登陆
      </Typography>
      <CardActions>
        <Button size="medium">login</Button>
      </CardActions>
    </CardContent>
  </Card>
)


RightCard.propTypes = {
  classes: PropType.object,
}

export default withStyle(style)(RightCard)
