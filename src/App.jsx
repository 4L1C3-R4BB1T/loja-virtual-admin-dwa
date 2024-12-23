import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authorization from "./Authorization";
import Categories from "./Categories";
import CreateCategory from "./CreateCategory";
import CreateProduct from "./CreateProduct";
import EditCategory from "./EditCategory";
import EditProduct from "./EditProduct";
import Home from "./Home";
import Layout from "./Layout";
import NotFound from "./NotFound";
import OrderDetails from "./OrderDetails";
import Orders from "./Orders";
import Products from "./Products";
import Users from "./Users";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/users" element={<Authorization><Users /></Authorization>} />
                    <Route path="/products" element={<Authorization><Products /></Authorization>} />
                    <Route path="/products/:id" element={<Authorization><EditProduct /></Authorization>} />
                    <Route path="/products/create" element={<Authorization><CreateProduct /></Authorization>} />
                    <Route path="/orders" element={<Authorization><Orders /></Authorization>} />
                    <Route path="/orders/:id" element={<Authorization><OrderDetails /></Authorization>} />                    
                    <Route path="/categories" element={<Authorization><Categories /></Authorization>} />
                    <Route path="/categories/:id" element={<Authorization><EditCategory /></Authorization>} />
                    <Route path="/categories/create" element={<Authorization><CreateCategory /></Authorization>} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;