import React, { useState } from 'react';

// Fake data sản phẩm trong giỏ hàng
const fakeCartData = [
  {
    shop: 'Shop ABC',
    products: [
      {
        id: 1,
        name: 'Đầm Midi Organza tay lỡ xếp li màu hạt dẻ',
        size: 'M',
        price: 120000,
        quantity: 1,
        img: 'https://i.pinimg.com/originals/40/02/ea/4002ea5daa3a5c00ebe97e5166ff4aed.jpg',
        date: '10/09/2024',
        selected: false, // Trạng thái chọn của sản phẩm
      },
      {
        id: 2,
        name: 'Đầm Midi Organza tay lỡ xếp li màu hạt dẻ',
        size: 'L',
        price: 120000,
        quantity: 1,
        img: 'https://i.pinimg.com/originals/40/02/ea/4002ea5daa3a5c00ebe97e5166ff4aed.jpg',
        date: '10/09/2024',
        selected: false, // Trạng thái chọn của sản phẩm
      },
    ],
  },
  {
    shop: 'Shop XYZ',
    products: [
      {
        id: 3,
        name: 'Đầm Midi Organza tay lỡ xếp li màu hạt dẻ',
        size: 'M',
        price: 120000,
        quantity: 1,
        img: 'https://i.pinimg.com/originals/40/02/ea/4002ea5daa3a5c00ebe97e5166ff4aed.jpg',
        date: '10/09/2024',
        selected: false, // Trạng thái chọn của sản phẩm
      },
      {
        id: 4,
        name: 'Đầm Midi Organza tay lỡ xếp li màu hạt dẻ',
        size: 'L',
        price: 120000,
        quantity: 1,
        img: 'https://i.pinimg.com/originals/40/02/ea/4002ea5daa3a5c00ebe97e5166ff4aed.jpg',
        date: '10/09/2024',
        selected: false, // Trạng thái chọn của sản phẩm
      },
    ],
  },
];

const Cart = () => {
  const [cartData, setCartData] = useState(fakeCartData);

  // Hàm để cập nhật số lượng sản phẩm
  const updateQuantity = (shopIndex, productIndex, delta) => {
    const newCartData = [...cartData];
    newCartData[shopIndex].products[productIndex].quantity += delta;
    setCartData(newCartData);
  };

  // Hàm chọn hoặc bỏ chọn tất cả sản phẩm trong một shop
  const toggleSelectAllInShop = (shopIndex, selected) => {
    const newCartData = [...cartData];
    newCartData[shopIndex].products = newCartData[shopIndex].products.map(product => ({
      ...product,
      selected: selected,
    }));
    setCartData(newCartData);
  };

  // Hàm chọn/bỏ chọn từng sản phẩm
  const toggleSelectProduct = (shopIndex, productIndex) => {
    const newCartData = [...cartData];
    newCartData[shopIndex].products[productIndex].selected =
      !newCartData[shopIndex].products[productIndex].selected;
    setCartData(newCartData);
  };

  // Hàm tính tổng tiền
  const calculateTotal = () => {
    return cartData.reduce((total, shop) => {
      return (
        total +
        shop.products.reduce((shopTotal, product) => {
          return product.selected ? shopTotal + product.price * product.quantity : shopTotal;
        }, 0)
      );
    }, 0);
  };

  return (
    <div className="container mx-auto p-6 bg-white">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="border-b py-3">Sản phẩm</th>
            <th className="border-b py-3">Đơn giá</th>
            <th className="border-b py-3">Số lượng</th>
            <th className="border-b py-3">Số tiền</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((shop, shopIndex) => {
            // Kiểm tra xem tất cả các sản phẩm trong shop có được chọn hay không
            const allSelected = shop.products.every(product => product.selected);

            return (
              <React.Fragment key={shopIndex}>
                <tr>
                  <td colSpan="4" className="bg-[#f5f5f5] py-2 font-bold">
                    <label className="inline-flex items-center ml-[20px]">
                      {/* Checkbox tùy chỉnh */}
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={e => toggleSelectAllInShop(shopIndex, e.target.checked)}
                        className="h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
                      />
                      <div className='bg-yellow-400 p-2 border-r-2 ml-2'>
                      Yêu thích + 
                      </div>
                        <p className='ml-2'> {shop.shop}</p>
                    </label>
                  </td>
                </tr>
                {shop.products.map((product, productIndex) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-4 flex items-center">
                      {/* Checkbox tùy chỉnh cho từng sản phẩm */}
                      <input
                        type="checkbox"
                        checked={product.selected}
                        onChange={() => toggleSelectProduct(shopIndex, productIndex)}
                        className="h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400 mr-4"
                      />
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <p className="font-bold">{product.name}</p>
                        <p className="text-gray-500">Phân loại: {product.size}</p>
                        <p className="text-gray-500">Ngày giao hàng: {product.date}</p>
                      </div>
                    </td>
                    <td>{product.price.toLocaleString()}đ</td>
                    <td>
                      <div className="flex items-center">
                        <button
                          className="px-2 py-1 border"
                          onClick={() => updateQuantity(shopIndex, productIndex, -1)}
                          disabled={product.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4">{product.quantity}</span>
                        <button
                          className="px-2 py-1 border"
                          onClick={() => updateQuantity(shopIndex, productIndex, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="font-bold text-red-500">
                      {(product.price * product.quantity).toLocaleString()}đ
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between items-center">
        <button className="bg-red-500 text-white px-4 py-2 rounded">Xóa sản phẩm không hoạt động</button>
        <div className="flex items-center">
          <span className="mr-4 text-xl font-bold">Tổng thanh toán: {calculateTotal().toLocaleString()}đ</span>
          <button className="bg-yellow-400 text-white px-6 py-3 rounded hover:bg-yellow-500">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
