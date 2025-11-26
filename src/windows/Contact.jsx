import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { socials } from "#constants";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                from_name: form.name,
                to_name: "Patiphan",
                from_email: form.email,
                to_email: "devpatiphan@gmail.com",
                message: form.message,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                setLoading(false);
                alert("Message sent successfully!");
                setForm({ name: "", email: "", message: "" });
            })
            .catch((error) => {
                setLoading(false);
                console.log("FAILED...", error);
                alert("Something went wrong. Check the console for details.");
            });
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
            </div>

            <div className="contact-container flex flex-col md:flex-row h-full overflow-hidden bg-gray-50">
                {/* Left Side - Contact Info */}
                <div className="w-full md:w-1/3 bg-white p-6 border-r border-gray-200 flex flex-col gap-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Let's Connect</h3>
                        <p className="text-gray-600 text-sm">
                            Feel free to reach out for collaborations or just a friendly hello!
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        {socials.map((social) => (
                            <a
                                key={social.id}
                                href={social.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-all group"
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: social.bg }}
                                >
                                    <img src={social.icon} alt={social.text} className="w-5 h-5 invert" />
                                </div>
                                <span className="font-medium text-gray-700">{social.text}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg mx-auto">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <User size={16} /> Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Mail size={16} /> Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <MessageSquare size={16} /> Message
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="What's on your mind?"
                                required
                                rows={5}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 bg-black text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending..." : (
                                <>
                                    Send Message <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
