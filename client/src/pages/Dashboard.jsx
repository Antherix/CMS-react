import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import ContentForm from "../components/ContentForm";
import ContentTable from "../components/ContentTable";
import EditModal from "../components/EditModal";

import {
    getContents,
    createContent,
    updateContent,
    deleteContent
} from "../services/contentService";

import "../styles/admin.css";

function Dashboard() {

    const navigate = useNavigate();

    const [contents, setContents] = useState([]);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const res = await getContents();
            setContents(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const addContent = async (data) => {
        const res = await createContent(data);
        setContents([res.data.data, ...contents]);
    };

    const editContent = async (data) => {
        const res = await updateContent(data._id, data);

        setContents(
            contents.map((item) =>
                item._id === data._id ? res.data.data : item
            )
        );

        setEditing(null);
    };

    const removeContent = async (id) => {
        await deleteContent(id);
        setContents(contents.filter((item) => item._id !== id));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="admin">

            <div className="admin-header">
                <h1 className="admin-title">CMS Dashboard</h1>

                <div className="admin-header-actions">
                    <Link className="link-btn" to="/blog">
                        View Blog
                    </Link>
                    <button className="link-btn" onClick={logout}>
                        Log Out
                    </button>
                </div>
            </div>

            <p className="content-section-title">New Content</p>

            <ContentForm onAdd={addContent} />

            <p className="content-section-title">All Content</p>

            <ContentTable
                contents={contents}
                onEdit={setEditing}
                onDelete={removeContent}
            />

            <EditModal
                content={editing}
                onSave={editContent}
                onClose={() => setEditing(null)}
            />

        </div>
    );
}

export default Dashboard;
