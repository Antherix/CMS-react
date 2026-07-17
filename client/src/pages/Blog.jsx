import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedPosts } from "../services/blogService";
import "../styles/blog.css";

function excerpt(text, len = 160) {
    if (!text) return "";
    const clean = text.replace(/\s+/g, " ").trim();
    return clean.length > len ? clean.slice(0, len).trim() + "…" : clean;
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        getPublishedPosts()
            .then((res) => {
                if (mounted) setPosts(res.data.data || []);
            })
            .catch(() => {
                if (mounted) setError("Could not load posts. Is the server running?");
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="blog">
            <header className="blog-header">
                <Link to="/blog">
                    <h1 className="blog-title">Journal</h1>
                </Link>
                <p className="blog-subtitle">Writing &amp; notes</p>
            </header>

            {loading && <p className="state-msg">Loading posts…</p>}
            {error && <p className="state-msg">{error}</p>}
            {!loading && !error && posts.length === 0 && (
                <p className="state-msg">No posts published yet.</p>
            )}

            <ul className="post-list">
                {posts.map((post) => (
                    <li className="post-item" key={post._id}>
                        <Link to={`/blog/${post.slug}`}>
                            <h2 className="post-item-title">{post.title}</h2>
                            <div className="post-meta">
                                {formatDate(post.createdAt)}
                                {post.author?.name ? ` · ${post.author.name}` : ""}
                            </div>
                            <p className="post-excerpt">{excerpt(post.body)}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blog;
