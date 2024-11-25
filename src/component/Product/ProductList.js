import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { productList } = useSelector((state) => state.productListData);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productList.map((product) => (
          <div
            key={product?.id}
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden"
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
