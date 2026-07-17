import { useEffect, useState } from "react";

import ContentForm from "../components/ContentForm";
import ContentTable from "../components/ContentTable";
import EditModal from "../components/EditModal";

import {
    getContents,
    createContent,
    updateContent,
    deleteContent
} from "../services/contentService";

function Dashboard() {

    const [contents, setContents] = useState([]);

    const [editing, setEditing] = useState(null);

    useEffect(() => {

        loadContent();

    }, []);

    const loadContent = async () => {
        try {
            const res = await getContents();

            console.log(res);
            console.log(res.data);

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
                item._id === data._id
                    ? res.data.data
                    : item
            )

        );

        setEditing(null);

    };

    const removeContent = async (id) => {

        await deleteContent(id);

        setContents(

            contents.filter((item) => item._id !== id)

        );

    };

    return (

        <div style={{ padding: 40 }}>

            <h1>CMS Dashboard</h1>

            <ContentForm
                onAdd={addContent}
            />

            <br />

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