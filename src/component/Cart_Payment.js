import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

export default function Cart_Payment() {
    const { cartList } = useSelector((state) => state.productListData);
    const [totalPrice, setTotalPrice] = useState(0);

    
    useEffect(() => {
        const totalPrice = cartList.reduce((preValue, c) => {
            return preValue + c.product.price * c.quantity * 1.0;
        }, 0);
       
        setTotalPrice(totalPrice.toFixed(2));
        
    }, [cartList]);
    

    

    return (
        <div>
            <div className='mt-2 shadow hover:shadow-lg  rounded-2xl shadow-gray-500 min-h-[200px]'>
                <p className='font-bold text-xl mx-4 py-4'>Order Infor </p>
                <div className='mx-10'>
                    <p className='flex justify-between '>
                        <span className=' text-gray-500'>  Subtotal:   </span>
                        <span className='font-semibold'>${totalPrice}</span>
                    </p>

                    <p className='flex justify-between mb-4'>
                        <span className=' text-gray-500'>  Shipping Cost: </span>
                        <span className='font-semibold'>$10</span>
                    </p>


                </div>

                <p className='flex justify-between font-bold text-2xl pb-11 mx-4'>
                    Total:      <span className='mr-7'>${(totalPrice * 1 + 10).toFixed(2)}</span>
                </p>

            </div>


            <div className='grid grid-cols-1 mt-4 gap-3'>

                <Button variant="contained" style={{ color: 'white', background: 'black', fontWeight: 'bold' }} className='transition ease-in-out hover:-translate-y-1 hover:scale-105  duration-500 rounded-2xl'>
                    Check out
                </Button>

                <Link to={'/'} >
                    <Button variant="outlined" style={{ color: 'black', fontWeight: 'lighter', border: '1px solid black' }} className='transition ease-in-out hover:-translate-y-1 hover:scale-x-105  duration-500 rounded-2xl w-full'>
                        Continue shopping
                    </Button>
                </Link>
            </div>

        </div>
    )
}
