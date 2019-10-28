import React, { Fragment, useContext, useState } from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material/react-icon-button'
import MaterialIcon from '@material/react-material-icon'
import { CardActionButtons } from '@material/react-card'
import { Chip } from '@material/react-chips'
import Menu, {
  MenuList,
  MenuListItem,
  MenuListItemText
} from '@material/react-menu'

import AppContext from '../context/AppContext'

import FactoryEditor from './FactoryEditor'
import ConfirmationDialog from './ConfirmationDialog'
//=========================== Styles =============================

const getFactoryActionsStyle = () => ({
  padding: '20px',
  position: 'relative',
  borderTop: '1px solid rgba(0,0,0,.1)'
})

const getMenuIconStyle = () => ({
  position: 'absolute',
  right: '10px'
})

//=========================== Component ==========================

//Module level actions
let moduleActions = null

const renderBoundaryChip = dataElement => {
  const label = `${dataElement.childrenLowerBound}-${dataElement.childrenUpperBound}`
  return <Chip disabled label={label} />
}

const handleSelection = index => {
  setTimeout(() => {
    switch (index) {
      case 0:
        moduleActions.editFactory()
        return
      case 1:
        moduleActions.deleteFactory()
        return
      case 2:
        moduleActions.randomize()
        return
      default:
    }
  }, 50)
}

const renderMenu = (
  menuKey,
  menuCoordinates,
  isMenuVisible,
  setMenuVisible
) => {
  return (
    <Menu
      open={isMenuVisible}
      onClose={() => setMenuVisible(false)}
      coordinates={menuCoordinates}
      onSelected={handleSelection}
    >
      <MenuList key={menuKey}>
        <MenuListItem key={`${menuKey}1`}>
          <MenuListItemText primaryText="Edit" />
        </MenuListItem>
        <MenuListItem key={`${menuKey}2`}>
          <MenuListItemText primaryText="Delete" />
        </MenuListItem>
        <MenuListItem key={`${menuKey}3`}>
          <MenuListItemText primaryText="Randomize" />
        </MenuListItem>
      </MenuList>
    </Menu>
  )
}

const renderFactoryActions = (
  menuCoordinates,
  isMenuVisible,
  setMenuVisible,
  setMenuCoordinates,
  isRoot,
  dataElement,
  menuKey
) => {
  if (isRoot) {
    return null
  }

  return (
    <Fragment>
      <CardActionButtons style={getFactoryActionsStyle()}>
        {renderBoundaryChip(dataElement)}
        <IconButton
          id={menuKey}
          style={getMenuIconStyle()}
          onClick={e => {
            setMenuCoordinates({ x: e.clientX, y: e.clientY })
            setMenuVisible(true)
          }}
        >
          <MaterialIcon icon="more_vert" />
        </IconButton>
        {renderMenu(menuKey, menuCoordinates, isMenuVisible, setMenuVisible)}
      </CardActionButtons>
    </Fragment>
  )
}

const FactoryActions = ({ id, isRoot, dataElement }) => {
  const [isMenuVisible, setMenuVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeletePending, setIsDeletePending] = useState(false)
  const [menuCoordinates, setMenuCoordinates] = useState({ x: 0, y: 0 })
  const [, contextActions] = useContext(AppContext)

  //Adjusting context's actions for each factory as we dont pass id further
  //Note that delete action wont causes delete right away becuase
  //we ask user for confirmation
  const actions = {
    editFactory: () => {
      setIsEditing(true)
    },
    deleteFactory: () => setIsDeletePending(true),
    randomize: () => contextActions.randomize(dataElement)
  }
  moduleActions = actions

  //We need unique menu key so popup menu would show correctly
  const menuKey = `card-menu-lower-right_${id}`
  const actionsView = renderFactoryActions(
    menuCoordinates,
    isMenuVisible,
    setMenuVisible,
    setMenuCoordinates,
    isRoot,
    dataElement,
    menuKey
  )

  const editorView = isEditing ? (
    <FactoryEditor
      isAddingNew={false}
      editedItem={dataElement}
      cancel={() => setIsEditing(false)}
      save={value => {
        setIsEditing(false)
        //We enrich existing object with new fields before sending to server
        contextActions.editFactory({
          ...dataElement,
          name: value.text,
          childrenLowerBound: value.min,
          childrenUpperBound: value.max
        })
      }}
    />
  ) : null

  const confirmationDeleteAction = () => {
    setIsDeletePending(false)
    contextActions.deleteFactory(id)
  }

  const confirmationDialog = isDeletePending ? (
    <ConfirmationDialog
      confirmedAction={confirmationDeleteAction}
      cancelAction={() => setIsDeletePending(false)}
      text="Would you like to delete this factory?"
    />
  ) : null
  return (
    <Fragment>
      {actionsView}
      {editorView}
      {confirmationDialog}
    </Fragment>
  )
}

FactoryActions.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  dataElement: PropTypes.object.isRequired
}

export default FactoryActions
