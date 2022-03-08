import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { productContext } from '../../../Contexts/ProductContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ProductCard({item}) {
  const { deleteProduct, addToCart, addToStar, checkProductInStar, checkProductInCart } = React.useContext(productContext)
  let icons = (
      <CardActions disableSpacing> 
          <Link to={`/edit/${item.id}`}>
              <IconButton>
                  <EditIcon />
              </IconButton>
          </Link>
          <IconButton onClick={() => deleteProduct(item.id)}>
              <DeleteIcon />
          </IconButton>
         
          <IconButton onClick={() => {
                  addToCart(item)
                  checkProductInCart(item.id)
              }}
                color={checkProductInCart(item.id) ? "secondary" : "inherit"}
              >
                <ShoppingCart /> 
          </IconButton>
        
         
          <IconButton onClick={() => {
                  addToStar(item)
                  console.log(addToStar)
                }
              } 
                  color={checkProductInStar(item.id) ? "secondary" : "inherit"}
                >          
                <FavoriteBorderIcon />
          </IconButton>        
      </CardActions>    
  )

  return (
    <Card sx={{ maxWidth: 420}}>
      <Link to={`/detail/${item.id}`} style={{textDecoration: "none", color: "black"}} >
          <CardMedia
                component="img"
                height="300"
                image={item.image}
                alt={item.title}
          />
          <CardContent style={{marginTop: "1px", padding: "10px", textAlign: "center"}}>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
          </CardContent>
      </Link>
      <CardContent style={{marginTop: "1px", padding: "10px"}}>
        <Typography>
          {item.price} KGS
        </Typography>
      </CardContent>
      <CardContent style={{marginTop: "1px", padding: "10px"}}>
        <Typography>
          {item.brand} 
        </Typography>
      </CardContent>
      <CardContent style={{marginTop: "1px", padding: "10px"}}>
        <Typography>
          {item.shortDesc}
        </Typography>
      </CardContent>
      {icons}
    </Card>
  );
}
