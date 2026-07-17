import { useState } from "react";

const emptyForm = {
    title: "",
    slug: "",
    body: "",
    type: "post",
    status: "draft",
};

function ContentForm({ onAdd }) {

    const [form, setForm] = useState(emptyForm);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        onAdd(form);
        setForm(emptyForm);
    };

    return (
        <form className="content-form" onSubmit={submit}>

            <div className="field">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    placeholder="Post title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="field">
                <label htmlFor="slug">Slug</label>
                <input
                    id="slug"
                    name="slug"
                    placeholder="post-title"
                    value={form.slug}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="field">
                <label htmlFor="body">Body</label>
                <textarea
                    id="body"
                    name="body"
                    placeholder="Write here..."
                    value={form.body}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <div className="field">
                    <label htmlFor="type">Type</label>
                    <select
                        id="type"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                    >
                        <option value="post">Post</option>
                        <option value="page">Page</option>
                    </select>
                </div>

                <div className="field">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
            </div>

            <button className="btn">Add Content</button>

        </form>
    );
}

export default ContentForm;
