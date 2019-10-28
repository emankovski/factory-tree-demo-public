import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import Fab from '@material/react-fab'
import MaterialIcon from '@material/react-material-icon'

import FactoryEditor from './FactoryEditor'

export const AddFactoryButton = ({ addFactory }) => {
  const [isEditing, setIsEditing] = useState(false)

  const editorView = isEditing ? (
    <FactoryEditor
      isAddingNew={true}
      cancel={() => setIsEditing(false)}
      save={value => {
        setIsEditing(false)
        addFactory(value)
      }}
    />
  ) : null

  return (
    <Fragment>
      <Fab
        style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1 }}
        icon={<MaterialIcon icon="add" />}
        onClick={() => setIsEditing(true)}
      ></Fab>
      {editorView}
    </Fragment>
  )
}

AddFactoryButton.propTypes = {
  addFactory: PropTypes.func.isRequired
}

export default AddFactoryButton
