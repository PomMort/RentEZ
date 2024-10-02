import { Box, Grid2 } from '@mui/material'
import React, { useCallback } from 'react'
import { FaTruckMoving } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';


export default function ProductList() {
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.productListData);


    const handleSelectProduct = useCallback((product) => {


        dispatch({ type: "SELECT_PRODUCT", payload: product });

    }, [])
    // console.log(productList)
    return (
        <div className='mx-3'>
            <Box sx={{ width: '100%' }}>
                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    {productList.map((product) => (
                        <Grid2 size={3} className='rounded-lg shadow hover:shadow-lg mb-10 shadow-gray-500'
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSelectProduct(product)}
                            key={product.id}>
                            {/* {console.log(product)} */}
                            <div className='min-w-[300px] min-h-[350px] mx-4'>
                                <div className='flex justify-center'>
                                    <img className=' mt-4 bg-center min-h-[400px]' style={{ width: '80%' }} src={product?.img} alt='anh_cuoi' />
                                </div>
                                <div>
                                    <div className='min-w-[300px] my-3'>
                                        <p className='font-text text-xl'>{product?.productName}</p>
                                        <div className='flex justify-between' style={{ alignItems: 'center' }}>
                                            <p className='font-text' style={{ color: 'red', fontSize: '20px' }}>{product?.price}</p>
                                            <p className='font-text' style={{
                                                background: '#ffc800',
                                                color: 'black',
                                                fontSize: '16px',
                                                padding: '2px 10px',
                                                borderRadius: '5px',
                                                display: 'inline-block'
                                            }}>
                                                -53%
                                            </p>
                                            <FaTruckMoving style={{ color: 'yellowgreen', fontSize: '40px' }} />
                                        </div>
                                        <div className='flex justify-center mt-6'>
                                            <p className='font-text' style={{
                                                background: '#ffff00',
                                                color: 'black',
                                                fontSize: '16px',
                                                padding: '5px 80px',
                                                borderRadius: '5px',
                                                display: 'inline-block'
                                            }}>
                                                Voucher giảm giá 50%
                                            </p>
                                        </div>

                                        <div className='flex justify-between' style={{ alignItems: 'center' }}>
                                            <div className='flex justify-center my-5' style={{ alignItems: 'center', gap: '5px' }}>
                                                <p className='font-text text-black' style={{ fontSize: '20px' }}>5</p>
                                                <FaStar style={{ color: 'yellow', fontSize: '20px' }} />
                                            </div>
                                            <p className='font-text text-black text-xl'>Số lần thuê: 20</p>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </Grid2>
                    ))};


                    {/* <Grid2 size={3} className='rounded-lg shadow hover:shadow-lg mb-3 shadow-gray-500'>
                        <div className='min-w-[300px] min-h-[350px] mx-4'>
                            <div className='flex justify-center'>
                                <img className=' mt-4 bg-center' style={{ width: '80%' }} src='https://i.pinimg.com/736x/02/b1/c4/02b1c4add8e6361cf229c201e0fbee55.jpg' alt='anh_cuoi' />
                            </div>
                            <div>
                                <div className='min-w-[300px]'>
                                    <p className='font-text text-xl'>Đầm Mini Organza tay lỡ xếp li màu hạt dẻ</p>
                                    <div className='flex justify-between' style={{ alignItems: 'center' }}>
                                        <p className='font-text' style={{ color: 'red', fontSize: '20px' }}>120.000đ</p>
                                        <p className='font-text' style={{
                                            background: '#ffc800',
                                            color: 'black',
                                            fontSize: '16px',
                                            padding: '2px 10px',
                                            borderRadius: '5px',
                                            display: 'inline-block'
                                        }}>
                                            -53%
                                        </p>
                                        <FaTruckMoving style={{ color: 'yellowgreen', fontSize: '40px' }} />
                                    </div>
                                    <div className='flex justify-center mt-6'>
                                        <p className='font-text' style={{
                                            background: '#ffff00',
                                            color: 'black',
                                            fontSize: '16px',
                                            padding: '5px 80px',
                                            borderRadius: '5px',
                                            display: 'inline-block'
                                        }}>
                                            Voucher giảm giá 50%
                                        </p>
                                    </div>

                                    <div className='flex justify-between' style={{ alignItems: 'center' }}>
                                        <div className='flex justify-center my-5' style={{ alignItems: 'center', gap: '5px' }}>
                                            <p className='font-text text-black' style={{ fontSize: '20px' }}>5</p>
                                            <FaStar style={{ color: 'yellow', fontSize: '20px' }} />
                                        </div>
                                        <p className='font-text text-black text-xl'>Số lần thuê: 20</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Grid2>
                    <Grid2 size={3} className='rounded-lg shadow hover:shadow-lg mb-3 shadow-gray-500'>
                        <div className='min-w-[300px] min-h-[350px] mx-4'>
                            <div className='flex justify-center'>
                                <img className=' mt-4 bg-center' style={{ width: '80%' }} src='https://i.pinimg.com/736x/02/b1/c4/02b1c4add8e6361cf229c201e0fbee55.jpg' alt='anh_cuoi' />
                            </div>
                            <div>
                                <div className='min-w-[300px]'>
                                    <p className='font-text text-xl'>Đầm Mini Organza tay lỡ xếp li màu hạt dẻ</p>
                                    <div className='flex justify-between' style={{ alignItems: 'center' }}>
                                        <p className='font-text' style={{ color: 'red', fontSize: '20px' }}>120.000đ</p>
                                        <p className='font-text' style={{
                                            background: '#ffc800',
                                            color: 'black',
                                            fontSize: '16px',
                                            padding: '2px 10px',
                                            borderRadius: '5px',
                                            display: 'inline-block'
                                        }}>
                                            -53%
                                        </p>
                                        <FaTruckMoving style={{ color: 'yellowgreen', fontSize: '40px' }} />
                                    </div>
                                    <div className='flex justify-center mt-6'>
                                        <p className='font-text' style={{
                                            background: '#ffff00',
                                            color: 'black',
                                            fontSize: '16px',
                                            padding: '5px 80px',
                                            borderRadius: '5px',
                                            display: 'inline-block'
                                        }}>
                                            Voucher giảm giá 50%
                                        </p>
                                    </div>

                                    <div className='flex justify-between' style={{ alignItems: 'center' }}>
                                        <div className='flex justify-center my-5' style={{ alignItems: 'center', gap: '5px' }}>
                                            <p className='font-text text-black' style={{ fontSize: '20px' }}>5</p>
                                            <FaStar style={{ color: 'yellow', fontSize: '20px' }} />
                                        </div>
                                        <p className='font-text text-black text-xl'>Số lần thuê: 20</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Grid2>
                    <Grid2 size={3} className='rounded-lg shadow hover:shadow-lg mb-3 shadow-gray-500'>
                        <div className='min-w-[300px] min-h-[350px] mx-4'>
                            <div className='flex justify-center'>
                                <img className=' mt-4 bg-center' style={{ width: '80%' }} src='https://i.pinimg.com/736x/02/b1/c4/02b1c4add8e6361cf229c201e0fbee55.jpg' alt='anh_cuoi' />
                            </div>
                            <div>
                                <div className='min-w-[300px]'>
                                    <p className='font-text text-xl'>Đầm Mini Organza tay lỡ xếp li màu hạt dẻ</p>
                                    <div className='flex justify-between' style={{ alignItems: 'center' }}>
                                        <p className='font-text' style={{ color: 'red', fontSize: '20px' }}>120.000đ</p>
                                        <p className='font-text' style={{
                                            background: '#ffc800',
                                            color: 'black',
                                            fontSize: '16px',
                                            padding: '2px 10px',
                                            borderRadius: '5px',
                                            display: 'inline-block'
                                        }}>
                                            -53%
                                        </p>
                                        <FaTruckMoving style={{ color: 'yellowgreen', fontSize: '40px' }} />
                                    </div>
                                    <div className='flex justify-center mt-6'>
                                        <p className='font-text' style={{
                                            background: '#ffff00',
                                            color: 'black',
                                            fontSize: '16px',
                                            padding: '5px 80px',
                                            borderRadius: '5px',
                                            display: 'inline-block'
                                        }}>
                                            Voucher giảm giá 50%
                                        </p>
                                    </div>

                                    <div className='flex justify-between' style={{ alignItems: 'center' }}>
                                        <div className='flex justify-center my-5' style={{ alignItems: 'center', gap: '5px' }}>
                                            <p className='font-text text-black' style={{ fontSize: '20px' }}>5</p>
                                            <FaStar style={{ color: 'yellow', fontSize: '20px' }} />
                                        </div>
                                        <p className='font-text text-black text-xl'>Số lần thuê: 20</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Grid2> */}
                </Grid2>
            </Box>
        </div >

    )
}
