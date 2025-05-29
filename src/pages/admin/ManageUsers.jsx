    import { useEffect, useState } from "react"
    import { fetchAllUsers, deleteUserById } from "../../services/userService"
    import { toast } from "react-toastify"
    import "../../styles/Manageuser.css"
    export default function ManageUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
        const token = localStorage.getItem("token")
        const res = await fetchAllUsers(token)
        setUsers(res)
        } catch {
        toast.error("Failed to fetch users ❌")
        }
    }

    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return

        try {
        const token = localStorage.getItem("token")
        await deleteUserById(userId, token)
        setUsers((prev) => prev.filter((u) => u._id !== userId))
        toast.success("User deleted successfully ✅")
        } catch {
        toast.error("Failed to delete user ❌")
        }
    }

    return (
        <div className="admin-users-page container py-5">
        <h2 className="orders-title">👥 Manage Users</h2>

        <div className="table-responsive">
            <table className="orders-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                <tr>
                    <td colSpan="5">No users found.</td>
                </tr>
                ) : (
                users.map((user) => (
                    <tr key={user._id}>
                    <td data-label="Name">{user.name}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Role">{user.role}</td>
                    <td data-label="Registered">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td data-label="Actions">
                        {user.role !== "admin" && (
                        <button className="edit-status-btn" onClick={() => deleteUser(user._id)}>
                            Delete
                        </button>
                        )}
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    )
    }
