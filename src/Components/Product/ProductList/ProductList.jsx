import { Box, Container, Grid, Pagination, Stack } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { productContext } from '../../../Contexts/ProductContext';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = () => {
    const { products, getProducts, paginatedPages } = useContext(productContext)
    const search = new URLSearchParams(window.location.search)

    const [searchParams, setSearchParams] = useSearchParams()
    const [limit, setLimit] = useState(3)
    const [page, setPage] = useState(searchParams.get("_page") ? searchParams.get("_page") : 1)
    const navigate = useNavigate()

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        setSearchParams({
            "_limit": limit,
            "_page": page
        })
    }, [limit, page])

    const handlePage = (e, pageVal) => {
        let newPath = `${window.location.pathname}?${search.toString}`
        navigate(newPath)
        setSearchParams({"_page": pageVal, "_limit": limit})
        getProducts()
        setPage(pageVal)
        navigate("/")
    } 

    return (
        <Box sx={{flexGrow: 1, margin: 4}}>
            <Container maxWidth="xl" maxHeight="auto">
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://s3.images-iherb.com/cms/banners/Mar-DD_cognitive_banners_0304_002ru-ru.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        {/* <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://s3.images-iherb.com/cms/banners/wmdybanner0302_001ru-ru.jpg"
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                        {/* <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://s3.images-iherb.com/cms/banners/vitdbanner0302_002ru-ru.jpg"
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        {/* <h5>Third slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                
                <Grid style={{marginTop: "10px"}} container spacing={{xs: 2, md: 3}} columns={{xs:1, sm: 6, md: 12}}
                    >
                        {
                            products ? (
                                products.map((item, index) => (
                                    <Grid item xs={1} sm={2} md={4} key={index}>
                                        <ProductCard item={item} key={index} />    
                                    </Grid>
                                ))
                            ) : (<h3>Please wait while loading...</h3>)
                        }
                </Grid>
                <Stack spacing={2} marginTop="50px">
                        <Pagination
                            count = {paginatedPages}
                            onChange = {handlePage}
                            page = {+page}
                            style={{display: "flex", justifyContent: "center"}}
                        />
                </Stack>
            </Container>
        </Box>
    );
};

export default ProductList;