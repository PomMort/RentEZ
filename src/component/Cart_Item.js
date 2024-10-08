import React from 'react'
import { useSelector } from 'react-redux';
import Cart_Products from './Cart_Products';

export default function Cart_Item() {
    
    const { cartList } = useSelector((state) => state.productListData);


    return (
        <div className='grid mt-2'>

            {cartList.map((cart) => (
                <Cart_Products key={cart.product.id} cart={cart} />
            ))}
        </div >

    )
}
