import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export const InputsGroup = ({ state, updateInputGroup }) => {

  const updateInput = (e) => {
    const { name, value } = e.target
    const newState = { ...state, [name]: value }
    updateInputGroup(newState)
  }

  return (
    <Grid item xs={12}>
      <Grid container justify='space-around' spacing={1}>
        <Grid item xs={4}>
          <TextField
            placeholder='Name'
            name='name'
            variant='outlined'
            size='small'
            fullWidth
            onChange={(e) => updateInput(e)}
            InputProps={{
              startAdornment:
                <PersonIcon />
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            placeholder='Requested amount'
            name='amount'
            type='number'
            variant='outlined'
            size='small'
            fullWidth
            onChange={(e) => updateInput(e)}
            InputProps={{
              startAdornment:
                <AttachMoneyIcon />
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            placeholder='Average amount'
            name='averageAmount'
            type='number'
            variant='outlined'
            size='small'
            fullWidth
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