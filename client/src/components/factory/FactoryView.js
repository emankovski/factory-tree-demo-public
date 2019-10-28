import React from 'react'
import PropTypes from 'prop-types'

import Card, { CardPrimaryContent } from '@material/react-card'

import ChildrenView from './FactoryChildrenView'
import Title from './FactoryTitle'
import ActionsView from './FactoryActions'

//=========================== Styles =============================
const getCardStyle = isRoot => ({
  width: isRoot ? '100%' : '280px',
  margin: 'auto',
  zIndex: 1,
  overflow: 'visible'
})

const getCardWrapperStyle = isRoot => ({
  padding: isRoot ? 0 : '20px',
  margin: '0 auto',
  border: '0px solid rgba(0,0,0,.1)',
  borderLeftWidth: isRoot ? 0 : '1px',
  paddingBottom: 0,
  display: isRoot ? 'inherit' : 'table'
})

const getCardTreeHorizontalConnectorStyle = isRoot => ({
  display: isRoot ? 'none' : 'inherit',
  border: '0px solid rgba(0,0,0,.1)',
  width: '20px',
  marginLeft: '-20px',
  borderBottomWidth: '1px',
  transform: 'translateY(40px)'
})

//=========================== Component ==========================

const FactoryView = ({ id, isRoot, dataElement }) => {
  return (
    <section style={getCardWrapperStyle(isRoot)}>
      <div style={getCardTreeHorizontalConnectorStyle(isRoot)}></div>
      <Card outlined style={getCardStyle(isRoot)}>
        <CardPrimaryContent disabled>
          <ChildrenView {...{ isRoot, dataElement }} />
        </CardPrimaryContent>

        <Title {...{ isRoot, dataElement }} />
        <ActionsView {...{ isRoot, dataElement, id }} />
      </Card>
    </section>
  )
}

FactoryView.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  dataElement: PropTypes.object.isRequired
}

export default FactoryView
