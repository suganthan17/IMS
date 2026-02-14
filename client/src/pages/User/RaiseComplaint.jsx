import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";
import { PencilLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RaiseComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    summary: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/complaints/raise",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Complaint submitted successfully!");

        setFormData({
          category: "",
          summary: "",
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message || "Failed to submit complaint");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <UserSidebar />

      <div className="ml-56 mt-14 p-6 min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold mb-4">Raise a Complaint</h1>

        <div className="bg-white border border-slate-500 rounded-sm mt-5 max-w-6xl">
          <div className="bg-slate-500 text-white px-4 py-2 font-medium">
            <PencilLine className="inline-block mr-2" size={20} />
            Enter Issue Details
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 border-t">
              <div className="bg-gray-100 px-4 py-3 font-medium md:border-r border-b border-gray-300">
                Category
              </div>
              <div className="md:col-span-3 px-4 py-3 border-b border-gray-300">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-64 border border-gray-400 px-2 py-1 text-sm"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Lighting Issues">Lighting Issues</option>
                  <option value="Smart Classroom">
                    Smart Classroom / Projector
                  </option>
                  <option value="WiFi">Wi-Fi Connectivity</option>
                  <option value="HVAC">HVAC / Air Conditioning</option>
                  <option value="Power Backup">Power Backup</option>
                  <option value="Lift">Lift / Elevator</option>
                  <option value="Doors">Doors / Windows</option>
                  <option value="Instruments">Instrument Calibration</option>
                  <option value="Building">Building Damage</option>
                  <option value="Library">Book Availability</option>
                  <option value="Washroom">Washroom Maintenance</option>
                  <option value="Hostel">Hostel Sanitation</option>
                  <option value="Waste">Waste Management</option>
                  <option value="Transport">University Transport</option>
                  <option value="Parking">Parking Issues</option>
                  <option value="Noise">Noise Issues</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="bg-gray-100 px-4 py-3 font-medium md:border-r border-b border-gray-300">
                Summary
              </div>
              <div className="md:col-span-3 px-4 py-3 border-b border-gray-300">
                <input
                  type="text"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full border border-gray-400 px-2 py-1 text-sm"
                  required
                />
              </div>

              <div className="bg-gray-100 px-4 py-3 font-medium md:border-r border-b border-gray-300">
                Location
              </div>
              <div className="md:col-span-3 px-4 py-3 border-b border-gray-300">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Block / Building / Room No"
                  className="w-full border border-gray-400 px-2 py-1 text-sm"
                  required
                />
              </div>

              <div className="bg-gray-100 px-4 py-3 font-medium md:border-r border-gray-300">
                Description
              </div>
              <div className="md:col-span-3 px-4 py-3">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border border-gray-400 px-2 py-1 text-sm resize-none"
                  required
                />
              </div>
            </div>

            <div className="px-4 py-4 border-t border-gray-300 bg-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 border cursor-pointer border-slate-500 text-slate-600 text-sm rounded hover:bg-slate-300 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Issue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RaiseComplaint;
