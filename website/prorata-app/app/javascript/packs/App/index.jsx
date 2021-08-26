import React, { useState } from 'react'
import { Grid, Typography, Card, Box, IconButton, Button, TextField, CircularProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import axios from 'axios'
import { InputsGroup } from './InputsGroup'
import { Results } from './Results';

const defaultInputsState = {
  index: 0,
  name: '',
  amount: undefined,
  averageAmount: undefined
}

const App = () => {
  const [inputsState, setInputsState] = useState([defaultInputsState])
  const [results, setResults] = useState([])
  const [allocationAmount, setAllocationAmount] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const updateInputGroup = (state) => {
    const filteredInputs = inputsState.filter((group) => group.index !== state.index)
    setInputsState([...filteredInputs, state])
  }

  const addNewInputGroup = () => {
    const index = Math.max(...inputsState.map((ig) => ig.index)) + 1
    setInputsState([...inputsState, { ...defaultInputsState, index }])
  }

  const reconcileInvestors = async () => {
    setLoading(true)
    await axios.post('/allocations/reconcile', {
      allocation_amount: allocationAmount,
      investor_data: inputsState
    }).then((res) => {
      setLoading(false)
      console.log('res', res)
      setResults(res.data)
    }).catch((err) => {
      console.log('err', err)
    })
  }

  const orderedInputGroups = inputsState.sort((a, b) => a.index - b.index)

  return (
    <Grid container justify='center' alignItems='center' spacing={3}>
      <Grid item xs={6}>
        <Typography variant='h4' gutterBottom>Investors ({inputsState?.length})</Typography>
        <Card className={clsx(classes.card, classes.cardBackground)}>
          <Box mt={6} mx={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box>
                  <Typography variant='h6' gutterBottom>Total Available Allocation</Typography>
                  <TextField
                    placeholder='Allocation'
                    name='amount'
                    type='number'
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={(e) => setAllocationAmount(e.target.value)}
                    InputProps={{
                      startAdornment:
                        <AttachMoneyIcon />
                    }}
                  />
                </Box>
              </Grid>
              <Box mt={3} mb={-1} ml={1.5}>
                <Typography variant='h6'>Investor Amounts</Typography>
              </Box>
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
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={reconcileInvestors}
                      className={classes.submitButton}
                    >{loading ? <CircularProgress color='primary' /> : 'Submit'}</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Grid item={3} xs={3}>
        <Typography variant='h4' gutterBottom>Results</Typography>
        <Card className={clsx(classes.card, classes.cardBackgroundLight)}>
          <Results results={results} />
        </Card>
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
    overflowY: 'scroll',
    border: '1px solid silver'
  },
  cardBackgroundLight: {
    backgroundColor: '#f5f5f5'
  },
  cardBackground: {
    backgroundColor: '#e0e0e0'
  },
  submitButton: {
    midWidth: '120px',
    width: '120px'
  }
}))

export default App