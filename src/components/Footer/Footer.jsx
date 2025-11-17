import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-pink-900 text-gray-300 py-10 px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Logo & Website Name */}
        <div>
          <div className="flex items-center space-x-2">
             <span className="text-3xl">💰</span>
            <h2 className="text-2xl font-semibold text-green-500">FinEase</h2>
          </div>
          <p className="mt-3 text-sm text-gray-100">
          Simplifying your finances with smart tools and insights,
           empowering you to make confident decisions every day.
          </p>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-600 mb-3">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:support@finEase.com"
              className="text-blue-400 hover:text-blue-500"
            >
              support@finEase.com
            </a>
          </p>
          <p>Phone: +880 1700-123456</p>
          <p>Sylhet, Bangladesh</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-yellow-600 mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-400">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-600 mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="text-blue-500 hover:text-blue-700">
            <FaFacebookF></FaFacebookF>
            </a>
            <a href="#" className="text-white hover:text-black">
            <FaXTwitter></FaXTwitter>
            </a>
            <a href="#" className="text-white hover:text-pink-500">
              <FaInstagram></FaInstagram>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              <FaLinkedinIn></FaLinkedinIn>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center 
      text-sm text-gray-200">
        © 2025 FinEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
