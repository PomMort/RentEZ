import React, { useState } from 'react';
import { FaCartPlus, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Quản lý trạng thái hình ảnh hiện tại
  const [selectedTab, setSelectedTab] = useState('description'); // Quản lý tab hiện tại

  // Các màu có thể chọn
  const colors = ['black', 'green', 'white'];

  // Các kích thước có thể chọn
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Mảng các ảnh cho sản phẩm
  const images = [
    'https://i.pinimg.com/enabled_lo/564x/40/02/ea/4002ea5daa3a5c00ebe97e5166ff4aed.jpg',
    'https://i.pinimg.com/enabled_lo/564x/e9/d2/3e/e9d23e3725c17988c1928d124411ac43.jpg',
    'https://i.pinimg.com/enabled_lo/564x/40/02/ea/4002ea5daa3a5c00ebe97e5166ff4aed.jpg',
    'https://i.pinimg.com/enabled_lo/564x/e9/d2/3e/e9d23e3725c17988c1928d124411ac43.jpg',
  ];

  // Hàm để chuyển đến ảnh tiếp theo
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Hàm để quay về ảnh trước đó
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Hàm chọn ảnh từ các ảnh thu nhỏ
  const handleSelectImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Hàm để chuyển tab nội dung
  const renderContent = () => {
    switch (selectedTab) {
      case 'description':
        return (
          <div>
            <p>
              Áo thun cotton cao cấp, thiết kế đơn giản nhưng hiện đại với form dáng vừa vặn,
              mang lại sự thoải mái tối đa cho người mặc. Chất liệu mềm mại, thoáng mát, phù hợp
              cho mọi hoạt động hàng ngày. Màu sắc đa dạng, dễ dàng phối hợp với nhiều trang phục khác.
            </p>
            <ul className="list-disc pl-5 mt-3">
              <li>Chất Liệu: Vải</li>
              <li>Màu Sắc: Xanh Quân Đội</li>
              <li>Kiểu Mẫu: Áo Tay Ngắn</li>
            </ul>
          </div>
        );
      case 'reviews':
        return <p>Hiển thị 20 đánh giá về sản phẩm...</p>;
      case 'shop-info':
        return <p>Thông tin về shop bán hàng...</p>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phần ảnh sản phẩm */}
        <div className="flex flex-col items-center relative">
          {/* Nút Previous */}
          <button
            onClick={handlePreviousImage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            <FaChevronLeft />
          </button>

          {/* Ảnh chính với độ cao cố định */}
          <div className="w-full md:w-4/5 lg:w-3/5 mb-4 h-[500px]">
            <img
              src={images[currentImageIndex]}
              alt="Product"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Nút Next */}
          <button
            onClick={handleNextImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            <FaChevronRight />
          </button>

          {/* Các ảnh nhỏ bên dưới */}
          <div className="flex gap-2 mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Product Thumbnail"
                className={`w-16 h-20 object-cover cursor-pointer ${currentImageIndex === index ? 'opacity-100 border-2 border-yellow-500' : 'opacity-50'}`}
                onClick={() => handleSelectImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Phần thông tin sản phẩm */}
        <div className="flex flex-col justify-start">
          {/* Tên sản phẩm */}
          <h2 className="text-2xl font-bold mb-2">Đầm màu trắng đen dài dự tiệc sang trọng</h2>

          {/* Giá sản phẩm */}
          <div className="flex items-center mb-4">
            <span className="text-red-500 text-2xl font-bold mr-4">99.000đ</span>
            <span className="line-through text-gray-500 text-lg">210.000đ</span>
            <span className="bg-yellow-400 text-black px-2 py-1 rounded ml-4">-53%</span>
          </div>

          {/* Màu sắc */}
          <div className="mb-4">
            <p className="font-semibold">Màu sắc: {selectedColor}</p>
            <div className="flex items-center gap-3 mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'ring-2 ring-yellow-500' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Kích thước */}
          <div className="mb-4">
            <p className="font-semibold">Kích thước:</p>
            <div className="flex items-center gap-3 mt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded ${selectedSize === size ? 'bg-gray-300' : 'bg-white'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Ngày dự kiến */}
          <div className="mb-4">
            <p className="font-semibold">Ngày giao hàng dự kiến:</p>
            <input
              type="text"
              className="border p-2 rounded mt-2 w-full max-w-[200px]"
              value="10/09/2024"
              readOnly
            />
          </div>

          {/* Nút Add to Cart và Add to WishList */}
          <div className="flex gap-4 mt-6">
            <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded">
              <FaCartPlus />
              Add To Cart
            </button>
            <button className="flex items-center gap-2 border-2 border-yellow-400 text-yellow-500 px-6 py-3 rounded">
              <FaHeart />
              Add To WishList
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Miêu Tả, Đánh Giá, Thông Tin Shop */}
      <div className="flex border-b border-gray-300 mb-4 mt-6">
        <button
          className={`px-4 py-2 ${selectedTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
          onClick={() => setSelectedTab('description')}
        >
          Miêu Tả
        </button>
        <button
          className={`px-4 py-2 ${selectedTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
          onClick={() => setSelectedTab('reviews')}
        >
          Đánh Giá (20)
        </button>
        <button
          className={`px-4 py-2 ${selectedTab === 'shop-info' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
          onClick={() => setSelectedTab('shop-info')}
        >
          Thông Tin Shop
        </button>
      </div>

      {/* Nội dung hiển thị theo tab được chọn */}
      <div className="mb-8">{renderContent()}</div>

      {/* Danh sách sản phẩm khác */}
      <h2 className="text-2xl font-bold mb-4">Những Sản Phẩm Khác</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array(4).fill(null).map((_, index) => (
          <div key={index} className="border rounded p-4 shadow-lg">
            <img
              src="https://via.placeholder.com/200x300.png?text=Sản+Phẩm"
              alt="Product"
              className="w-full h-60 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">Đầm Midi Organza tay lỡ xếp li màu hạt dẻ</h3>
            <div className="flex items-center mt-2">
              <span className="text-red-500 text-xl font-bold mr-2">120.000đ</span>
              <span className="line-through text-gray-500">240.000đ</span>
              <span className="ml-2 text-green-600">-53%</span>
            </div>
            <div className="mt-2 bg-yellow-400 text-white text-center py-1 rounded">
              Voucher giảm 50k
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span>4.9 ★</span>
              <span>Số lần thuê: 20</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
