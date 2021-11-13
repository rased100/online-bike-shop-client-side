import { Button, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PurchaseProduct = () => {
    const [product, setProduct] = useState({});
    const { Id } = useParams();
    const { user } = useAuth();
    const { name, price, img, description } = product;
    // console.log('usr', user)
    // console.log('product', product)
    // console.log('name', name)
    // console.log('price', price)

    useEffect(() => {
        const url = `http://localhost:5000/product/${Id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, []);

    const initialInfo = { userName: user.displayName, userEmail: user.email, userPhone: '' }

    const [purchaseInfo, setPurchaseInfo] = useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...purchaseInfo };
        newInfo[field] = value;
        setPurchaseInfo(newInfo);
    }

    const handleOrderSubmit = e => {
        // collect data
        const order = {
            ...purchaseInfo,
            productName: name,
            productPrice: price,
            productImage: img,
            productDscription: description
        }
        // send to the server
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Order Place Successfully')
                }
            });

        e.preventDefault();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>

            <Typography style={{ margin: '0 0 20px 0' }} variant="h3" component="div">
                Product Details and Place Order
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <form onSubmit={handleOrderSubmit}>
                        <TextField
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="userName"
                            onBlur={handleOnBlur}
                            defaultValue={user.displayName}
                            size="small"
                        />
                        <TextField
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="userEmail"
                            onBlur={handleOnBlur}
                            defaultValue={user.email}
                            size="small"
                        />
                        <TextField
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="userPhone"
                            onBlur={handleOnBlur}
                            defaultValue="Phone Number"
                            size="small"
                        />
                        <TextField
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="address"
                            onBlur={handleOnBlur}
                            defaultValue="Address"
                            size="small"
                        />
                        <Button style={{ width: '50%', margin: '20px 0 0 0' }} type="submit" variant="contained">Place Order</Button>
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <CardMedia
                            component="img"
                            style={{ width: '50%', margin: 'auto' }}
                            image={product.img}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography style={{ width: '50%', margin: 'auto' }} variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                            <Typography variant="h6" component="div">
                                Price: ${product.price}
                            </Typography>
                        </CardContent>
                    </Box>
                </Grid>
            </Grid>
        </Box>

    );
};

export default PurchaseProduct;