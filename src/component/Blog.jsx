import React from "react";

export default function Blog() {
  return (
    <div className="bg-gray-100">
      {/* Header Section */}
      <header className="bg-[#d9d9d9] h-[20rem] text-center py-10 shadow-md relative">
        <div className="bg-black absolute right-[36%] bottom-[10%] w-[25rem] p-6 tracking-[0.25rem]">
          <h1 className="text-4xl font-bold text-white mb-2 font-text">
            RENTEZ
          </h1>
          <h1 className="text-4xl text-white font-text">RENTING EASY</h1>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="bg-white text-center py-10">
        <p className="text-lg text-black max-w-3xl mx-auto px-4 font-text text-justify">
          Founded in 2024, RentEZ Group is one of Vietnam’s first rental
          e-commerce platforms. With a presence in Ho Chi Minh City and Hanoi –
          we connect this vast and diverse region through our technology,
          logistics, and payment capabilities. By 2030, we aim to serve 1
          million customers.
        </p>
      </section>

      {/* Core Pillars Section */}
      <section className="bg-gray-100 pt-6">
        <div className="text-center mb-8 bg-gradient-to-r from-yellowCustom to-brownCustom w-[30rem] p-5 ml-[8rem]">
          <h2 className="text-3xl font-bold text-white font-text">
            OUR CORE PILLARS
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3">
          {/* Logistics Pillar */}
          <div className="bg-yellow-300 p-6 shadow-lg relative w-full font-text">
            <h3 className="text-xl font-bold text-gray-800">Logistics</h3>
            <h4 className="text-2xl font-bold text-gray-800 mt-2">
              WE GET IT THERE
            </h4>
            <p className="text-gray-700 mt-4">
              With end-to-end logistics capabilities and complete control over
              our supply chain, virtually any product is a click away. We have
              fulfillment centers across 2 cities in Vietnam and our investment
              in warehouses, sorting centers, and digital technologies
              complement our partner network and our cross-border and last mile
              arrangements in each these.
            </p>
            <span className="absolute text-[10rem] font-bold text-black opacity-10 right-4 bottom-0">
              1
            </span>
          </div>

          {/* Technology Pillar */}
          <div className="bg-yellow-100 p-6 shadow-lg relative w-full font-text">
            <h3 className="text-xl font-bold text-gray-800">Technology</h3>
            <h4 className="text-2xl font-bold text-gray-800 mt-2">
              A SMARTER WAY TO SHOP
            </h4>
            <p className="text-gray-700 mt-4">
              At RentEZ, we harness both existing and emerging technologies to
              redefine the retail rental. Leveraging data in real time allows us
              to quickly adapt to changing demands and conditions. We connect
              consumers to brands, create customized experiences, and have
              evolved into a retail rental location that customers come to rent.
              And we continue to push the boundaries.
            </p>
            <span className="absolute text-[10rem] font-bold text-black opacity-10 right-4 bottom-0">
              2
            </span>
          </div>

          {/* Payments Pillar */}
          <div className="bg-yellow-500 p-6 shadow-lg relative w-full font-text">
            <h3 className="text-xl font-bold text-gray-800">Payments</h3>
            <h4 className="text-2xl font-bold text-gray-800 mt-2">
              SAFE, SEAMLESS
            </h4>
            <p className="text-gray-700 mt-4">
              Ensuring secure and seamless transactions guides the development
              of Vietnam’s most secure payments and financial services
              infrastructure. In a region still at varying stages of e-payment
              and eCommerce adoption, we’ve evolved a suite of options that
              cater to existing preferences while easing customers into digital
              payments through intuitive solutions they can trust.
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
          <img src="image/fashion.jpg" className="w-[33rem] h-[18rem] absolute left-[16%] " alt="fashion"/>
        </div>

        {/* Cột Văn Bản */}
        <div className="bg-black text-white p-8 font-text">
          <span className="inline-block bg-yellow-400 text-black px-4 py-2 mb-4 font-bold">
            OUR BUSINESS
          </span>
          <h3 className="text-2xl font-bold mb-4">RENTEZ</h3>
          <p className="text-lg">
            Launched on the RentEZ platform in 2024, it sets a new standard in
            rental, offering consumers the assurance of 100% product
            authenticity, guaranteed fast delivery and a 15-day return policy.
            RentEZ is the preferred platform for brands and sellers to directly
            engage and create a customised experience for their customers.
          </p>
        </div>
      </div>
    </div>
  );
}
