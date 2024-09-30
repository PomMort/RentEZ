import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 grid justify-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-[6rem] px-4">
       
        <div>
          <h3 className="font-bold text-lg mb-4">Customer care</h3>
          <ul className="space-y-2 font-text">
            <li>Help Center</li>
            <li>RentEZ Blog</li>
            <li>Renting Guide</li>
            <li>Rental Guide</li>
            <li>Payment</li>
            <li>Shipping</li>
            <li>Returns & Refunds</li>
            <li>Contact RentEZ</li>
            <li>Warranty Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">About RentEZ</h3>
          <ul className="space-y-2 font-text">
            <li>About us</li>
            <li>RentEZ Terms</li>
            <li>Privacy Policy</li>
            <li>Seller Channel</li>
            <li>Events & Promotions</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 font-text">Payment</h3>
          <div className="flex space-x-4">
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/16/Former_Visa_%28company%29_logo.svg' alt='visa'  className='w-[3rem]'/>
            <img src='https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png' alt='momo' className='w-[3rem]'/>
            <img src='https://www.svgrepo.com/show/42266/credit-card.svg' alt='banking' className='w-[3rem]'/>
          </div>
          <h3 className="font-bold text-lg mb-4 mt-4 font-text">Shipping</h3>
          <div className="flex space-x-4">
            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Orange.png" alt="GHN" className="w-[3rem] h-[3rem]" />
            <img src="https://cdn.prod.website-files.com/5fb85f26f126ce08d792d2d9/65fddafcf36551945213fe85_After_kime.jpg" alt="Grab" className="w-[3rem] h-[3rem]" />
            <img src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-9/110243921_2772823466286085_1837082738370199622_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=GiI0aH3XzBEQ7kNvgHauIGc&_nc_ht=scontent.fsgn5-12.fna&oh=00_AYB90ntFgXZIsKvv54G-pzzub7_AUHZ-SC3xzucg4JrXyw&oe=6719E049" alt="J&T" className="w-[3rem] h-[3rem]" />
          </div>
        </div>

        
        <div>
          <h3 className="font-bold text-lg mb-4 font-text">Follow us on</h3>
          <div className="flex space-x-4">
            <FontAwesomeIcon icon={faFacebook} className="text-3xl" />
            <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
            <FontAwesomeIcon icon={faTiktok} className="text-3xl" />
          </div>
          <h3 className="font-bold text-lg mt-6 font-text">Download app</h3>
          <div className="flex flex-col-reverse space-x-4 mt-2">
            <div className='mt-1'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className="w-24 mb-2" />
            <img src="image/google-play-android-app-logo.png" alt="Google Play" className="w-24" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
