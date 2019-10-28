import React from 'react'
import PropTypes from 'prop-types'

import FactoriesTree from '../factory/FactoriesTree'

import withCloudSync, { cloudMessages } from '../hoc/CloudSyncManager'
import AppContext from '../context/AppContext'
import updateTreeStructure from '../helpers/updateTreeStructure'
import ErrorHandler from './ErrorHandler'

class AppWithContext extends React.Component {
  state = {
    treeStructure: null
  }
  static contextActions = null

  componentDidMount() {
    //Start listening messages
    this.props.onCloudMessage(cloudMessages.loadTree, payload =>
      this.setState({ treeStructure: payload })
    )
    this.props.onCloudMessage(cloudMessages.cloudSync, payload =>
      this.setState({
        treeStructure: updateTreeStructure(this.state.treeStructure, payload)
      })
    )

    //List of application level actions will be translated into cloud messages
    const deleteFactory = id => {
      this.props.sendCloudMessage(cloudMessages.deleteFactory, id)
    }
    const randomize = factoryObject => {
      this.props.sendCloudMessage(cloudMessages.randomize, factoryObject)
    }

    const addFactory = (value, last) => {
      this.props.sendCloudMessage(cloudMessages.addFactory, { value, last })
    }

    const editFactory = value => {
      this.props.sendCloudMessage(cloudMessages.editFactory, value)
    }

    //All actions are packed into an object
    this.contextActions = {
      deleteFactory,
      randomize,
      addFactory,
      editFactory
    }
  }

  render() {
    return (
      <AppContext.Provider
        value={[
          this.state.treeStructure || [],
          this.contextActions,
          this.props.onCloudMessage
        ]}
      >
        <FactoriesTree />
        <ErrorHandler />
      </AppContext.Provider>
    )
  }
}

AppWithContext.propTypes = {
  onCloudMessage: PropTypes.func,
  sendCloudMessage: PropTypes.func
}
//We wrap application with cloud sync hoc to delegate network communication
export default withCloudSync(AppWithContext)
