import React, { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';

export default function ListProducts() {
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.productListData);


    const handleSelectProduct = useCallback((product) => {


        dispatch({ type: "SELECT_PRODUCT", payload: product });

    }, [])



    // console.log(productList);

    return (
        <div className='grid grid-flow-row auto-rows-max mt-2 max-h-[1000px] overflow-x-hidden'>
            <Box sx={{ width: '100%' }}>
                <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="baseline">
                    {productList.map((product) => (
                        <Grid item xs={6} key={product.id} style={{ width: '100%' }}>
                            <div className='justify-start flex flex-row rounded-lg shadow hover:shadow-lg mb-3 shadow-gray-500'>
                                <img className='w-44 scale-75 max-h-[235px]' src={product?.img} />
                                <div className='my-5 mx-10 flex-1'>
                                    <Tooltip title={product?.productName}>
                                        <div className='text-xl font-bold mt-2 ml-1 max-w-[400px] truncate '>
                                            {product.productName}
                                        </div>
                                    </Tooltip>

                                    <Tooltip title={product?.description}>
                                        <p className='text-gray-500 text-xs ml-1 mt-2 max-w-[500px] truncate'>
                                            {product.description}
                                        </p>
                                    </Tooltip>
                                    <div className='flex justify-between mt-10 mr-3 max-w-[400px] '>
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