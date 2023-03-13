import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/dashboard/Dashboard";
// import Login from "./pages/Admin/login/Login";
import Categories from "./pages/Admin/Categories/Categories";
import Products from "./pages/Admin/products/Products";
import Users from "./pages/Admin/users/Users";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AdminPrivateRoute from "./utils/AdminPrivateRoute";
import LoginUi from "./pages/Admin/login/LoginUi";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUi />} />
          <Route path="/admin" element={<AdminPrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
