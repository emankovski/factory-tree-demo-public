const { generateLeafChildren } = require("../db/mockDataManager")
const { saveNodes } = require("../db/dataManager")

const editNode = (updatedNode, treeCache) => {
  //Data tree is ordered
  const index = treeCache.findIndex(c => c._id.toString() === updatedNode._id)
  if (index < 1) {
    throw `Cannot find factory with id ${updatedNode._id} when editing`
  }

  generateLeafChildren(updatedNode)

  treeCache.splice(index, 1, updatedNode)
  saveNodes([updatedNode]).catch(e =>
    console.error(`Edit Node: Could not save data to DB , error:${e}`)
  )
  return {
    removed: [],
    updated: [updatedNode],
    added: []
  }
}

module.exports = editNode
