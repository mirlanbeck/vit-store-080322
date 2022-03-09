import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { productContext } from '../../Contexts/ProductContext';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { calcTotalPrice } from '../../Helpers/CalcPrice';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
})); 

export default function Cart () {
    const { cart, getCart, changeProductCount, deleteProductInCart} = React.useContext(productContext)
    React.useEffect(() => {
        console.log('hello in useEff')
        getCart()
    }, [])
    console.log(cart)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell align="right">Title</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="center">Count(g)</StyledTableCell>
                        <StyledTableCell align="center">SubPrice(g)</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.products ? (
                        <>
                            {cart.products.map((elem) => (
                                <StyledTableRow key={elem.item.id}>
                                    <StyledTableCell component="th" scope="row">
                                        <img width="60"src={elem.item.image} />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {elem.item.title}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {elem.item.price}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <input
                                            type="number"
                                            value={elem.count}
                                            onChange={(e) => changeProductCount(e.target.value, elem.item.id)}
                                        />                                           
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        {elem.subPrice}    
                                    </StyledTableCell>
                                    <StyledTableCell onClick={() => deleteProductInCart(elem.item.id)}>
                                        <DeleteIcon />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </>
                    ): (null) }
                    <TableRow>
                        <TableCell rowSpan={3}/>
                        <TableCell rowSpan={2}>
                            <Typography variant='h4'>Total:</Typography>
                        </TableCell>
                        {
                            cart.products ? (
                                <TableCell align='right'>
                                    <Typography variant="h5">{calcTotalPrice(cart.products)}</Typography>
                                </TableCell>
                            ) : (null)
                        }
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={3} align="right">
                            <Link to="/payment">
                                <Button className='btn-buy' variant='contained' color="success">Buy</Button>
                            </Link>
                            <Link to="/?_limit=3&_page=1">
                                <Button variant="contained" color="success">Back to main page</Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};