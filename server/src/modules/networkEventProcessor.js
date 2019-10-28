const deleteNode = require("./actions/deleteNode")
const randomizeChildren = require("./actions/randomizeChildren")
const addNode = require("./actions/addNode")
const editNode = require("./actions/editNode")

const cloudSyncMessage = "cloud_sync_up_to_clients"
const randomizeChildrenMessage = "randomize_children"
const deleteNodeMessage = "delete_node"
const addFactoryMessage = "add_new_factory"
const serverErrorMessage = "server_error"
const editFactory = "edit_factory"

const handleError = (socket, func) => {
  try {
    const syncData = func()
    socket.server.emit(cloudSyncMessage, syncData)
  } catch (error) {
    socket.emit(serverErrorMessage, error.message || error)
    console.error(error)
  }
}

const eventProcessor = (socket, treeCache) => {
  //Just a shorthand not to write socket.on every time
  const eventHandlers = {
    [deleteNodeMessage]: id => {
      handleError(socket, () => deleteNode(id, treeCache))
    },
    [randomizeChildrenMessage]: node => {
      handleError(socket, () => randomizeChildren(node, treeCache))
    },
    [addFactoryMessage]: ({ value, last }) => {
      handleError(socket, () => addNode(value, last, treeCache))
    },
    [editFactory]: value => {
      handleError(socket, () => editNode(value, treeCache))
    }
  }

  Object.keys(eventHandlers).forEach(handler => {
    socket.on(handler, eventHandlers[handler])
  })
}

module.exports = eventProcessor
