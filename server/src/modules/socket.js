const mockDataManager = require("./db/mockDataManager")
const dataManager = require("./db/dataManager")
const processEvents = require("./networkEventProcessor")

let mockTree = mockDataManager.loadTree()

const onConnection = (socket, somethig) => {
  console.log(`Client connected with id ${socket.id}`)

  socket.on("disconnect", () => {
    console.log(`Disconnected client with id ${socket.id}`)
  })

  dataManager
    .loadTree()
    .then(dbTree => {
      const tree = dbTree.length ? dbTree : mockTree
      socket.emit("load_persisted_tree_structure", tree)
      processEvents(socket, tree)

      if (!dbTree.length) {
        dataManager.saveTree(mockTree)
      }
    })
    .catch(err => console.error(err))
}

const socketHandler = io => {
  console.log(`Socket io object is passed to the handler ${io}`)

  io.on("connection", onConnection)
}

module.exports = socketHandler
