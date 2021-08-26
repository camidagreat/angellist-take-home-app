import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'

export const Results = ({ results }) => {
  if (results.length > 0) {
    return (
      <Box mt={5} mx={2}>
        <Grid container>
          {results.map((result) => {
            return (
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography>{result.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>${result.allocation}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    )
  } else {
    return (
      <Box mt={5} mx={2}>
        <Typography>No results</Typography>
      </Box>
    )
  }
}