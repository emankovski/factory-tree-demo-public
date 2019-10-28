const processRemoved = (currentTree, removed) => {
  let result = []

  currentTree.forEach(c => {
    if (!removed.find(d => d._id === c._id)) {
      result.push(c)
    }
  })

  return result
}

const processUpdated = (currentTree, updated) => {
  let result = []

  currentTree.forEach(c => {
    const found = updated.find(d => d._id === c._id)

    result.push(found || c)
  })

  return result
}

export default (currentTree, updates) => {
  console.log('Update tree structure...')
  if (!currentTree || !currentTree.length) {
    return []
  }

  let intermediateResultSet = [...currentTree]

  let afterCleaup = []
  if (updates.removed && updates.removed.length) {
    afterCleaup = processRemoved(intermediateResultSet, updates.removed)
  }

  if (afterCleaup.length) {
    intermediateResultSet = afterCleaup
  }

  if (updates.updated && updates.updated.length) {
    intermediateResultSet = processUpdated(
      intermediateResultSet,
      updates.updated
    )
  }

  if (updates.added && updates.added.length) {
    updates.added.forEach(c => intermediateResultSet.push(c))
  }

  return intermediateResultSet
}
