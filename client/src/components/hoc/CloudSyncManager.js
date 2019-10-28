import React from 'react'
import io from 'socket.io-client'

//Store cloud messages together with manager
export const cloudMessages = {
  loadTree: 'load_persisted_tree_structure',
  deleteFactory: 'delete_node',
  randomize: 'randomize_children',
  cloudSync: 'cloud_sync_up_to_clients',
  addFactory: 'add_new_factory',
  editFactory: 'edit_factory',
  serverError: 'server_error',
  connectError: 'connect_error'
}

//Init socket address on module level
const endpoint = process.env.REACT_APP_API_HOST || 'https://api.mankovski.net'
console.log(`Socket will be open to ${endpoint}`)

const CloudSyncManagerWrapper = WrappedComponent => {
  let socket = null
  let subscribers = {}

  class CloudSyncManager extends React.Component {
    componentDidMount() {
      //Note: We create socket and listen right away
      //because server may respond rather quickly
      socket = io(endpoint)

      //This is to report case when we could not even connect
      socket.io.on(cloudMessages.connectError, data => {
        this.handleMessage(cloudMessages.connectError, data)
      })

      socket.on('connect', () => {
        //Shortcut to traverse all supported cloud messages
        Object.keys(cloudMessages).forEach(c => {
          socket.on(cloudMessages[c], data =>
            this.handleMessage(cloudMessages[c], data)
          )
        })
      })
    }

    componentWillUnmount() {
      subscribers = {}
    }

    sendMessage(messageType, payload) {
      socket.emit(messageType, payload)
    }

    handleMessage(messageType, payload) {
      try {
        if (!subscribers[messageType]) {
          console.warn(`No listeners for ${messageType}`)
          return
        }
        subscribers[messageType].forEach(c => c(payload))
      } catch (error) {
        console.error(error)
      }
    }

    addSubscriber(messageType, callBack = () => {}) {
      if (!subscribers[messageType]) {
        subscribers[messageType] = []
      }
      subscribers[messageType].push(callBack)
    }

    render() {
      const newProps = {
        ...this.props,
        sendCloudMessage: this.sendMessage,
        onCloudMessage: this.addSubscriber
      }
      return <WrappedComponent {...newProps} />
    }
  }

  return CloudSyncManager
}

export default CloudSyncManagerWrapper
