function ContentTable({ contents, onEdit, onDelete }) {

    if (!contents.length) {
        return <h3>No Content Found</h3>;
    }

    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {contents.map((item) => (
                    <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>{item.slug}</td>
                        <td>{item.status}</td>
                        <td>
                            <button onClick={() => onEdit(item)}>
                                Edit
                            </button>

                            <button onClick={() => onDelete(item._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ContentTable;