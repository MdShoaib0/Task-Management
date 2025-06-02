import React from 'react';

function Footer() {
  return (
    <footer className="text-black py-0">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">Task Manager</h2>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Center section */}
        <div className="text-sm text-gray-400 hidden md:block">
          Built with 💻 React & Tailwind CSS
        </div>

        {/* Right section */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300 transition duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition duration-300">Terms</a>
          <a href="#" className="hover:text-gray-300 transition duration-300">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
