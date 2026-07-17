import { useEffect, useState } from "react";

const emptyForm = {
    title: "",
    slug: "",
    body: "",
    type: "post",
    status: "draft",
};

function EditModal({ content, onSave, onClose }) {

    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (content) {
            setForm({ ...emptyForm, ...content });
        }
    }, [content]);

    if (!content) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-panel" onClick={(e) => e.stopPropagation()}>

                <h3 className="modal-title">Edit Content</h3>

                <div className="field">
                    <label htmlFor="edit-title">Title</label>
                    <input
                        id="edit-title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div className="field">
                    <label htmlFor="edit-slug">Slug</label>
                    <input
                        id="edit-slug"
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div className="field">
                    <label htmlFor="edit-body">Body</label>
                    <textarea
                        id="edit-body"
                        name="body"
                        value={form.body}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div className="form-row">
                    <div className="field">
                        <label htmlFor="edit-type">Type</label>
                        <select
                            id="edit-type"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                        >
                            <option value="post">Post</option>
                            <option value="page">Page</option>
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="edit-status">Status</label>
                        <select
                            id="edit-status"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="btn" onClick={() => onSave(form)}>
                        Save
                    </button>

                    <button className="btn btn-ghost" onClick={onClose}>
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
}

export default EditModal;
