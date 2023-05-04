import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import "@fortawesome/fontawesome-free/css/solid.css";

import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { routingData } from "./components/allRoutes";

export default function App() {
  return (
    <Layout>
      <Routes>
        {routingData().map((route) => {
          return route.isProtected ? (
            <Route key={crypto.randomUUID()} path={route.path} element={<Navigate to={route.redirectPath} />} />
          ) : (
            <Route key={crypto.randomUUID()} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </Layout>
  );
}
