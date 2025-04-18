import { useState } from "react";

function Blog() {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState("");

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment("");
            setMessage("Comment submitted successfully!");
            setTimeout(() => setMessage(""), 3000);
        } else {
            setMessage("Please enter a comment.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <section id="blog" className="py-12 bg-gradient-to-b from-gray-100 to-gray-200">
            <div className="container mx-auto px-4">
                {/* Blog Header */}
                <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
                    PhishShield Blog
                </h2>
                <p className="text-center text-gray-600 mb-10">
                    Stay Ahead of Cyber Threats with PhishShield
                </p>

                {/* Blog Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">Phishing Awareness</h3>
                        <p className="text-gray-600 mb-4">
                            Learn how phishing scams work and how to spot them.
                        </p>
                        <a href="#" className="text-blue-600 hover:underline font-medium">
                            Learn more →
                        </a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">Cybersecurity Tips</h3>
                        <p className="text-gray-600 mb-4">
                            Stay safe with best practices for secure browsing.
                        </p>
                        <a href="#" className="text-blue-600 hover:underline font-medium">
                            Learn more →
                        </a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">Case Studies</h3>
                        <p className="text-gray-600 mb-4">
                            Explore real-world phishing attacks and their impact.
                        </p>
                        <a href="#" className="text-blue-600 hover:underline font-medium">
                            Learn more →
                        </a>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">Join the Conversation</h3>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                        rows="4"
                        placeholder="Share your thoughts..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                        onClick={handleCommentSubmit}
                    >
                        Submit
                    </button>
                    {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
                    <div className="mt-6">
                        {comments.length > 0 ? (
                            comments.map((c, index) => (
                                <p
                                    key={index}
                                    className="border-b border-gray-300 py-2 text-gray-700"
                                >
                                    {c}
                                </p>
                            ))
                        ) : (
                            <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Blog;