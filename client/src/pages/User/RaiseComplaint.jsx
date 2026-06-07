import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import UserSidebar from "../../components/UserSidebar";
import { PencilLine, Trash2, WandSparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function RaiseComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    summary: "",
    location: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
      const dataToSend = new FormData();
      dataToSend.append("category", formData.category);
      dataToSend.append("summary", formData.summary);
      dataToSend.append("location", formData.location);
      dataToSend.append("description", formData.description);

      if (image) {
        dataToSend.append("image", image);
      }

      const response = await fetch(`${API_URL}/api/complaints/raise`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: dataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Complaint submitted successfully!");
        setFormData({
          category: "",
          summary: "",
          location: "",
          description: "",
        });
        setImage(null);
        setPreview(null);
      } else {
        toast.error(data.message || "Failed to submit complaint");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.", error);
    } finally {
      setLoading(false);
    }
  };

  const generateWithAI = async () => {
    if (!formData.category) {
      toast.error("Please select category and fill the location first");
      return;
    }

    try {
      setAiLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/ai/suggest-complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: formData.category,
          location: formData.location,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          summary: data.suggestion.summary,
          description: data.suggestion.description,
        }));

        toast.success("AI suggestion generated");
      } else {
        toast.error("AI generation failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <UserSidebar />

      {/* Responsive Wrapper */}
      <div className="mt-14 p-4 sm:p-6 min-h-screen bg-gray-100 md:ml-56">
        <h1 className="text-xl font-bold mb-4">Raise a Complaint</h1>

        <div className="bg-white border border-slate-500 rounded-sm mt-5 max-w-6xl w-full overflow-x-auto">
          <div className="bg-slate-500 text-white px-4 py-2 font-medium">
            <PencilLine className="inline-block mr-2" size={20} />
            Enter Issue Details
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 border-t">
              {/* Category */}
              <div className="bg-gray-100 px-4 py-3 font-medium md:border-r border-b border-gray-300">
                Category
              </div>
              <div className="md:col-span-3 px-4 py-3 border-b border-gray-300">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full sm:w-64 border border-gray-400 px-2 py-1 text-sm"
                    required
                  >
                    <option value="Electrical">Electrical</option>

                    <option value="IT & Network">IT & Network</option>

                    <option value="Civil & Building">Civil & Building</option>

                    <option value="Water & Sanitation">
                      Water & Sanitation
                    </option>

                    <option value="HVAC & Utilities">HVAC & Utilities</option>

                    <option value="Laboratory & Equipment">
                      Laboratory & Equipment
                    </option>

                    <option value="Campus Facilities">Campus Facilities</option>

                    <option value="Safety & Environment">
                      Safety & Environment
                    </option>

                    <option value="Others">Others</option>
                  </select>

                  <button
                    type="button"
                    onClick={generateWithAI}
                    disabled={aiLoading}
                    title="Generate with AI"
                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded transition ${
                      aiLoading
                        ? "bg-slate-400 text-white cursor-not-allowed"
                        : "bg-yellow-400 text-black hover:bg-slate-800 cursor-pointer hover:text-white"
                    }`}
                  >
                    {aiLoading ? (
                      "Generating..."
                    ) : (
                      <>
                        <WandSparkles size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gray-100 px-4 py-3 font-medium md:border-r border-b border-gray-300">
                Location
              </div>
              <div className="md:col-span-3 px-4 py-3 border-b border-gray-300">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-400 px-2 py-1 text-sm"
                  required
                />
              </div>

              {/* Summary */}
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

              {/* Description */}
              <div className="bg-gray-100 px-4 py-3 font-medium md:border-r border-b border-gray-300">
                Description
              </div>
              <div className="md:col-span-3 px-4 py-3 border-b border-gray-300">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border border-gray-400 px-2 py-1 text-sm resize-none"
                  required
                />
              </div>

              {/* Upload */}
              <div className="bg-gray-100 px-4 py-3 font-medium md:border-r border-gray-300">
                Upload Image (optional)
              </div>
              <div className="md:col-span-3 px-4 py-3">
                {!image && (
                  <label className="inline-block cursor-pointer bg-slate-600 text-white text-sm px-4 py-1.5 rounded hover:bg-slate-700 transition">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImage(file);
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                )}

                {preview && image && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between border border-gray-300 px-3 py-2 rounded bg-gray-50">
                      <span className="text-sm text-slate-700 truncate">
                        {image.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setPreview(null);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <img
                      src={preview}
                      alt="Preview"
                      className="w-40 rounded border shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="px-4 py-4 border-t border-gray-300 bg-gray-100">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 text-sm rounded transition flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-slate-400 text-white cursor-not-allowed"
                    : "bg-slate-700 text-white hover:bg-slate-800 cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Posting...
                  </>
                ) : (
                  "Submit Issue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RaiseComplaint;
