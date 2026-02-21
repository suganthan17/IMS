import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  Send,
  Instagram,
  ArrowLeft,
  LifeBuoy,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";
import AdminSidebar from "../../components/AdminSidebar";
import StaffSidebar from "../../components/StaffSidebar";

function Support() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const renderSidebar = () => {
    if (role === "admin") return <AdminSidebar />;
    if (role === "maintenance") return <StaffSidebar />;
    return <UserSidebar />;
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-slate-100">
        {renderSidebar()}

        <div className="flex-1 mt-14 px-6 md:px-10 py-8">
          {/* Page Title */}
          <h1 className="text-2xl font-semibold mb-6">
            Support & System Information
          </h1>

          {/* Card */}
          <div className="bg-white border border-slate-300 rounded-md shadow-sm overflow-hidden">
            {/* Header Bar */}
            <div className="bg-slate-600 text-white px-6 py-3 flex items-center gap-2">
              <LifeBuoy size={18} />
              <span className="font-medium">Support Center</span>
            </div>

            <div className="px-6 py-6 space-y-8">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition cursor-pointer"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              {/* System Overview */}
              <section>
                <h2 className="text-lg font-semibold mb-3">System Overview</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The Infrastructure Management System (IMS) is a role-based web
                  application designed to manage campus infrastructure
                  complaints and maintenance workflows efficiently. Users can
                  report issues, administrators assign staff, and maintenance
                  teams update resolution statuses in real time.
                </p>
              </section>

              {/* Key Features */}
              <section>
                <h2 className="text-lg font-semibold mb-3">Key Features</h2>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
                  <li>✔ Role-Based Authentication</li>
                  <li>✔ Complaint Tracking System</li>
                  <li>✔ Staff Assignment Management</li>
                  <li>✔ Email Notifications</li>
                  <li>✔ Real-Time Status Updates</li>
                  <li>✔ Secure JWT Authentication</li>
                </ul>
              </section>

              {/* Contact Section */}
              <section>
                <h2 className="text-lg font-semibold mb-3">
                  Contact & Developer Links
                </h2>

                <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                  <a
                    href="mailto:support@ims.com"
                    className="flex items-center gap-2 hover:text-red-500 transition"
                  >
                    <Mail size={18} /> Email
                  </a>

                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-black transition"
                  >
                    <Github size={18} /> GitHub
                  </a>

                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <Linkedin size={18} /> LinkedIn
                  </a>

                  <a
                    href="https://wa.me/91XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-green-500 transition"
                  >
                    <MessageCircle size={18} /> WhatsApp
                  </a>

                  <a
                    href="https://t.me/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-sky-500 transition"
                  >
                    <Send size={18} /> Telegram
                  </a>

                  <a
                    href="https://instagram.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-pink-500 transition"
                  >
                    <Instagram size={18} /> Instagram
                  </a>
                </div>
              </section>

              {/* Footer Info */}
              <section className="border-t pt-6 text-sm text-slate-500 text-center">
                <p>Version: v1.0.0</p>
                <p>Developed as Academic Project</p>
                <p>
                  © {new Date().getFullYear()} Infrastructure Management System
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Support;
