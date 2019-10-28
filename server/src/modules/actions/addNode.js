const { generateLeafChildren } = require("../db/mockDataManager")
const mongo = require("mongodb")
const { saveNodes } = require("../db/dataManager")

const addNode = (value, last, treeCache) => {
  //We use last as a proptotype to generate new one
  let newFactory = last
  newFactory.prev = newFactory._id
  newFactory._id = mongo.ObjectID()
  newFactory.name = value.text
  newFactory.childrenLowerBound = value.min
  newFactory.childrenUpperBound = value.max
  newFactory.next = null
  generateLeafChildren(newFactory)

  let lastToUpdate = treeCache.slice(-1).pop()
  lastToUpdate.next = newFactory._id

  treeCache.push(newFactory)
  saveNodes([lastToUpdate, newFactory]).catch(e =>
    console.error(`Add Node: Could not save data to DB , error:${e}`)
  )
  return {
    removed: [],
    updated: [lastToUpdate],
    added: [newFactory]
  }
}

module.exports = addNode
