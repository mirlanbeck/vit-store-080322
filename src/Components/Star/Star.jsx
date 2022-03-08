import { Button, Card, CardContent, CardMedia, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Button, TableHead } from '@mui/material';
// import { Link } from 'react-router-dom';
import { productContext } from '../../Contexts/ProductContext';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

export default function Star(item) {
    const {star, getStar, deleteProductInStar} = React.useContext(productContext)
    React.useEffect(() => {
      getStar()
    }, [])
 
    
  return (
    <div>
      <h1 style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>Favorites</h1>
       <Box sx={{ flexGrow: 1, margin: 4 }} >
        <Paper elevation={6} > 
        <Grid container spacing={3} justifyContent='center'> 
            {star.products ? (
            <>
              {star.products.map((elem) => (
                <Grid key={elem.item.id} item xs={12} sm={6} md={3}>
              <Card sx={{width: '100%'  }}  >
                <CardMedia 
                src={elem.item.image}
                  component="img"
                  width='100%'
                  height="300"
                />
                
                <CardContent>
                  <Typography gutterBottom variant="h5" >
                  {elem.item.title}
                  </Typography>
                </CardContent>
              
                <CardContent>
                    <Typography variant='body1'>
                        Price: {elem.item.price} KGS
                    </Typography>
                    <Typography variant='body2'>
                        Brand: {elem.item.brand}
                    </Typography>
                    <Typography variant='body2'>
                        Type: {elem.item.type}
                    </Typography>
                    <IconButton onClick={() => deleteProductInStar(elem.item.id)} color="warning">
                      <ClearIcon/> 
                    </IconButton>
                    <Link to="/">
                        <Button>Back to main page</Button>
                    </Link>
                </CardContent>
                {/* {icons} */}
                </Card>
                </Grid>
                ))}
              </>
        ) : (null)}
        </Grid>
        </Paper>
      </Box>
    </div>
    
   
  );
}
