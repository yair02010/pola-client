import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CartProvider } from "./contexts/CartContext";
import ProductPage from "./pages/ProductPage";
import { ToastContainer } from "react-toastify";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import About from "./pages/content/About";
import FAQ from "./pages/content/FAQ";
import ReturnPolicy from "./pages/content/ReturnPolicy"; 
import OrderDetails1 from "./pages/OrderDetails1.jsx";


import "./styles/ProductCard.css";
import "./styles/toastifyCustom.css";

// Admin Imports
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import ManageOrders from "./pages/admin/ManageOrders.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageCategories from "./pages/admin/ManageCategories.jsx";


function App() {
  return (
    <Router>
      <CartProvider>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="order/:id" element={<OrderDetails />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />



            {/* Admin Routes */}
            <Route path="admin" element={<AdminRoute />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="orders" element={<ManageOrders />} /> 
              <Route path="Categories" element={<ManageCategories />} /> 
              <Route path="Users" element={<ManageUsers />} /> 
              <Route path="/admin/order/:id" element={<OrderDetails />} />

            </Route>
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
