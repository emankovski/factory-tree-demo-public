import React, { useContext, useState, useEffect } from 'react'

import { Snackbar } from '@material/react-snackbar'

import AppContext from '../context/AppContext'
import { cloudMessages } from '../hoc/CloudSyncManager'

export default () => {
  //We could just pass handler to the component but lets make
  //this component universal by using context

  const [, , onCloudMessage] = useContext(AppContext)

  const [error, setError] = useState(null)
  useEffect(() => {
    onCloudMessage(cloudMessages.serverError, payload => setError(payload))
    onCloudMessage(cloudMessages.connectError, () =>
      setError('Looks like server is down. Trying to reconnect...')
    )
  }, [onCloudMessage])

  if (!error) {
    return null
  }

  return (
    <Snackbar
      closeOnEscape={true}
      stacked={true}
      message={error}
      actionText="dismiss"
      onClose={() => setError(null)}
    />
  )
}
