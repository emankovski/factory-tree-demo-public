import React from 'react'
import PropTypes from 'prop-types'

import { Headline5 } from '@material/react-typography'

//=========================== Styles =============================

const getChildrenWrapperStyle = () => ({
  color: 'rgba(0,0,0,.54)',
  margin: 0
})

const getCardTitleStyle = isRoot => ({
  padding: '20px',
  color: '#fff',
  background: isRoot
    ? 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #46B6AC'
    : 'none',
  minHeight: isRoot ? '150px' : 'inherit'
})

//=========================== Component ==========================

const renderChildren = dataElement => {
  //Simple structure for now.
  const children = dataElement.childNumbers.map((c, i) => {
    return <div key={i}>{c}</div>
  })
  return <div style={getChildrenWrapperStyle()}>{children}</div>
}

const FactoryChildrenView = ({ isRoot, dataElement }) => {
  const cardTitleContent = isRoot ? (
    <Headline5>{dataElement.name}</Headline5>
  ) : (
    renderChildren(dataElement)
  )
  //
  return <section style={getCardTitleStyle(isRoot)}>{cardTitleContent}</section>
}

FactoryChildrenView.propTypes = {
  isRoot: PropTypes.bool.isRequired,
  dataElement: PropTypes.object.isRequired
}

export default FactoryChildrenView
