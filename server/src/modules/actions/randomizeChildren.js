const { generateLeafChildren } = require("../db/mockDataManager")
const { saveNodes } = require("../db/dataManager")

const randomizeChildren = (factoryObject, treeCache) => {
  //Data tree is ordered
  const index = treeCache.findIndex(c => c._id.toString() === factoryObject._id)
  if (index < 1) {
    //TODO:throw error
    return {
      removed: [],
      updated: [],
      added: []
    }
  }
  let result = treeCache[index]
  generateLeafChildren(result)
  saveNodes([result]).catch(e =>
    console.error(`Randomize: Could not save data to DB , error:${e}`)
  )
  return {
    removed: [],
    updated: [result],
    added: []
  }
}

module.exports = randomizeChildren
