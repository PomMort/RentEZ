import React from "react";
import { FaAngleRight } from "react-icons/fa";
import ProductList from "./Product/ProductList";

export default function Home() {
	return (
		<>
			<div
				className='bg-cover bg-bottom min-h-[200px] sm:min-h-[300px] flex flex-col justify-center items-center px-4'
				style={{
					backgroundImage: `url('image/anh_nen_1.jpg')`,
				}}
			>
				<p className='font-bold text-2xl sm:text-4xl font-text text-neutral-50 mb-4'>
					NEW COLLECTION
				</p>
				<p className='font-bold text-lg sm:text-3xl font-text text-neutral-50 mb-6'>
					FIND THE PERFECT STYLE FOR YOU
				</p>
				<button className='text-base sm:text-xl rounded-full font-text text-neutral-50 bg-yellow-300 shadow-lg shadow-yellow-200/60 hover:bg-yellow-400 px-6 sm:px-10 py-2'>
					RENT NOW
				</button>
			</div>

			{/* MEN and WOMEN Categories */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 my-8'>
				<div
					className='bg-cover bg-center h-[200px] sm:h-[300px] flex justify-between items-end p-4'
					style={{
						backgroundImage: `url('image/anh_nen_2.1.jpg')`,
					}}
				>
					<p className='font-bold font-text text-lg sm:text-2xl text-neutral-50'>
						MEN
					</p>
					<FaAngleRight className='text-white text-3xl sm:text-4xl' />
				</div>

				<div
					className='bg-cover bg-center h-[200px] sm:h-[300px] flex justify-between items-end p-4'
					style={{
						backgroundImage: `url('image/anh_nen_2.jpg')`,
					}}
				>
					<p className='font-bold font-text text-lg sm:text-2xl text-neutral-50'>
						WOMEN
					</p>
					<FaAngleRight className='text-white text-3xl sm:text-4xl' />
				</div>
			</div>

			{/* Item For Sale Section */}
			<div className='flex justify-center px-4'>
				<button className='text-lg sm:text-4xl font-bold rounded-lg font-text text-black bg-yellow-300 shadow-lg shadow-yellow-200/60 hover:bg-yellow-400 px-8 sm:px-20 py-2 sm:py-4'>
					Item For Sale
				</button>
			</div>

			{/* Fullscreen Image Section */}
			<div
				className='bg-cover bg-center h-[400px] sm:h-[750px] flex flex-1 mb-8 mt-2'
				style={{ backgroundImage: `url('image/anh_nen_3.jpg')` }}
			></div>

			{/* Product List */}
			<div className='my-10 px-4'>
				<ProductList />
			</div>
		</>
	);
	// }
}
