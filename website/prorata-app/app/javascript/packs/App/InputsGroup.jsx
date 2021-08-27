import React from 'react'
import { Grid, TextField, IconButton } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const InputsGroup = ({ state, updateInputGroup, removeGroup }) => {

  const updateInput = (e) => {
    const { name, value } = e.target
    const newState = { ...state, [name]: value }
    updateInputGroup(newState)
  }

  return (
    <Grid item xs={12}>
      <Grid container justify='space-around' spacing={1}>
        <Grid item xs={1}>
          {state.index !== 0 && (
            <IconButton color='primary' onClick={removeGroup}>
              <HighlightOffIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={4}>
          <TextField
            placeholder='Name'
            name='name'
            variant='outlined'
            size='small'
            onChange={(e) => updateInput(e)}
            InputProps={{
              startAdornment:
                <PersonIcon />
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            placeholder='Requested'
            name='amount'
            type='number'
            variant='outlined'
            size='small'
            onChange={(e) => updateInput(e)}
            InputProps={{
              startAdornment:
                <AttachMoneyIcon />
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            placeholder='Average'
            name='averageAmount'
            type='number'
            variant='outlined'
            size='small'
            onChange={(e) => updateInput(e)}
            InputProps={{
              startAdornment:
                <AttachMoneyIcon />
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}