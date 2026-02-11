import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-slate-800 text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} University IMS. All rights reserved.</p>

        <p className="mt-1 md:mt-0 text-gray-400">
          Infrastructure Management System
        </p>
      </div>
    </footer>
  );
}

export default Footer;
