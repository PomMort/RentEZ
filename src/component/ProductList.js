import { Box, Grid2, Tooltip } from '@mui/material';
import React from 'react';
import { FaTruckMoving } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function ProductList() {
  // Dữ liệu giả lập (fake data)
  const productList = [
    {
      productId: 1,
      productName: "Men's T-Shirt",
      price: 200000,
      description: "High quality men's t-shirt made from cotton.",
      image: "https://via.placeholder.com/200x200.png?text=Men+T-Shirt",
      rating: 5,
      rentalCount: 20,
    },
    {
      productId: 2,
      productName: "Women's Dress",
      price: 500000,
      description: "Stylish and comfortable dress for women.",
      image: "https://via.placeholder.com/200x200.png?text=Women+Dress",
      rating: 4,
      rentalCount: 10,
    },
    {
      productId: 3,
      productName: "Men's Sneakers",
      price: 800000,
      description: "Comfortable men's sneakers perfect for everyday use.",
      image: "https://via.placeholder.com/200x200.png?text=Men+Sneakers",
      rating: 4.5,
      rentalCount: 30,
    },
    {
      productId: 4,
      productName: "Women's Handbag",
      price: 1000000,
      description: "Elegant handbag made from high-quality leather.",
      image: "https://via.placeholder.com/200x200.png?text=Women+Handbag",
      rating: 5,
      rentalCount: 25,
    },
  ];

  return (
    <div className='mx-3'>
      <Box sx={{ width: '100%' }}>
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {productList.map((product) => (
            <Grid2 size={3} className='rounded-lg shadow hover:shadow-lg mb-10 shadow-gray-500'
              style={{ cursor: 'pointer' }}
              key={product?.productId}>
              <Link key={product?.productId} to={`/Detail/${product.productId}`}>
                <div className='max-w-[400px] min-h-[350px] mx-4'>
                  <div className='flex justify-center'>
                    <img className=' mt-4 bg-center min-h-[400px]' style={{ width: '80%' }} src={product?.image} alt='product' />
                  </div>
                  <div>
                    <div className='max-w-[400px] max-h-[350px] my-3'>
                      <Tooltip title={product?.productName}>
                        <p className='font-text text-xl overflow-hidden truncate' style={{ whiteSpace: 'nowrap' }}>{product?.productName}</p>
                      </Tooltip>

                      <div className='flex justify-between mt-2' style={{ alignItems: 'center' }}>
                        <p className='font-text' style={{ color: 'red', fontSize: '20px' }}>{product?.price}đ</p>
                        <p className='font-text' style={{
                          background: '#ffc800',
                          color: 'black',
                          fontSize: '16px',
                          padding: '3px 10px',
                          borderRadius: '5px',
                          display: 'flex',
                          grid: 'none',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '50px'
                        }}>
                          -53%
                        </p>
                        <FaTruckMoving style={{ color: 'yellowgreen', fontSize: '40px' }} />
                      </div>
                      <div className='flex justify-center mt-6 max-w-[400px] min-h-[20px]'>
                        <p className='font-text' style={{
                          background: '#ffff00',
                          color: 'black',
                          fontSize: '16px',
                          padding: '10px',
                          borderRadius: '5px',
                          display: 'block',
                          width: '100%',
                          boxSizing: 'border-box',
                          margin: '5px 0',
                          textAlign: 'center'
                        }}>
                          Voucher giảm giá 50%
                        </p>
                      </div>

                      <div className='flex justify-between' style={{ alignItems: 'center' }}>
                        <div className='flex justify-center my-5' style={{ alignItems: 'center', gap: '5px' }}>
                          <p className='font-text text-black' style={{ fontSize: '20px' }}>{product?.rating}</p>
                          <FaStar style={{ color: 'yellow', fontSize: '20px' }} />
                        </div>
                        <p className='font-text text-black text-xl'>Số lần thuê: {product?.rentalCount}</p>
                      </div>

                    </div>

                  </div>
                </div>
              </Link>

            </Grid2>
          ))}
        </Grid2>
      </Box>
    </div>
  );
}
