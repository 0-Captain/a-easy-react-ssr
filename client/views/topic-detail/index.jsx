import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import Markdown from 'react-markdown/with-html'
import Helmet from 'react-helmet'

import Divider from '@material-ui/core/Divider'
import withStyle from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'

import Container from '../layout/container'
import styles from './style'
import Replies from './reply'

import dateFormat from '../../util/date-format'

@inject('topicStore') @observer class TopicDetail extends React.Component {
  // topicId = this.props.location.pathname.split('/')[2]
  topicId = this.props.match.params.id

  componentWillMount() {
    this.getContent()
  }

  componentDidMount() {
    this.props.topicStore.fetchTopicDetail(this.topicId)
  }

  getContent = () => {
    let { topics = [] } = this.props.topicStore || { topics: [] }
    topics = topics.slice()
    if (topics.length === 0) {
      this.topicDetail = {
        content: '',
      }
    }
    for (let i = 0; i < topics.length; i += 1) {
      if (topics[i].id === this.topicId) {
        this.topicDetail = topics[i]
        break
      }
    }
  }

  render() {
    const { classes, topicStore } = this.props
    const { topicDetail } = topicStore
    return (
      <div className={classes.root}>
        <Container>
          <div style={{ position: 'inline-block' }}>
            <Helmet>
              <title>{topicDetail.title}</title>
            </Helmet>
            <header className={classes.header}>
              <h2 className={classes.title}>{topicDetail.title}</h2>
              <span className={classes.time}>{dateFormat(topicDetail.create_at)}</span>
              {/* <span>{topicDetail.}</span> */}
            </header>
            <Divider variant="middle" className={classes.divider} />
            <section className={classes.content}>
              <Markdown
                source={topicDetail ? topicDetail.content : this.topicDetail.content}
                escapeHtml={false}
              />
            </section>
          </div>
        </Container>
        <Divider variant="middle" className={classes.divider} />
        <div style={{ margin: '2em', backgroundColor: 'rgba(144, 144, 144, 0.1)' }}>
          <span>
            评论数：
            {topicDetail.reply_count}
          </span>
          <span style={{ float: 'right' }}>
            最后一条评论在：
            {dateFormat(topicDetail.last_reply_at)}
          </span>
        </div>
        {
          topicDetail.replies && topicDetail.replies.length ? (
            <div style={{
              marginTop: '3em',
            }}
            >
              <Paper style={{ background: 'transparent' }}>
                <Replies replies={topicDetail.replies} />
              </Paper>
            </div>
          ) : null
        }
      </div>
    )
  }
}

TopicDetail.propTypes = {
  topicStore: PropTypes.object,
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyle(styles)(TopicDetail)
