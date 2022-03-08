import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {'Copyright © '}
      <Link color="inherit" href="https://kg.iherb.com/">
      Vitamns and Supplements
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '1vh',
      }}
    >
      <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto', 
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
        style={{background: "green"}}
      >
        <Container style={{textAlign: "center", color: "whitesmoke"}} maxWidth="sm">
          <Typography variant="body2">
              <h5> Vitamins, Supplements and Bio Products <br/> for your Well-being!</h5>
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}