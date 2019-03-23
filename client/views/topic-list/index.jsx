import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes, { node } from 'prop-types' // eslint-disable-line
import Helmet from 'react-helmet'

import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'

import querystring from 'query-string'
import { TopicStore } from '../../store/store'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { tabs } from '../../util/variable-define'

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  tab: {
    color: '#777',
    backgroundColor: '#555',
    opacity: '0.7',
    flexGrow: 1,
  },
}

@inject('topicStore') @observer class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.context = context
  }

  componentDidMount() {
    const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search))
    }
  }

  getTab = (search = this.props.location.search) => {
    const query = querystring.parse(search)
    return query.tab || 'all'
  }

  bootstrap = () => (
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 5)
    })
  )

  changeTab = (event, value) => {
    this.context.router.history.push({
      pathname: '/list',
      search: `tab=${value}`,
    })
  }

  listItemClick = (topicId) => {
    this.context.router.history.push(`/detail/${topicId}`)
  }

  render() {
    const { classes, topicStore } = this.props
    const { topics: topicList, syncing: syncingTopics } = topicStore
    const thisTab = this.getTab()
    return (
      <div className={classes.root}>
        <Container>
          <div>
            <Helmet>
              <title>话题列表</title>
            </Helmet>
            <Tabs
              value={thisTab}
              onChange={this.changeTab}
              className={classes.tab}
              centered
              textColor="secondary"
              indicatorColor="primary"
            >
              {
                Object.keys(tabs).map(key => <Tab label={tabs[key]} value={key} key={key} />)
              }
            </Tabs>
            {/* {value === 0 && <TabContainer>全部内容</TabContainer>}
            {value === 1 && <TabContainer>精华内容</TabContainer>}
            {value === 2 && <TabContainer>分享内容</TabContainer>}
            {value === 3 && <TabContainer>问答内容</TabContainer>}
            {value === 4 && <TabContainer>招聘内容</TabContainer>}
            {value === 5 && <TabContainer>客户端测试内容</TabContainer>} */}
            <List>
              {
                topicList.map(topic => (
                  <div key={topic.id}>
                    <TopicListItem
                      onClick={() => this.listItemClick(topic.id)}
                      topic={topic}
                    />
                    <Divider variant="middle" style={{ background: '#333', opacity: '0.3' }} />
                  </div>
                ))
              }
            </List>
            {
              syncingTopics ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '40px 0',
                }}
                >
                  <CircularProgress color="secondary" size={100} />
                </div>
              ) : null
            }
          </div>
        </Container>
      </div>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore),
}

TopicList.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicList)
