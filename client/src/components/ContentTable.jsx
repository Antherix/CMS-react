function ContentTable({ contents, onEdit, onDelete }) {

    if (!contents.length) {
        return <p className="empty-state">No content found. Add your first post above.</p>;
    }

    return (
        <table className="admin-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {contents.map((item) => (
                    <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>{item.slug}</td>
                        <td>{item.type}</td>
                        <td>
                            <span className={`pill ${item.status === "published" ? "pill-published" : ""}`}>
                                {item.status}
                            </span>
                        </td>
                        <td>
                            <div className="table-actions">
                                <button className="link-btn" onClick={() => onEdit(item)}>
                                    Edit
                                </button>

                                <button className="link-btn" onClick={() => onDelete(item._id)}>
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ContentTable;
