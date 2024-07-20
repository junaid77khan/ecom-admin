import { Route, Routes } from "react-router-dom";
import ListProduct from "../../components/Product/ListProduct";
// import AddProduct from "../../components/Product/AddProduct";

import AddCategory from "../../components/Category/AddCategory";
import ListCategory from "../../components/Category/ListCategory";
import Dashboard from "../Dashboard";
import Sidebar from "../../components/Cards/Sidebar";
import AdminNavbar from "../../components/AdminNavbar";
import HeaderStats from "../../components/HeaderStats";
import Tables from "../Tables";
import Add from "../AddProduct";
import Messages from "../Messages";
import EditCategory from "../../components/Category/EditCategory";
import EditProduct from "../../components/Product/EditProduct";
import ListCoupon from "../../components/Coupon/ListCoupon";
import AddCoupon from "../../components/Coupon/AddCoupon";

const Admin = () => {
  return (
    <>

      {/* <Sidebar /> */}
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
      {/* <AdminNavbar /> */}
      <HeaderStats/>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">

      <Routes>
        <Route path="/all-products" element={<ListProduct/>} />
        <Route path="/addproduct" element={<Add/>} />
        <Route path="all-products/edit-product" element={<EditProduct/>} />
        <Route path="/add-categories" element={<AddCategory />} />
        <Route path="/all-categories" element={<ListCategory />} />
        <Route path="/edit-category" element={<EditCategory />} />
        <Route path="/add-coupon" element={<AddCoupon />} />
        <Route path="/all-coupons" element={<ListCoupon/>} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Tables/>} />
        <Route path="/messages" element={<Messages/>} />




      </Routes>
      </div>
      </div>
    </>
  );
};

export default Admin;
