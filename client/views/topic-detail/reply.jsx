import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import withStyles from '@material-ui/core/styles/withStyles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionDetail from '@material-ui/core/ExpansionPanelDetails'
import MarkDown from 'react-markdown/with-html'

import styles from './style'

let Reply = ({ reply, classes }) => (
  <div style={classes.reply.summary} key={reply.id}>
    <div>
      <Chip
        color="secondary"
        avatar={<Avatar src={reply.author.avatar_url} />}
        variant="outlined"
        label={reply.author.loginname}
      />
      {reply.reply_id ? (
        <div style={{ display: 'inline-block' }}>
          &nbsp;回复：
          <Chip
            color="primary"
            avatar={<Avatar src={reply.reply_avatar} />}
            variant="outlined"
            label={reply.reply_name}
          />
        </div>
      ) : null}
    </div>
    <div className={classes.reply.content}>
      <MarkDown source={reply.content} />
    </div>
  </div>
)

Reply = withStyles(styles)(Reply)

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object,
}


function getReplyTree(replies) {
  const tree = {}
  const allTree = {}
  for (let m = 0; m < replies.length; m += 1) {
    const reply = replies[m]
    Object.assign(reply, { children: {} })
    allTree[reply.id] = reply
    reply.address = [] // eslint-disable-line
    if (reply.reply_id === null) {
      tree[reply.id] = reply
    } else {
      if (allTree[reply.reply_id] === undefined) {
        continue
      }
      reply.reply_name = allTree[reply.reply_id].author.loginname
      reply.reply_avatar = allTree[reply.reply_id].author.avatar_url
      reply.address = reply.address.concat([...allTree[reply.reply_id].address, reply.reply_id])
      let node = tree[reply.address[0]].children
      for (let i = 1; i < reply.address.length; i += 1) {
        node = node[reply.address[i]].children
      }
      node[reply.id] = reply
    }
  }
  return tree
}

function ObjToArr(obj) {
  return Object.keys(obj).map(key => obj[key])
}

function traverseTree(root) {
  const queue = [...ObjToArr(root)]
  queue.forEach((reply) => {
    if (Object.keys(reply.children).length) {
      queue.push(...ObjToArr(reply.children))
    }
  })
  return queue.map(reply => <Reply reply={reply} key={reply.id} />)
}

const Replys = ({ replies, classes }) => {
  const tree = getReplyTree(replies)
  return Object.keys(tree).map((replyId) => {
    const reply = tree[replyId]
    const summary = traverseTree(reply.children)
    return (
      <ExpansionPanel key={reply.id} style={{ background: 'transparent' }} disable={summary.length ? 0 : 1}>
        <ExpansionPanelSummary>
          <Reply reply={reply} classes={classes} />
        </ExpansionPanelSummary>
        {
          summary.length ? (
            <ExpansionDetail style={{ display: 'block' }}>
              {summary}
            </ExpansionDetail>
          ) : null
        }
      </ExpansionPanel>
    )
  })
}

Replys.propTypes = {
  replies: PropTypes.array.isRequired,
  classes: PropTypes.object,
}

export default Replys
