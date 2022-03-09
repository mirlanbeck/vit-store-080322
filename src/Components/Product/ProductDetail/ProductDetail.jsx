import { Button, Grid, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productContext } from '../../../Contexts/ProductContext';
import CommentBox from '../../Home/Content/Comments/Comment';

const ProductDetail = () => {
    const {id} = useParams()
    const {detail, products, comments, getComments, getDetail, useAuth} = useContext(productContext)

    const currentUser = useAuth()


    useEffect(() => {
        getDetail(id)
        // getComments(id)
    }, [id])


    return (
        <Paper elevation={0} variant='contained'>
            <Typography variant='h4' style={{textAlign: 'center', margin: "10px"}}>About product</Typography>
            {
                detail ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div >
                            <img src={detail.image} width={250} />
                        </div>
                        <div
                            style={{
                                width: '500px', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'flex-start',
                                 justifyContent: 'center'}}
                        >
                            <Typography variant='body1' style={{textAlign: 'center', margin: "5px"}}>{detail.title}</Typography>
                            <Typography variant='body1' style={{textAlign: 'center', margin: "5px"}}>Price: {detail.price} soms</Typography>
                            <Typography variant='body1' style={{textAlign: 'center', margin: "5px"}}>Category: {detail.type}</Typography>
                            <Typography style={{margin: "5px"}}>{detail.shortDesc}</Typography>
                            <Typography style={{margin: "5px"}}>{detail.detailedDesc}</Typography>
                        </div>
                    </div>
                ) : (<h1>Please wait while loading...</h1>)
            }
           {/* <Typography>
                        {
                            currentUser ? (
                                <Grid item xs={1} sm={2} md={4}  >
                                        <CommentCard />    
                                </Grid>
                            ) : null
                        } */}

                        {/* {
                            products ? (
                                products.map((item, index) => (
                                    <Grid item xs={1} sm={2} md={4}  key={index}>
                                        <CommentCard item={item}  key={index}/>    
                                    </Grid>
                                ))
                            ) : (<h3>Please wait while loading...</h3>)
                        } */}
           {/* </Typography> */}
            {/* <Typography  style={{textAlign: 'center'}}>      
                <Link to="/payment" style={{textDecoration: "none"}}>
                    <Button variant="contained" color="success" style={{margin: "10px"}}>Buy</Button>     
                </Link>            
            </Typography> */}
            <div style={{display: "flex", justifyContent: "center"}}>
                <CommentBox />
            </div>
            <Typography  style={{textAlign: 'center'}}>      
                <Link to="/?_limit=3&_page=1" style={{textDecoration: "none"}}>
                    <Button variant="contained" color="success" style={{margin: "10px"}}>Back to main page</Button>     
                </Link>            
            </Typography>
        </Paper>
    );
};

export default ProductDetail;