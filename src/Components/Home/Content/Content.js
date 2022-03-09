import { Card, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from '@mui/material';
import ProductList from '../../Product/ProductList/ProductList';

import FilterItem from './FilterItems';
import CommentBox from './Comments/Comment';


const Content = () => {
    return (
            <Container>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Grid>
                        <ProductList />
                    </Grid>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: "15px"}}>
                    <FilterItem />
                </div>
                <Grid style={{padding: "20px"}} columns={{xs:1, sm: 2, md: 4}}>
                    <div><h4 style={{textAlign: "center", color: "darkGreen", padding: "10px"}}>Useful articles</h4> </div>
                    <Grid style={{display: "flex", padding: "20px", justifyContent: "space-around", justifyWrap: "wrap"}} >
                    <Card sx={{ maxWidth: 200}} >   
                            <Link href="https://kg.iherb.com/blog/beginner-lifter-supplements/1518" target="_blank" rel="noreferrer"
                                style={{textDecoration: "none", color: "black"}} >
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={require("./athlete.jpg")}
                                    alt="Athlete"
                                />
                                <CardContent style={{marginTop: "1px", padding: "5px", textAlign: "center"}}>
                                    <Typography gutterBottom variant="body2" component="div">
                                    Три добавки, которые будут полезны начинающим тяжелоатлетам
                                    </Typography>
                                </CardContent>
                            </Link>  
                    </Card>
                    <Card sx={{ maxWidth: 200}} >   
                            <Link href="https://kg.iherb.com/blog/benfotiamine/1517" target="_blank" rel="noreferrer"
                                style={{textDecoration: "none", color: "black"}} >
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={require("./benfotiamine.jpg")}
                                    alt="Benfotiamine"
                                />
                                <CardContent style={{marginTop: "1px", padding: "5px", textAlign: "center"}}>
                                    <Typography gutterBottom variant="body2" component="div">
                                    Что такое бенфотиамин? Пять полезных свойств бенфотиамина
                                    </Typography>
                                </CardContent>
                            </Link>  
                    </Card>
                    <Card sx={{ maxWidth: 200}} >   
                            <Link href="https://kg.iherb.com/blog/women-metabolism/1516" target="_blank" rel="noreferrer"
                                style={{textDecoration: "none", color: "black"}} >
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={require("./metabolism.jpg")}
                                    alt="Metabolism"
                                />
                                <CardContent style={{marginTop: "1px", padding: "5px", textAlign: "center"}}>
                                    <Typography gutterBottom variant="body2" component="div">
                                    Диетолог рассказывает как наладить метаболизм
                                    </Typography>
                                </CardContent>
                            </Link>  
                    </Card>
                    <Card sx={{ maxWidth: 200}} >   
                            <Link href="https://kg.iherb.com/blog/nutrition-myths/1514" target="_blank" rel="noreferrer"
                                style={{textDecoration: "none", color: "black"}} >
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={require("./myths.jpg")}
                                    alt="Myths"
                                />
                                <CardContent style={{marginTop: "1px", padding: "5px", textAlign: "center"}}>
                                    <Typography gutterBottom variant="body2" component="div">
                                    Три мифа о питании, от которых нужно избавиться...
                                    </Typography>
                                </CardContent>
                            </Link>  
                    </Card>
                        
                    </Grid>
                    
                </Grid>

            </Container>
    );
};

export default Content;