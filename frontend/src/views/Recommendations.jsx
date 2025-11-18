import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ProductCard from './Components/ProductCard';

const Recommendations = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state?.data;

    const [skincareEffect, setSkincareEffect] = useState('');
    const [makeupEffect, setMakeupEffect] = useState('');

    if (!data) {
        return (
            <Container sx={{ mt: 10, textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    No recommendation data found.
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/')}>
                    Go to Home
                </Button>
            </Container>
        );
    }

    const { general, makeup } = data;

    const handleSkincareAR = (effect) => {
        navigate(`/ArSkincare`, { state: { effect, data } });
    };

    const handleMakeupAR = (effect) => {
        navigate(`/ArMakeup`, { state: { effect, data } });
    };

    return (
        <Container sx={{ marginTop: "2vh", padding: 1 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Skin care
            </Typography>

            <Button
                onClick={() => handleSkincareAR(skincareEffect)}
                variant="outlined"
                Container sx={{ marginTop: "2vh", padding: 1 }}
            >
                Try AR Skincare Visualization
            </Button>

            {Object.keys(general).map((type) => (
                <div key={type}>
                    <Typography variant="h5" color="text.secondary">{type}</Typography>
                    <Grid container spacing={1}>
                        {general[type].slice(0, 4).map((prod, index) => (
                            <Grid item xs={6} md={3} key={index}>
                                {/* Ensure imageUrl is passed correctly */}
                                <ProductCard
                                name={prod.name}
                                brand={prod.brand}
                                image={prod.img}
                                price={prod.price}
                                url={prod.url}
                                concern={prod.concern} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ))}

            <Typography variant="h4" textAlign="center" mt={4} gutterBottom>
                Make up
            </Typography>

            <Button
                onClick={() => handleMakeupAR(makeupEffect)}
                variant="outlined"
                Container sx={{ marginTop: "2vh", padding: 1 }}
            >
                Try AR Makeup Visualization
            </Button>

            <Grid container spacing={1}>
                {makeup.map((prod, index) => (
                    <Grid item xs={6} md={3} key={index}>
                        {/* Ensure imageUrl is passed correctly */}
                        <ProductCard
                                name={prod.name}
                                brand={prod.brand}
                                image={prod.img}
                                price={prod.price}
                                url={prod.url}
                                concern={prod.concern} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Recommendations;
