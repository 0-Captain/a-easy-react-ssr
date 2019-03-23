import React from 'react'
import PropTypes from 'prop-types'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core';
import cx from 'classnames'
import { topicPrimaryStyle, topicSecondaryStyle } from './styles'
import { tabs } from '../../util/variable-define'
import dateFromat from '../../util/date-format'

const Primary = ({ topic, classes }) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
    [classes.good]: topic.good,
  })
  return (
    <span className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </span>
  )
}
Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
const TopicPrimary = withStyles(topicPrimaryStyle)(Primary)

const Secondary = ({ topic, classes }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>
      创建时间：
      {dateFromat(topic.create_at)}
    </span>
  </span>
)
Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
const TopicSecondary = withStyles(topicSecondaryStyle)(Secondary)

const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<TopicPrimary topic={topic} />}
      secondary={<TopicSecondary topic={topic} />}
    />
  </ListItem>
)
TopicListItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TopicListItem
