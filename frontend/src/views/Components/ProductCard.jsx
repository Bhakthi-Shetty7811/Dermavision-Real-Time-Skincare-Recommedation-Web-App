import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';

const unavailableImage = process.env.PUBLIC_URL + './unavailable.png';

export default function ProductCard({
  name = "cream",
  price = 2000,
  brand = "brand",
  url = "https://www.myntra.com/",
  concern = [],
  image = '',
  productAllergens = [], // Array of allergens for the product
}) {
  const [showAllergenWarning, setShowAllergenWarning] = useState(false);

  // Get the selected allergens from the global state or pass them as props (from parent component)
  const selectedAllergens = ['Fragrance', 'Alcohol']; // Replace with the actual selected allergens

  // Function to check if any selected allergen is present in the product
  const checkAllergens = () => {
    for (let allergen of selectedAllergens) {
      if (productAllergens.includes(allergen)) {
        return true;
      }
    }
    return false;
  };

  // Set the warning state
  const allergenFlag = checkAllergens();

  // Redirect to the product URL
  const redirectProduct = () => {
    window.location.replace(url);
  };

  concern = [...new Set(concern)];

  return (
    <Box onClick={redirectProduct} sx={{ lineHeight: "low" }}>
      <Card sx={{ maxWidth: "50vw" }}>
        <CardMedia
          component="img"
          height="200vh"
          image={image || unavailableImage}
          alt="Product image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {brand}
            <Typography
              component="div"
              color="text.primary"
              variant="inline"
              sx={{ float: "right", fontWeight: "bold" }}
            >
              {price}
            </Typography>
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {name.length > 40 ? name.substring(0, 40) + "..." : name}
          </Typography>
          <Grid container>
            {concern.filter((n) => n).map((concern, index) => {
              return (
                <Grid item xs={12} key={index}>
                  <Typography
                    variant="body2"
                    color="white"
                    variant="inline"
                    backgroundColor="info.main"
                    borderRadius="5%"
                    paddingLeft="2%"
                    paddingRight="2%"
                    paddingTop="1%"
                    paddingBottom="1%"
                    marginRight="2%"
                  >
                    {concern}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          
          {/* Display allergen warning if needed */}
          {allergenFlag && (
            <Typography
              variant="body2"
              color="error.main"
              sx={{ marginTop: 2, fontWeight: "bold" }}
            >
              Warning: This product contains allergens that you may be allergic to!
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
