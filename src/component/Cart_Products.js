

import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";





export default function Cart_Products({ cart }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(cart.quantity);

    const handleIncreaseQuantity = () => {
        setQuantity((quantity) => quantity + 1);
        handleChangeQuantity(quantity + 1);
    }

    const handleDecreaseQuantity = () => {
        if (quantity === 1) {
            handDleRemoveToCart();
        } else {
            setQuantity((quantity) => quantity - 1);
            handleChangeQuantity(quantity - 1);
        }
    }
    const handleChangeQuantity = (quantity) => {
        const data = {
            quantity: quantity,
            product: cart.product
        }
        dispatch(
            { type: "CHANGE_QUANTITY", payload: data }
        );
    };


    const handDleRemoveToCart = () => {
        const check = window.confirm('Are you want to delete this item?');
        if (check){
            dispatch({ type: "REMOVE_PRODUCT", payload: cart })
        toast.success("Deleted successfully ! ");
        }else{
            toast.info("You have canceled the deletion of the product !");
        }
    }



    return (
        <Grid item xs={6}>
            <div className='justify-center flex flex-row rounded-lg shadow hover:shadow-lg mb-3 shadow-gray-500 pr-12'>
                <img className='w-44 scale-75' src={cart.product.img} />

                <div className='mt-5 mx-10'>
                    <div className='flex justify-between'>
                        <div className='text-xl font-bold mt-2 ml-1'>
                            {cart.product.productName}
                        </div>
                        <IconButton aria-label="delete" size="large" onClick={handDleRemoveToCart}>
                            <DeleteIcon fontSize="inherit" style={{ marginTop: '1px', color: 'black' }} />
                        </IconButton>
                    </div>


                    <p className='  text-gray-500 text-xs ml-1 mt-2'>
                        {cart.product.description}
                    </p>

                    <div className='flex justify-between mt-9 my-3 items-center'>

                        <div className='flex items-center'>
                            <IconButton aria-label="delete" size="large" onClick={handleDecreaseQuantity}>
                                <RemoveIcon fontSize="inherit" style={{ marginTop: '1px', color: 'black' }} />
                            </IconButton>

                            <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-2/5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" value={quantity} required />

                            <IconButton aria-label="delete" size="large" onClick={handleIncreaseQuantity}>
                                <AddIcon fontSize="inherit" style={{ marginTop: '1px', color: 'black' }} />
                            </IconButton>

                        </div>
                        <p className='text-black  font-bold '>
                            ${cart.product.price}
                        </p>
                    </div>

                </div>
            </div>
        </Grid>
    )
}
