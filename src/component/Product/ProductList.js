import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

export default function ProductList() {
	const { productList } = useSelector((state) => state.productListData);

	if (productList?.length === 0) {
		return (
			<div className='flex flex-col justify-center items-center'>
				<img
					src='https://www.new4you.in/img/no_products_found.png'
					alt=''
				/>
				<p className='text-lg font-bold uppercase'>
					Chưa có sản phẩm nào được trưng bày
				</p>
			</div>
		);
	}

	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{productList?.map((product) => (
					<div
						key={product?.id}
						className="rounded-lg shadow-md hover:shadow-lg mb-10 shadow-gray-500 transition-shadow overflow-hidden"
					>
						<Link to={`/Detail/${product.id}`}>
							<ProductItem product={product} />
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
