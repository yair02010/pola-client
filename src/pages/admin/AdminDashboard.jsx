    import { useEffect, useState } from "react";
    import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, Legend
    } from "recharts";
    import { getAdminSummaryData } from "../../services/adminService"; // 👈 ייבוא מתוקן
    import "../../styles/AdminDashboard.css";

    export default function AdminDashboard() {
    const [summary, setSummary] = useState({ users: 0, products: 0, orders: 0, income: 0 });
    const [monthlySales, setMonthlySales] = useState([]);
    const [categoryStats, setCategoryStats] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [userStats, setUserStats] = useState({ newUsers: 0, returningUsers: 0 });

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        try {
        const token = localStorage.getItem("token");
        const { products, orders, users } = await getAdminSummaryData(token);

        const totalIncome = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        const salesByMonth = Array(12).fill(0);
        orders.forEach((order) => {
            const month = new Date(order.createdAt).getMonth();
            salesByMonth[month] += order.totalAmount || 0;
        });

        const categoryMap = {};
        products.forEach((product) => {
            const cat = product.category?.name || "Uncategorized";
            categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });

        const productPopularity = {};
        orders.forEach((order) => {
            if (order.items) {
            order.items.forEach((item) => {
                const productName = item.product?.name || "Unknown";
                productPopularity[productName] = (productPopularity[productName] || 0) + (item.quantity || 0);
            });
            }
        });

        const sortedProducts = Object.entries(productPopularity)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

        const currentMonth = new Date().getMonth();
        const newUsers = users.filter(user => new Date(user.createdAt).getMonth() === currentMonth).length;

        const userOrdersCount = {};
        orders.forEach(order => {
            if (order.user?._id) {
            userOrdersCount[order.user._id] = (userOrdersCount[order.user._id] || 0) + 1;
            }
        });
        const returningUsers = Object.values(userOrdersCount).filter(count => count > 1).length;

        setSummary({
            users: users.length,
            products: products.length,
            orders: orders.length,
            income: totalIncome,
        });

        setMonthlySales(
            salesByMonth.map((total, idx) => ({ month: `Month ${idx + 1}`, total }))
        );

        setCategoryStats(
            Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
        );

        setPopularProducts(sortedProducts);

        setUserStats({
            newUsers,
            returningUsers,
        });

        } catch (err) {
        console.error("❌ Failed to fetch admin summary:", err);
        }
    };

    return (
        <div className="admin-dashboard container py-5">
        <h2 className="dashboard-title">📊 Admin Dashboard</h2>

        <div className="stats-grid">
            <StatCard title="👥 Users" value={summary.users} />
            <StatCard title="🛒 Products" value={summary.products} />
            <StatCard title="📦 Orders" value={summary.orders} />
            <StatCard title="💰 Income" value={`₪${summary.income.toLocaleString()}`} />
            <StatCard title="🆕 New Users (This Month)" value={userStats.newUsers} />
            <StatCard title="🔄 Returning Users" value={userStats.returningUsers} />
        </div>

        <div className="charts-grid mt-5">
            <ChartCard title="📈 Monthly Sales">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlySales}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="🏷️ Top Categories">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                <Pie data={categoryStats} dataKey="value" nameKey="name" outerRadius={100} label>
                    {categoryStats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="🔥 Most Popular Products" fullWidth>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularProducts}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            </ChartCard>
        </div>
        </div>
    );
    }

    function StatCard({ title, value }) {
    return (
        <div className="stat-card">
        <h4>{title}</h4>
        <p>{value}</p>
        </div>
    );
    }

    function ChartCard({ title, children, fullWidth }) {
    return (
        <div className={`chart-card ${fullWidth ? "full-width" : ""}`}>
        <h5 className="chart-title">{title}</h5>
        {children}
        </div>
    );
    }

    const COLORS = ["#e3b47a", "#f6bd60", "#84a59d", "#f28482", "#90be6d", "#8ecae6"];
