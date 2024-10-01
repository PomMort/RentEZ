
import Cart_Item from './Cart_Item';
import Cart_Payment from './Cart_Payment';
// import { useDispatch } from 'react-redux';
import React from 'react'
import { useSelector } from "react-redux";


export default function Cart() {
    // const dispatch = useDispatch();
    const { cartList } = useSelector((state) => state.productListData);

  if (cartList.length === 0) {
    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <img
                src='https://newnet.vn/themes/newnet/assets/img/empty-cart.png'
                alt=''
                // className='m-auto'
            />
        </div>
    );
}



  
    return (
        <div className='w-4/5 m-auto mt-20'>


            <div className='shadow md:shadow-lg rounded-lg shadow-gray-400 py-3 flex justify-center font-bold text-2xl'>
                My Shopping Cart
            </div>

            <div className='flex flex-row gap-5 my-10'>
                <div className='basis-3/5 min-h-[800px]'>
                    <Cart_Item />
                </div>
                <div className='basis-2/5 min-h-[800px]'>
                    <Cart_Payment />
                </div>

            </div>


        </div>
    )

}
