import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import DefaultContainer from "./DefaultContainer";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <DefaultContainer>
        <div className=" mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-bold">Follow Us</h2>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          <div className="text-center mb-6 md:mb-0">
            <p>
              &copy; {new Date().getFullYear()} Car Rental. All rights
              reserved.
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
            <a href="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-gray-400">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact Us
            </a>
          </div>
        </div>
      </DefaultContainer>
    </footer>
  );
};

export default Footer;
