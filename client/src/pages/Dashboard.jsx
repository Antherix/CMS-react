import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>CMS Dashboard</h1>

            <h3>
                Welcome {user?.name}
            </h3>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;