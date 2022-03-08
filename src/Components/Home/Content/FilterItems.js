import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { productContext } from '../../../Contexts/ProductContext';
import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Slider, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const FilterItem = () => {
    const search = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const { getProducts } = useContext(productContext) 
    const [ type, setType ] = useState(search.get("type") || "")
    const [ brand, setBrand ] = useState(search.get("brand") || "")
    const [ price, setPrice ] = useState(search.get("price_lte") || "")
    
    const filterProducts = (key, value) => {
        search.set(key, value)
        let newPath = `${window.location.pathname}?${search.toString()}`
        navigate(newPath)
        setType(search.get("type") || " ")
        setBrand(search.get("brand") || " ")
        setPrice(search.get("price_lte" || ""))
        getProducts()
        
    }
    
    const handleChange = (e, value) => {
        search.set(e, value)
        let newPath = `${window.location.pathname}?${search.toString()}`
        navigate(newPath)
        setType (search.get("type")|| "")
        setBrand(search.get("brand") || " ")
        getProducts()    
    }
    
    const resetFilter = () => {
        navigate("/")
        setType("")
        setBrand("")
        setPrice("")
        getProducts("")
    }
    
    return (
        <Container style={{display: "flex", justifyContent: "center", justifyWrap: "wrap", margin: "20px"}}>
            <Grid spacing={1} xs={6} md={3}>
                <Accordion style={{marginRight: "40px"}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{
                            backgroundColor: "gainsboro",
                            maxWidth: "400px auto",
                            color: "black",
                            textAlign: "center"
                        }}
                    >
                        <Typography>Filter by items</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* <Box sx={{ flexGrow: 1}} style={{marginLeft: "20px", marginTop: "20px"}}> */}
                            <Grid container spacing={1}>
                                {/* <Grid item md={2}> */}
                                    <Paper elevation={2} style={{width:'200px', padding: '10px', marginTop: '10px'}}>
                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label='gender' name="gender1" value={type} 
                                                onChange={(e) => handleChange("type", e.target.value)}>
                                                <FormControlLabel 
                                                    value="Vitamins" 
                                                    control={<Radio/>}
                                                    label="Vitamins"
                                                />
                                                <FormControlLabel 
                                                    value="Supplements" 
                                                    control={<Radio/>}
                                                    label="Supplements"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                        <Grid>
                                            <Slider 
                                                onChange={(e) => filterProducts("price_lte", e.target.value)}
                                                valueLabelDisplay="auto"
                                                max={20000}
                                                step={100}
                                            />
                                        </Grid>
                                        <Button onClick={resetFilter} variant="contained" color="warning">
                                            Reset
                                        </Button>
                                    </Paper>
                                {/* </Grid> */}
                            </Grid>
                        {/* </Box> */}
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid spacing={1} xs={6} md={3}>
                <Accordion style={{marginRight: "40px"}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{
                            backgroundColor: "gainsboro",
                            maxWidth: "400px auto",
                            color: "black",
                            textAlign: "center"
                        }}
                    >
                        <Typography>Filter by Brand</Typography>
                    </AccordionSummary>
                <AccordionDetails>
                    {/* <Box sx={{ flexGrow: 1}} style={{marginLeft: "20px", marginTop: "20px"}}> */}
                        <Grid container spacing={1} >
                            {/* <Grid item md={2}> */}
                                <Paper elevation={2} style={{width:'200px', padding: '10px', marginTop: '10px'}}>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label='gender' name="gender1" value={brand} 
                                            onChange={(e) => handleChange("brand", e.target.value)}>
                                            <FormControlLabel 
                                                value="California Gold" 
                                                control={<Radio/>}
                                                label="California Gold"
                                            />
                                            <FormControlLabel 
                                                value="Child Life" 
                                                control={<Radio/>}
                                                label="Child Life"
                                            />
                                            <FormControlLabel 
                                                value="Now Foods" 
                                                control={<Radio/>}
                                                label="Now Foods"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <Grid>
                                        <Slider 
                                            onChange={(e) => filterProducts("price_lte", e.target.value)}
                                            valueLabelDisplay="auto"
                                            max={20000}
                                            step={100}
                                        />
                                    </Grid>
                                    <Button onClick={resetFilter} variant="contained" color="warning">
                                        Reset
                                    </Button>
                                </Paper>
                            {/* </Grid> */}
                        </Grid>
                    {/* </Box> */}
                </AccordionDetails>
            </Accordion>
        </Grid>
            
    </Container>
    );
};

export default FilterItem;