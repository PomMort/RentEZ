import React from "react";

export default function Blog() {
  return (
    <div className="bg-gray-100">
      {/* Header Section */}
      <header className="h-[30rem] text-center shadow-md relative">
        <img src="/image/banner2.png" alt="fashion" className="h-full w-full" />
      </header>

      {/* Introduction Section */}
      <section className="bg-white text-center py-10">
        <p className="text-lg font-bold text-black max-w-3xl mx-auto px-4 font-text">
          Được thành lập vào năm 2024, RentEZ Group là một trong những nền tảng thương mại điện tử cho thuê đầu tiên của Việt Nam. Có mặt tại Thành phố Hồ Chí Minh và Hà Nội – chúng tôi kết nối khu vực rộng lớn và đa dạng này thông qua công nghệ, hậu cần và khả năng thanh toán của mình. Đến năm 2030, chúng tôi đặt mục tiêu phục vụ 1 triệu khách hàng.
        </p>
      </section>

      {/* Core Pillars Section */}
      <section className="bg-gray-100 pt-6">
        <div className="text-center mb-8 bg-gradient-to-r from-yellowCustom to-brownCustom w-[30rem] p-5 ml-[8rem]">
          <h2 className="text-3xl font-bold text-white font-text">
            TRỤ CỘT CỐT LÕI CỦA CHÚNG TÔI
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3">
          {/* Logistics Pillar */}
          <div className="bg-yellow-300 p-6 shadow-lg relative w-full font-text">
            <h3 className="text-xl font-bold text-gray-800">Hậu cần</h3>
            <h4 className="text-2xl font-bold text-gray-800 mt-2">
              CHÚNG TÔI ĐÃ ĐẾN ĐÓ
            </h4>
            <p className="text-gray-700 mt-4">
              Với khả năng hậu cần toàn diện và kiểm soát hoàn toàn chuỗi cung ứng của chúng tôi, hầu như bất kỳ sản phẩm nào cũng chỉ cách bạn một cú nhấp chuột. Chúng tôi có các trung tâm hoàn thiện đơn hàng tại 2 thành phố ở Việt Nam và khoản đầu tư của chúng tôi vào kho bãi, trung tâm phân loại và công nghệ số bổ sung cho mạng lưới đối tác và các thỏa thuận xuyên biên giới và chặng cuối của chúng tôi trong mỗi lĩnh vực này.
            </p>
            <span className="absolute text-[10rem] font-bold text-black opacity-10 right-4 bottom-0">
              1
            </span>
          </div>

          {/* Technology Pillar */}
          <div className="bg-yellow-100 p-6 shadow-lg relative w-full font-text">
            <h3 className="text-xl font-bold text-gray-800">Công nghệ</h3>
            <h4 className="text-2xl font-bold text-gray-800 mt-2">
              MỘT CÁCH MUA SẮM THÔNG MINH HƠN
            </h4>
            <p className="text-gray-700 mt-4">
              Tại RentEZ, chúng tôi khai thác cả công nghệ hiện có và mới nổi để định nghĩa lại dịch vụ cho thuê bán lẻ. Tận dụng dữ liệu theo thời gian thực cho phép chúng tôi nhanh chóng thích ứng với nhu cầu và điều kiện thay đổi. Chúng tôi kết nối người tiêu dùng với các thương hiệu, tạo ra trải nghiệm tùy chỉnh và đã phát triển thành một địa điểm cho thuê bán lẻ mà khách hàng đến để thuê. Và chúng tôi tiếp tục mở rộng ranh giới.
            </p>
            <span className="absolute text-[10rem] font-bold text-black opacity-10 right-4 bottom-0">
              2
            </span>
          </div>

          {/* Payments Pillar */}
          <div className="bg-yellow-500 p-6 shadow-lg relative w-full font-text">
            <h3 className="text-xl font-bold text-gray-800">Thanh toán</h3>
            <h4 className="text-2xl font-bold text-gray-800 mt-2">
              AN TOÀN, LIỀN MẠCH
            </h4>
            <p className="text-gray-700 mt-4">
              Đảm bảo các giao dịch an toàn và liền mạch hướng dẫn sự phát triển của cơ sở hạ tầng dịch vụ tài chính và thanh toán an toàn nhất của Việt Nam. Trong một khu vực vẫn đang ở các giai đoạn khác nhau của việc áp dụng thanh toán điện tử và thương mại điện tử, chúng tôi đã phát triển một bộ tùy chọn đáp ứng các sở thích hiện tại đồng thời giúp khách hàng dễ dàng thanh toán kỹ thuật số thông qua các giải pháp trực quan mà họ có thể tin tưởng.
            </p>
            <span className="absolute text-[10rem] font-bold text-black opacity-10 right-4 bottom-0">
              3
            </span>
          </div>
        </div>
      </section>
      <div className="w-full bg-white grid grid-cols-1 md:grid-cols-2 gap-4 relative h-[20rem]">
        {/* Cột Hình Ảnh */}
        <div className="bg-white h-[20rem] flex items-center justify-center">
          {/* Đây là chỗ để hình ảnh */}
          <img src="image/fashion.jpg" className="w-[33rem] h-[18rem] absolute left-[16%] " alt="fashion" />
        </div>

        {/* Cột Văn Bản */}
        <div className="bg-black text-white p-8 font-text">
          <span className="inline-block bg-yellow-400 text-black px-4 py-2 mb-4 font-bold">
            CÔNG VIỆC KINH DOANH CỦA CHÚNG TÔI
          </span>
          <h3 className="text-2xl font-bold mb-4">RENTEZ</h3>
          <p className="text-lg">
            Ra mắt trên nền tảng RentEZ vào năm 2024, nền tảng này đặt ra một tiêu chuẩn mới về cho thuê, cung cấp cho người tiêu dùng sự đảm bảo về tính xác thực 100% của sản phẩm, đảm bảo giao hàng nhanh chóng và chính sách trả hàng trong vòng 15 ngày. RentEZ là nền tảng được các thương hiệu và người bán ưa chuộng để tương tác trực tiếp và tạo ra trải nghiệm tùy chỉnh cho khách hàng của họ.
          </p>
        </div>
      </div>
    </div>
  );
}
