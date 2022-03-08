import { Paper, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productContext } from '../../../Contexts/ProductContext';

const ProductDetail = () => {
    const {id} = useParams()
    const {detail, getDetail} = useContext(productContext)

    useEffect(() => {
        getDetail(id)
    }, [id])
    return (
        <Paper elevation={0} variant='contained'>
            <Typography variant='h4' style={{textAlign: 'center'}}>About product</Typography>
            {
                detail ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div>
                            <img src={detail.image} width={300} />
                        </div>
                        <div
                            style={{
                                width: '450px', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'flex-start',
                                 justifyContent: 'center'}}
                        >
                            <Typography variant='h5'>{detail.title}</Typography>
                            <Typography variant='h6'>Price: {detail.price} soms</Typography>
                            <Typography variant='h6'>Category: {detail.type}</Typography>
                            <Typography >{detail.shortDesc}</Typography>
                            <Typography >{detail.detailedDesc}</Typography>
                        </div>
                    </div>
                ) : (<h1>Please wait while loading...</h1>)
            }
        </Paper>
    );
};

export default ProductDetail;