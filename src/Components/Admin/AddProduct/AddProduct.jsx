import { Box, Paper, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { productContext } from '../../../Contexts/ProductContext';

export default function AddProduct() {
    const [values, setValues] = useState({
        title: "",
        image: "",
        price: "",
        type: "",
        shortDesc: "",
        detailedDesc: "",
        brand: "",
    })

    const { addProduct } = useContext(productContext)
    const navigate = useNavigate()

    const handleInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }

    const handleSave = () => {
        if(!values.image)
        values.image = "https://proprikol.ru/wp-content/uploads/2019/09/kartinki-dlya-detej-vitaminy-23.jpg"
        addProduct({...values, price: +values.price})
        navigate("/")        
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",            
                '& > :not(style)': {
                    m: "50px auto",
                    maxWidth: 1700,
                    height: "auto"},
                    background: "lightgray"
            }}
        > 
          <Paper elevation={3}>
              <h4 style={{textAlign: "center", color: "black", marginTop: "20px"}}>Add new products</h4>
              <div style={{display: "flex", justifyContent: "space-around", color: "black", marginLeft: "5px", alignItems: "center"}}>
                  <div>
                      <img width="300" src={values.image ? values.image : "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHZpdGFtaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}/>
                  </div>
                  <div>
                      <form noValidate autoComplete='off' style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center"
                      }}>
                          <TextField
                            style={{padding: "5px"}}
                            name="title"
                            onChange={handleInp}
                            value={values.title}
                            variant="outlined"
                            label="Title"
                            />
                          <TextField
                            style={{padding: "5px"}}
                            name="image"
                            onChange={handleInp}
                            value={values.image}
                            variant="outlined"
                            label="Image"
                            />
                          <TextField
                            style={{padding: "5px"}}
                            name="price"
                            onChange={handleInp}
                            value={values.price}
                            variant="outlined"
                            label="Price"
                            />
                          <TextField
                            style={{padding: "5px"}}
                            name="type"
                            onChange={handleInp}
                            value={values.type}
                            variant="outlined"
                            label="Type"
                            />
                          <TextField
                            style={{padding: "5px"}}
                            name="shortDesc"
                            onChange={handleInp}
                            value={values.shortDesc}
                            variant="outlined"
                            label="ShortDesc"
                            />
                          <TextField
                            style={{padding: "5px"}}
                            name="detailedDesc"
                            onChange={handleInp}
                            value={values.detailedDesc}
                            variant="outlined"
                            label="DetailedDesc"
                            />
                          <TextField
                            style={{padding: "5px"}}
                            name="brand"
                            onChange={handleInp}
                            value={values.brand}
                            variant="outlined"
                            label="Brand"
                            />
                      </form>
                      <Button onClick={handleSave} variant='contained' color='success' style={{marginLeft: "50px", marginBottom: "10px"}}>Add product</Button>
                  </div>
              </div>
          </Paper>
        </Box>
    );
};