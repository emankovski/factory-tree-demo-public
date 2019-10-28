import React, { useContext, Fragment } from 'react'

import FactoryView from './FactoryView'
import ProgressIndicator from './ProgressIndicator'

import AddFactory from './AddFactoryButton'

import AppContext from '../context/AppContext'

//=========================== Styles =============================

const getContainerStyle = () => ({
  paddingBottom: 20
})

//=========================== Component ==========================

const renderChildren = (root, tree) => {
  let children = []

  //All except of root
  tree.forEach(element => {
    if (element === root) {
      return
    }

    children.push(
      <FactoryView
        key={element._id}
        id={element._id}
        isRoot={false}
        dataElement={element}
      />
    )
  })

  return children
}

export default () => {
  const [tree, contextActions] = useContext(AppContext)

  if (!tree.length) {
    return <ProgressIndicator />
  }

  const root = tree.find(c => c.parentId === null)
  const children = renderChildren(root, tree)

  const addFactory = value => {
    contextActions.addFactory(value, tree.slice(-1).pop())
  }

  return (
    <Fragment>
      <section style={getContainerStyle()}>
        <FactoryView
          key={root._id}
          id={root._id}
          isRoot={true}
          dataElement={root}
        />
        {children}
        <AddFactory {...{ addFactory }} />
      </section>
    </Fragment>
  )
}
