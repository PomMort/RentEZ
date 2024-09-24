import { faComment, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Aboutus() {
  return (
    <>
      <div className="flex flex-col items-center py-12 bg-white">
        {/* Tiêu đề liên hệ */}
        <h2 className="text-black text-lg font-semibold">CONTACT</h2>
        {/* Dòng chữ We're here to help */}
        <h1 className="text-4xl font-bold text-[#FFD700] mt-2">
          We're here to help
        </h1>
        {/* Thanh tìm kiếm */}
        <div className="flex mt-6">
          <input
            type="text"
            placeholder="What can we have you with?"
            className="px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none bg-[#D9D9D9] text-gray-700 w-[26rem]"
          />
          <button className="bg-gray-300 px-4 py-2 rounded-r-full">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src="/image/banner.png"
          className="w-full max-h-[500px] object-cover"
          alt="banner"
        />
      </div>
      <div className="flex flex-col items-center py-12 bg-white">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-3xl">How Can I Contact RentEZ?</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faComment} className="text-4xl mb-4" />
            <h3 className="font-semibold">Chat With Us</h3>
            <p>5:00 - 23:00</p>
            <p> 7 days a Week</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faPhone} className="text-4xl mb-4" />
            <h3 className="font-semibold">Call us</h3>
            <p className="font-bold">12280903 (Viettel)</p>
            <p>05:00 - 23:00</p>
            <p>7 days a week</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-4xl mb-4" />
            <h3 className="font-semibold">Call us</h3>
            <p className="font-bold">rentez@gmail.com</p>
          </div>
        </div>
        <div className="flex justify-center items-center py-12 bg-white">
          <div className="bg-[#ffd154] p-8 rounded-md shadow-md w-[400px]">
            <h2 className="text-xl font-bold text-black mb-6 text-center">
              Contact Us
            </h2>
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 rounded-md bg-[#E8E6E6] focus:outline-none text-black"
              />
              <input
                type="text"
                placeholder="Your Email"
                className="px-4 py-2 rounded-md bg-[#E8E6E6] focus:outline-none text-black"
              />
              <textarea
                placeholder="Your message"
                rows="4"
                className="px-4 py-2 rounded-md bg-[#E8E6E6] focus:outline-none text-black"
              ></textarea>
              <button
                type="submit"
                className="bg-black w-[225px] self-center text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
