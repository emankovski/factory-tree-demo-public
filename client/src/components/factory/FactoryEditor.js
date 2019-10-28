import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Chip } from '@material/react-chips'
import TextField, { Input } from '@material/react-text-field'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from '@material/react-dialog'

//=========================== Styles =============================

const getTextFieldStyle = last => ({
  width: '100%',
  marginBottom: last ? 'inherit' : '20px'
})

const getErrorStyle = () => ({
  marginTop: '20px',
  border: '1px solid red'
})

//=========================== Component ==========================

const renderTextField = (label, value, handler, isLast) => {
  return (
    <TextField label={label} style={getTextFieldStyle(isLast)}>
      <Input
        value={value}
        onChange={e => {
          handler(e.currentTarget.value)
        }}
      />
    </TextField>
  )
}

const renderEditorForm = (text, setText, min, setMin, max, setMax) => {
  return (
    <Fragment>
      {renderTextField('Factory Name', text, setText, false)}
      {renderTextField('Min Value', min, setMin, false)}
      {renderTextField('Max Value', max, setMax, true)}
    </Fragment>
  )
}

const validateNumberRange = (min, max, value) => {
  return (
    value &&
    !isNaN(value) &&
    parseInt(value) > parseInt(min) &&
    parseInt(value) <= parseInt(max)
  )
}
const validateForm = (text, min, max, setValid, setValidationError) => {
  //Basic validation

  const textError =
    !text || text.length > 128 ? 'Name range is 1 to 128 chars' : null
  const minError = !validateNumberRange(0, 512, min)
    ? 'Min range is 1 to 512'
    : null
  const maxError = !validateNumberRange(0, 1024, max)
    ? 'Max range is 1 to 1024'
    : null

  let minMaxError = null
  if (!isNaN(min) && !isNaN(max)) {
    minMaxError =
      parseInt(max) <= parseInt(min) ? 'Max has to be greater than Min' : null
  }

  //Set error message
  setValidationError(textError || minError || maxError || minMaxError)

  const isValid = !!!(textError || minError || maxError || minMaxError)
  setValid(isValid)
}

const renderFormValidationError = validationError => {
  return <Chip disabled label={validationError} style={getErrorStyle()} />
}

const FactoryEditor = ({ save, cancel, isAddingNew, editedItem }) => {
  const [isValid, setValid] = useState(false)
  const [validationError, setValidationError] = useState()
  const [text, setText] = useState(editedItem ? editedItem.name : '')
  const [min, setMin] = useState(editedItem ? editedItem.childrenLowerBound : 1)
  const [max, setMax] = useState(
    editedItem ? editedItem.childrenUpperBound : 500
  )

  useEffect(() => {
    validateForm(text, min, max, setValid, setValidationError)
  }, [text, min, max])

  const editorForm = renderEditorForm(text, setText, min, setMin, max, setMax)
  const formValidationError = validationError
    ? renderFormValidationError(validationError)
    : null

  const titleText = isAddingNew ? 'Add Factory' : 'Edit Factory'

  return (
    <div>
      <Dialog
        open={true}
        onClose={action =>
          action === 'save'
            ? save({ text, min: parseInt(min), max: parseInt(max) })
            : cancel()
        }
      >
        <DialogTitle>{titleText}</DialogTitle>
        <DialogContent>
          {editorForm}
          {formValidationError}
        </DialogContent>
        <DialogFooter>
          <DialogButton disabled={!isValid} action="save">
            Save
          </DialogButton>
          <DialogButton action="dismiss">Cancel</DialogButton>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

FactoryEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  isAddingNew: PropTypes.bool.isRequired,
  editedItem: PropTypes.object
}

export default FactoryEditor
