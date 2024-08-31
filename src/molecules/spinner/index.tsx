'use client'


import CircularProgress from '@mui/material/CircularProgress'
import {BoxProps} from "@mui/material";
import Box from "@mui/material/Box";



const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook


  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',

      }}
    >

      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
