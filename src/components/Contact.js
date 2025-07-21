import React, { useState, useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", message: "" });
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-900 px-4 py-12 flex justify-center items-center transition-colors duration-300">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hi.
          </p>

          <div className="space-y-3 text-gray-700 dark:text-gray-200">
            <div>
              📧 <strong>Email:</strong> foodhunt.support@example.com
            </div>
            <div>
              📞 <strong>Phone:</strong> +91 9876543210
            </div>
            <div>
              🕒 <strong>Hours:</strong> 9 AM – 9 PM (Mon–Sat)
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          ✅ Message sent successfully!
        </div>
      )}
    </div>
  );
};

export default Contact;
