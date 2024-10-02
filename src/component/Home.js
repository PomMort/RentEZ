import React, { useEffect } from 'react'
// import ListProdutcs from './ListProdutcs';
// import ProductDetail from './ProductsDetail';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FaAngleRight } from "react-icons/fa";
import ProductList from './ProductList';




export default function Home() {
  const { status } = useSelector((state) => state.productListData)

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('Auth')));
    dispatch({ type: "GET_DATA" });
  }, [dispatch]);



  if (!status) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
    )
  } else {
    return (
      <>
        <div className='bg-cover bg-bottom min-w-[900px] min-h-[300px]' style={{ backgroundImage: `url('image/anh_nen_1.jpg')`, padding: '30px' }}>
          <div className='min-w-[200px] min-h-[300px]'>
            <p className='font-bold text-4xl font-text text-neutral-50 mb-10 pt-24 ml-52'>NEW COLLECTION</p>
            <p className='font-bold text-3xl font-text text-neutral-50 ml-52 pb-20'>FIND THE PERFECT STYLE FOR YOU</p>
            <div style={{ marginTop: '-30px', paddingBottom: '40px' }}>
              <button className="text-xl rounded-full font-text text-neutral-50 bg-yellow-300 shadow-lg shadow-yellow-200/60 ml-56 hover:bg-yellow-400"
                style={{ padding: '10px 40px 10px 40px' }}>RENT NOW</button>
            </div>
          </div>
        </div>

        <div className=' md:container md:mx-auto grid-cols-2 grid px-5 my-12'>
          <div className='bg-cover bg-center min-w-[400px] min-h-[300px]' style={{ backgroundImage: `url('image/anh_nen_2.1.jpg')`, padding: '30px' }}>
            <div className='flex justify-between mt-60'>
              <p className='font-bold font-text text-2xl mt-2 text-neutral-50'>MEN</p>
              <FaAngleRight style={{ fontSize: '40px', color: 'white' }} />
            </div>
          </div>

          <div className='bg-cover bg-center min-w-[400px] min-h-[300px]' style={{ backgroundImage: `url('image/anh_nen_2.jpg')`, padding: '30px' }}>
            <div className='flex justify-between mt-60'>
              <p className='font-bold font-text text-2xl mt-2 text-neutral-50'>WOMEN</p>
              <FaAngleRight style={{ fontSize: '40px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <div style={{ paddingBottom: '40px' }}>
            <button className="text-4xl font-bold rounded-lg font-text text-black bg-yellow-300 shadow-lg shadow-yellow-200/60 hover:bg-yellow-400"
              style={{ padding: '10px 150px 10px 150px' }}>Item For Sale</button>
          </div>
        </div>

        <image className='bg-cover bg-center min-w-[400px] min-h-[750px] flex flex-1 mb-8 mt-2' style={{ backgroundImage: `url('image/anh_nen_3.jpg')` }}>
        </image>

        <div className='my-20'>
          <ProductList />
        </div>

      </>




      // <div className='grid grid-cols-2 px-10 m-auto gap-10 my-20' >

      //   <ProductDetail />
      //   <ListProdutcs />


      // </div>



    )

  }

}
