import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Linkedin,
  MessageCircle,
  Send,
  Instagram,
  ArrowLeft,
} from "lucide-react";

import Navbar from "./Navbar";
import UserSidebar from "./UserSidebar";
import AdminSidebar from "./AdminSidebar";
import StaffSidebar from "./StaffSidebar";

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

      <div className="min-h-screen bg-gray-100">
        {renderSidebar()}

        <div className="mt-14 md:ml-52 px-6 md:px-12 py-5">
          <div className="flex items-center gap-3 mb-10">
            <h1 className="text-xl font-semibold text-slate-800">
              Support Center
            </h1>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition cursor-pointer mb-3"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* Content */}
          <div className="max-w-4xl space-y-12">
            {/* System Overview */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                System Overview
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Infrastructure monitoring System (IMS) is a role-based web
                application built to manage campus infrastructure complaints
                efficiently. Users report issues, administrators assign tasks,
                and maintenance teams update resolution statuses in real time.
              </p>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                How It Works
              </h2>

              <div className="grid md:grid-cols-2 gap-4 text-slate-600">
                <div className="p-4 rounded-lg bg-slate-200/60 hover:bg-slate-300/60 transition">
                  <span className="font-semibold text-slate-800">01.</span> User
                  Raises Complaint
                  <p className="text-sm mt-1 text-slate-600">
                    Users submit issues with category, location, and
                    description.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-200/60 hover:bg-slate-300/60 transition">
                  <span className="font-semibold text-slate-800">02.</span>{" "}
                  Admin Reviews Issue
                  <p className="text-sm mt-1 text-slate-600">
                    Administrator verifies and assigns the complaint to
                    maintenance staff.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-200/60 hover:bg-slate-300/60 transition">
                  <span className="font-semibold text-slate-800">03.</span>{" "}
                  Staff Handles Task
                  <p className="text-sm mt-1 text-slate-600">
                    Maintenance team works on the issue and updates status.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-200/60 hover:bg-slate-300/60 transition">
                  <span className="font-semibold text-slate-800">04.</span>{" "}
                  Issue Resolved
                  <p className="text-sm mt-1 text-slate-600">
                    Complaint is marked resolved and user is notified.
                  </p>
                </div>
              </div>
            </section>

            {/* Social Links */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Connect
              </h2>

              <div className="flex gap-6">
                <a
                  href="https://github.com/suganthan17"
                  className="p-4 rounded-full bg-slate-200 hover:bg-gradient-to-r hover:from-gray-700 hover:to-black transition duration-300 group"
                >
                  <Github
                    size={22}
                    className="text-slate-700 group-hover:text-white"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/suganthan-s-v-63308b321/"
                  className="p-4 rounded-full bg-slate-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition duration-300 group"
                >
                  <Linkedin
                    size={22}
                    className="text-slate-700 group-hover:text-white"
                  />
                </a>

                <a
                  href="https://wa.me/916383405402"
                  className="p-4 rounded-full bg-slate-200 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 transition duration-300 group"
                >
                  <MessageCircle
                    size={22}
                    className="text-slate-700 group-hover:text-white"
                  />
                </a>

                <a
                  href="https://t.me/Suganthan_SV"
                  className="p-4 rounded-full bg-slate-200 hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-600 transition duration-300 group"
                >
                  <Send
                    size={22}
                    className="text-slate-700 group-hover:text-white"
                  />
                </a>

                <a
                  href="https://www.instagram.com/suganthan_sv17/"
                  className="p-4 rounded-full bg-slate-200 hover:bg-gradient-to-r hover:from-pink-400 hover:to-pink-600 transition duration-300 group"
                >
                  <Instagram
                    size={22}
                    className="text-slate-700 group-hover:text-white"
                  />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Support;
