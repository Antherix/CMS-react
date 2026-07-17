import { useEffect, useState } from "react";

function EditModal({ content, onSave, onClose }) {

    const [form, setForm] = useState({
        title: "",
        body: ""
    });

    useEffect(() => {
        if (content) {
            setForm(content);
        }
    }, [content]);

    if (!content) return null;

    return (
        <div style={{
            position: "fixed",
            top: "20%",
            left: "35%",
            background: "#fff",
            padding: 20,
            border: "1px solid black"
        }}>

            <h3>Edit Content</h3>

            <input
                value={form.title}
                onChange={(e) =>
                    setForm({
                        ...form,
                        title: e.target.value
                    })
                }
            />

            <textarea
                value={form.body}
                onChange={(e) =>
                    setForm({
                        ...form,
                        body: e.target.value
                    })
                }
            />

            <button onClick={() => onSave(form)}>
                Save
            </button>

            <button onClick={onClose}>
                Cancel
            </button>

        </div>
    );
}

export default EditModal;