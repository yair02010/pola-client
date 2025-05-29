import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { format } from "date-fns"
import { Link } from "react-router-dom"
import { fetchOrders, updateOrderStatus } from "../../services/orderService"
import "../../styles/ManageOrders.css"

export default function ManageOrders() {
    const [orders, setOrders] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const ordersPerPage = 10

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = async () => {
        try {
            const token = localStorage.getItem("token")
            const data = await fetchOrders(token)
            setOrders(data)
        } catch {
            toast.error("Failed to load orders ❌")
        }
    }

    const handleStatusChange = async (id, status) => {
        const paymentMethod = "credit_card"
        const deliveryMethod = "delivery"
        try {
            const token = localStorage.getItem("token")
            await updateOrderStatus(id, status, paymentMethod, deliveryMethod, token)
            toast.success("Order status updated ✅")
            loadOrders()
        } catch {
            toast.error("Failed to update status ❌")
        }
    }

    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)
    const totalPages = Math.ceil(orders.length / ordersPerPage)

    return (
        <div className="admin-page container py-5">
            <h2 className="page-title mb-4 text-center">📦 Manage Orders</h2>
            <div className="table-responsive shadow-sm rounded-4">
                <table className="table align-middle bg-white text-center">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{indexOfFirstOrder + index + 1}</td>
                                <td>{order.user?.name || "Unknown"}</td>
                                <td>₪{order.totalAmount.toLocaleString()}</td>
                                <td>{format(new Date(order.createdAt), "dd/MM/yyyy")}</td>
                                <td>
                                    <span className={`badge bg-${order.status === "pending" ? "warning" : order.status === "paid" ? "success" : order.status === "shipped" ? "info" : "secondary"}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <Link to={`/admin/order/${order._id}`} className="btn btn-sm btn-outline-primary">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4 gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`btn btn-sm ${currentPage === i + 1 ? "btn-dark" : "btn-outline-secondary"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
