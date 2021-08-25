import React, { useState } from 'react'
import { Grid, Typography, Card, Box, IconButton, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import axios from 'axios'
import { InputsGroup } from './InputsGroup'

const defaultInputsState = {
  index: 0,
  name: '',
  amount: undefined,
  averageAmount: undefined
}

const App = () => {
  const [inputsState, setInputsState] = useState([defaultInputsState])
  const classes = useStyles()

  const updateInputGroup = (state) => {
    const filteredInputs = inputsState.filter((group) => group.index !== state.index)
    setInputsState([...filteredInputs, state])
  }

  const addNewInputGroup = () => {
    const index = Math.max(...inputsState.map((ig) => ig.index)) + 1
    setInputsState([...inputsState, { ...defaultInputsState, index }])
  }

  const orderedInputGroups = inputsState.sort((a, b) => a.index - b.index)

  const reconcileInvestors = async () => {
    await axios.post('/allocations/reconcile', {
      investor_data: inputsState
    }).then((res) => {
      console.log('res', res)
    }).catch((err) => {
      console.log('err', err)
    })
  }

  return (
    <Grid container justify='center' alignItems='center' spacing={3}>
      <Grid item xs={6}>
        <Typography variant='h4' gutterBottom>Investors ({inputsState?.length})</Typography>
        <Card className={clsx(classes.card, classes.cardBackground)}>
          <Box mt={6} mx={2}>
            <Grid container spacing={3}>
              {orderedInputGroups.map((inputGroup) => {
                return (
                  <InputsGroup key={inputGroup.index} state={inputGroup} updateInputGroup={updateInputGroup} />
                )
              })}
              <Grid item xs={12}>
                <Grid container spacing={2} justify='space-between' alignItems='center'>
                  <Grid item>
                    <IconButton color='primary' onClick={addNewInputGroup}>
                      <AddIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Button variant='outlined' color='primary' onClick={reconcileInvestors}>Submit</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Grid item={3} xs={3}>
        <Typography variant='h4' gutterBottom>Results</Typography>
        <Card className={clsx(classes.card, classes.cardBackgroundLight)}></Card>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  app: {
    height: '100vh',
    width: '100vw'
  },
  card: {
    height: '50vh',
    width: '100%',
    overflowY: 'scroll'
  },
  cardBackgroundLight: {
    backgroundColor: '#f5f5f5'
  },
  cardBackground: {
    backgroundColor: '#e0e0e0'
  }
}))

export default App