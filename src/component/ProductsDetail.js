// import React, { useEffect, useState } from 'react'
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from "react-toastify";
// import { Tooltip } from '@mui/material';




// export default function DetailProducts() {

//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();
//   const { selectorProduct, status } = useSelector((state) => state.productListData);

//   // console.log(selectorProduct);
//   const handleIncreaseQuantity = () => {
//     setQuantity(quantity + 1);
//   }

//   useEffect(() => {
//     setQuantity(1);
//   }, [selectorProduct]);


//   const handleDecreaseQuantity = () => {
//     if (quantity !== 1)
//       setQuantity(quantity - 1);
//   }

//   const handleAddToCard = () => {
//     const CartItem = {
//       quantity,
//       product: selectorProduct
//     }
//     dispatch({ type: "ADD_TO_CART", payload: CartItem });
//     toast.success("Adding successfully ! ");

//   }




//   return (

//     <div className='mt-2 shadow hover:shadow-lg rounded-2xl shadow-gray-500 max-h-[990px] min-w-[400px]'>
//       <img className='m-auto max-h-[600px] mt-10' style={{ width: '85%' }} src={selectorProduct.img} alt='' />

//       <div className='mt-10'>
//         <Tooltip title={selectorProduct.productName}>
//           <div className='text-3xl font-semibold ml-5 max-w-[600px] truncate'>
//             {selectorProduct.productName}
//           </div>
//         </Tooltip>

//         <Tooltip title={selectorProduct.description}>
//           <p className='mt-2 text-gray-500 text-justify ml-5 text-xs overflow-hidden'>
//             {selectorProduct.description}
//           </p>
//         </Tooltip>



//       </div>


//       <div className='flex justify-between mx-5 mt-5 items-center mb-3'>
//         <div className='flex items-center'>

//           <IconButton aria-label="delete" size="large" onClick={handleDecreaseQuantity}>
//             <RemoveIcon fontSize="inherit" style={{ marginTop: '1px', color: 'black' }} />
//           </IconButton>

//           <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-1/5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" value={quantity} required />

//           <IconButton aria-label="delete" size="large" onClick={handleIncreaseQuantity}>
//             <AddIcon fontSize="inherit" style={{ marginTop: '1px', color: 'black' }} />
//           </IconButton>

//         </div>

//         <p className='text-black font-bold text-2xl'>
//           ${selectorProduct.price}
//         </p>

//         <Button variant="contained" size='medium' style={{ color: 'white', background: 'black', fontWeight: 'lighter' }} className='transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-500 rounded-xl ' onClick={handleAddToCard} >

//           <ShoppingCartOutlinedIcon style={{ marginRight: '8px' }} /> Add to cart

//         </Button>
//       </div>
//     </div >
//   )

// }
