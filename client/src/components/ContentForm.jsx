import { useState } from "react";

function ContentForm({ onAdd }) {

    const [form, setForm] = useState({
        title: "",
        slug: "",
        body: "",
        type: "page",
        status: "draft",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        onAdd(form);

        setForm({
            title: "",
            slug: "",
            body: "",
            type: "page",
            status: "draft",
        });
    };

    return (
        <form onSubmit={submit}>

            <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
            />

            <input
                name="slug"
                placeholder="Slug"
                value={form.slug}
                onChange={handleChange}
            />

            <textarea
                name="body"
                placeholder="Body"
                value={form.body}
                onChange={handleChange}
            />

            <select
                name="status"
                value={form.status}
                onChange={handleChange}
            >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
            </select>

            <button>Add Content</button>

        </form>
    );
}

export default ContentForm;