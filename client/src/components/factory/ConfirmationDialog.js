import React from 'react'
import PropTypes from 'prop-types'

import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from '@material/react-dialog'

//=========================== Component ==========================

const ConfirmationDialog = ({ confirmedAction, cancelAction, text }) => {
  return (
    <div>
      <Dialog
        open={true}
        onClose={action =>
          action === 'yes' ? confirmedAction() : cancelAction()
        }
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>{text}</DialogContent>
        <DialogFooter>
          <DialogButton action="yes">Yes</DialogButton>
          <DialogButton action="dismiss">No</DialogButton>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

ConfirmationDialog.propTypes = {
  confirmedAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default ConfirmationDialog
