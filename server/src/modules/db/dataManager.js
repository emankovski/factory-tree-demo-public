const runQuery = require("./connectionManager")
const mongo = require("mongodb")
const factorySchema = require("../../schemas/factory.json")
const Ajv = require("ajv")

const validateFactorySchema = factory => {
  var ajv = new Ajv({ schemaId: "auto" })

  ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"))
  try {
    const validate = ajv.compile(factorySchema)
    const isValid = validate(factory)
    if (!isValid) {
      console.error(validate.errors)
      throw "Document has incorrect schema..."
    }
  } catch (err) {
    throw err.message || err
  }
}

const updateMongoIds = factoryObject => {
  factoryObject._id = mongo.ObjectID(factoryObject._id)
  factoryObject.parentId = factoryObject.parentId
    ? mongo.ObjectID(factoryObject.parentId)
    : null

  factoryObject.prev = factoryObject.prev
    ? mongo.ObjectID(factoryObject.prev)
    : null

  factoryObject.next = factoryObject.next
    ? mongo.ObjectID(factoryObject.next)
    : null
}

const loadTree = async () => {
  const loadAllFactories = async db => {
    const factories = db.collection("factories")

    const result = await factories
      .find()
      .limit(100)
      .toArray()

    //TODO:reorder as mongo could change positions after re-indexing
    console.log(factorySchema)
    return result
  }

  return runQuery(loadAllFactories)
}

const saveTree = async tree => {
  const saveAllFactories = async db => {
    const factories = db.collection("factories")

    return await factories.insertMany(tree)
  }

  return runQuery(saveAllFactories)
}

const saveNodes = async nodes => {
  const save = async db => {
    const factories = db.collection("factories")

    nodes.forEach(node => {
      updateMongoIds(node)
      validateFactorySchema(node)
      factories.findOneAndReplace(
        { _id: mongo.ObjectID(node._id) },
        { ...node },
        { upsert: true }
      )
    })
  }

  return runQuery(save)
}

const deleteNodes = async nodes => {
  const deleteFunc = async db => {
    const factories = db.collection("factories")

    nodes.forEach(node => {
      factories.findOneAndDelete({ _id: mongo.ObjectID(node._id) })
    })
  }

  return runQuery(deleteFunc)
}

module.exports = {
  loadTree,
  saveTree,
  saveNodes,
  deleteNodes
}
