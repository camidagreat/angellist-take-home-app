import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import NumberFormat from 'react-number-format';

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
                    <Typography>
                      <NumberFormat
                        value={result.allocation}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'} />
                    </Typography>
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