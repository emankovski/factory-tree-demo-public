const { saveNodes, deleteNodes } = require("../db/dataManager")

const deleteNode = (id, treeCache) => {
  //Data tree is ordered
  const index = treeCache.findIndex(c => c._id.toString() === id)
  if (index < 1) {
    throw `Cannot find factory with id ${id} when deleting`
  }

  if (treeCache.length < 3) {
    //Root + First, cannot delete more
    throw "Cannot delete last factory. There has to be at least one."
  }

  if (treeCache[index].prev && treeCache[index].next) {
    treeCache[index - 1].next = treeCache[index].next
    treeCache[index + 1].prev = treeCache[index].prev

    const updated = [treeCache[index - 1], treeCache[index + 1]]
    const removed = treeCache[index]
    treeCache.splice(index, 1)

    saveNodes(updated).catch(e =>
      console.error(`Delete Node: Could not save data to DB , error:${e}`)
    )
    deleteNodes([removed]).catch(e =>
      console.error(`Delete Node: Could not delete data to DB , error:${e}`)
    )
    return {
      removed: [removed],
      updated,
      added: []
    }
  }

  if (treeCache[index].prev) {
    treeCache[index - 1].next = treeCache[index].next
    const updated = [treeCache[index - 1]]
    const removed = treeCache[index]
    treeCache.splice(index, 1)

    saveNodes(updated).catch(e =>
      console.error(`Delete Node: Could not save data to DB , error:${e}`)
    )
    deleteNodes([removed]).catch(e =>
      console.error(`Delete Node: Could not delete data to DB , error:${e}`)
    )

    return {
      removed: [removed],
      updated,
      added: []
    }
  }

  if (treeCache[index].next) {
    treeCache[index + 1].prev = treeCache[index].prev

    const updated = [treeCache[index + 1]]
    const removed = treeCache[index]
    treeCache.splice(index, 1)

    saveNodes(updated).catch(e =>
      console.error(`Delete Node: Could not save data to DB , error:${e}`)
    )
    deleteNodes([removed]).catch(e =>
      console.error(`Delete Node: Could not delete data to DB , error:${e}`)
    )

    return {
      removed: [removed],
      updated,
      added: []
    }
  }
}

module.exports = deleteNode
