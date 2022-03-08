import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import ProductList from '../../Product/ProductList/ProductList';
import FilterItem from './FilterItems';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Content = () => {
    return (
            <Container>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Grid>
                        <ProductList />
                    </Grid>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: "50px"}}>
                    <FilterItem />
                </div>
            </Container>
    );
};

export default Content;