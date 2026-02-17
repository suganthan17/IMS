import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Project Info */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">
            Infrastructure Management System
          </h2>
          <p className="text-sm text-gray-400">
            A smart platform to manage campus infrastructure, complaints,
            and maintenance operations efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">
              Dashboard
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Raise Complaint
            </li>
            <li className="hover:text-white cursor-pointer transition">
              My Complaints
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-md font-semibold text-white mb-3">
            Contact
          </h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Mail size={16} /> support@ims.com
            </p>
            <p className="flex items-center gap-2">
              <Github size={16} /> github.com/yourrepo
            </p>
            <p className="flex items-center gap-2">
              <Linkedin size={16} /> linkedin.com/in/yourprofile
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} IMS. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
