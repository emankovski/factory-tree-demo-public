import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { CardActions } from '@material/react-card'
import { Body2 } from '@material/react-typography'
//=========================== Styles =============================

const getTitleStyle = () => ({
  borderTop: '1px solid rgba(0,0,0,.1)'
})

//=========================== Component ==========================

const FactoryTitle = ({ isRoot, dataElement }) => {
  const title = !isRoot ? (
    <CardActions style={getTitleStyle()}>
      <Body2>{dataElement.name}</Body2>
    </CardActions>
  ) : null

  return <Fragment>{title}</Fragment>
}

FactoryTitle.propTypes = {
  isRoot: PropTypes.bool.isRequired,
  dataElement: PropTypes.object.isRequired
}

export default FactoryTitle
