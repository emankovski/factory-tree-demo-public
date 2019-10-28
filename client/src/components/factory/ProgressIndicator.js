import React from 'react'

import { Chip } from '@material/react-chips'
import LinearProgress from '@material/react-linear-progress'
//=========================== Styles =============================

const getWrapperStyle = () => ({
  textAlign: 'center',
  padding: '20px'
})

const getChipStyle = () => ({
  margin: '20px'
})

const getProgressStyle = () => ({
  display: 'block',
  margin: '0 auto'
})

//=========================== Component ==========================

export default () => {
  return (
    <section style={getWrapperStyle()}>
      <Chip style={getChipStyle()} label="Syncing to Cloud..."></Chip>
      <LinearProgress indeterminate style={getProgressStyle()} />
    </section>
  )
}
