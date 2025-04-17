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
    <section id="blog" className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          PhishShield Blog
        </h2>
        <p className="text-center mb-8">
          Stay Ahead of Cyber Threats with PhishShield
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Phishing Awareness</h3>
            <p>Learn how phishing scams work and how to spot them.</p>
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Cybersecurity Tips</h3>
            <p>Stay safe with best practices for secure browsing.</p>
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Case Studies</h3>
            <p>Explore real-world phishing attacks and their impact.</p>
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h3 className="text-xl font-semibold mb-4">Join the Conversation</h3>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="4"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleCommentSubmit}
          >
            Submit
          </button>
          {message && <p className="mt-2 text-green-600">{message}</p>}
          <div className="mt-4">
            {comments.map((c, index) => (
              <p key={index} className="border-b py-2">
                {c}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;
