import {
  observable,
  // extendObservable,
  action,
  runInAction,
  configure,
} from 'mobx'
import { topicSchema } from '../util/variable-define'
import { get } from '../util/http'

configure({ enforceActions: 'observed' })

class Topic {
  constructor(data) {
    Object.assign(this, topicSchema, data)
    // extendObservable(this, topic)
  }
}

export default class TopicStore {
  constructor({ topics = [], syncing = false, topicDetail = {} } = {}) {
    this.topics = topics.map(topic => new Topic(topic))
    this.syncing = syncing
    this.topicDetail = topicDetail
  }

  @observable topics

  @observable syncing

  @observable topicDetail

  addTopic(topic) {
    this.topics.push(new Topic(topic))
  }

  @action fetchTopics(tab) {
    return new Promise((resolve, reject) => {
      this.syncing = true
      const url = '/topics'
      get(url, {
        mdrender: false,
        tab,
      }).then((resp) => {
        const { data } = resp
        if (data && resp.success) {
          runInAction(() => {
            this.topics = data.map(topic => new Topic(topic))
            this.syncing = false
          })
          resolve()
        } else {
          reject(new Error(`cannot get topicList from ${url}`))
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  @action fetchTopicDetail(id) {
    this.syncing = true
    const url = `/topic/${id}`
    return new Promise((resolve, reject) => {
      this.syncing = true
      get(url, {
        mdrender: false,
      }).then((resp) => {
        const { data } = resp
        if (data && resp.success) {
          runInAction(() => {
            this.topicDetail = data
            this.syncing = false
          })
          resolve()
        } else {
          reject(new Error(`cannot get topicDetail from ${url}`))
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  toJson() {
    return {
      topics: this.topics,
      syncing: this.syncing,
    }
  }
}
