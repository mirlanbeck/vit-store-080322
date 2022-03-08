import { Grid } from '@mui/material';
import React from 'react';
import Content from './Content/Content';
import StickyFooter from './Content/Footer';

const Home = () => {
    return (
        <div>
            <Grid spacing-md={3} spacing-sm={3}>
                <Content />
            </Grid>
            <StickyFooter/>
        </div>
        
    );
};

export default Home;