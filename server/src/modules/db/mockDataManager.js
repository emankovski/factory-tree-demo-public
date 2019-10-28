const loremIpsum = require("lorem-ipsum").loremIpsum
const mongo = require("mongodb")

const maxChildNodes = 15

const generateRoot = () => {
  const rootObject = {
    _id: mongo.ObjectID(),
    name: "Root Factory",
    childrenLowerBound: 0,
    childrenUpperBound: 0,
    childNumbers: [],
    parentId: null,
    prev: null,
    next: null
  }

  return rootObject
}

const generateLeafChildren = leafObject => {
  const elementsCount = Math.floor(Math.random() * maxChildNodes) + 1
  //Aliases
  const { childrenLowerBound: min, childrenUpperBound: max } = leafObject

  let tree = []
  for (let index = 0; index < elementsCount; index++) {
    const random = Math.floor(Math.random() * (+max - +min)) + +min
    tree.push(random)
  }

  leafObject.childNumbers = tree
}

const generateLeaf = (root, prev) => {
  const childrenLowerBound = Math.floor(Math.random() * 256) + 1

  const leafObject = {
    _id: mongo.ObjectID(),
    parentId: root._id,
    name: loremIpsum(),
    childrenLowerBound,
    childrenUpperBound: Math.floor(Math.random() * 256) + childrenLowerBound,
    prev: prev ? prev._id : null,
    next: null
  }

  generateLeafChildren(leafObject)

  return leafObject
}

const loadTree = () => {
  //Generate doubly linked list
  const elementsCount = Math.floor(Math.random() * maxChildNodes) + 2

  let tree = []
  for (let index = 0; index < elementsCount; index++) {
    //
    if (!index) {
      tree.push(generateRoot())
      continue
    }
    //Passing root, and prev element (or null)
    let prev = index > 1 ? tree[index - 1] : null
    const leaf = generateLeaf(tree[0], prev)
    tree.push(leaf)

    //Update prev's next property
    if (prev) {
      prev.next = leaf._id
    }
  }

  return tree
}

module.exports = {
  loadTree,
  generateLeafChildren
}
