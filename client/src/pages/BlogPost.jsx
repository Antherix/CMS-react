import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublishedPostBySlug } from "../services/blogService";
import "../styles/blog.css";

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        getPublishedPostBySlug(slug)
            .then((res) => {
                if (mounted) setPost(res.data.data);
            })
            .catch(() => {
                if (mounted) setError("Post not found.");
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [slug]);

    return (
        <div className="blog">
            <Link to="/blog" className="post-page-back">
                ← All posts
            </Link>

            {loading && <p className="state-msg">Loading…</p>}
            {error && <p className="state-msg">{error}</p>}

            {post && (
                <article>
                    <h1 className="post-page-title">{post.title}</h1>
                    <div className="post-page-meta">
                        {formatDate(post.createdAt)}
                        {post.author?.name ? ` · ${post.author.name}` : ""}
                    </div>
                    <div className="post-page-body">{post.body}</div>
                </article>
            )}
        </div>
    );
}

export default BlogPost;
