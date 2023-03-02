import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/dashboard/Dashboard";
import Login from "./pages/Admin/login/Login";
import Categories from "./pages/Admin/Categories/Categories";
import Products from "./pages/Admin/products/Products";
import Users from "./pages/Admin/users/Users";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { AuthProvider } from "./Contex/AuthContex";

function App() {
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
