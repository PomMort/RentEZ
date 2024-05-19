import React, { useCallback, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';

export default function ListProducts() {
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.productListData);


    const handleSelectProduct = useCallback((product) => {
       

        dispatch({ type: "SELECT_PRODUCT", payload: product });

    },[])



    // console.log(productList);

    return (
        <div className='grid grid-flow-row auto-rows-max mt-2'>
            <Box sx={{ width: '100%' }}>
                <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="baseline">
                    {productList.map((product) => (
                        <Grid item xs={6} key={product.id}>
                            <div className='justify-center flex flex-row rounded-lg shadow hover:shadow-lg mb-3 shadow-gray-500'>
                                <img className='w-44 scale-75' src={product.img} />
                                <div className='my-5 mx-10'>
                                    <div className='text-xl font-bold mt-2 ml-1'>
                                        {product.productName}
                                    </div>
                                    <p className='text-gray-500 text-xs ml-1 mt-2'>
                                        {product.description}
                                    </p>
                                    <div className='flex justify-between mt-10 mr-3'>
                                        <p className='text-black font-bold mt-2 ml-1'>
                                            ${product.price}
                                        </p>
                                        <Button variant="text" size='medium' style={{ color: 'black', border: '1px solid black', fontWeight: 'lighter' }} onClick={() => handleSelectProduct(product)}>
                                            Detail
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    ))}

                </Grid>
            </Box>
        </div>
    );
}