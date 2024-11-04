import { Box, Grid2 } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

export default function ProductList() {
	const { productList } = useSelector((state) => state.productListData);
	return (
		<div className='mx-3'>
			<Box sx={{ width: "100%" }}>
				<Grid2
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				>
					{productList.map((product) => (
						<Grid2
							size={{ lg: 3, md: 6, sm: 12 }}
							className='rounded-lg shadow hover:shadow-lg mb-10 shadow-gray-500'
							style={{ cursor: "pointer" }}
							key={product?.id}
						>
							<Link key={product?.id} to={`/Detail/${product.id}`}>
								<ProductItem product={product} />
							</Link>
						</Grid2>
					))}
				</Grid2>
			</Box>
		</div>
	);
}
