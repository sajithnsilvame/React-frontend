import React from "react";
import axios from "axios";
import RouterList from "./router/RouterList";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

// to solve Unauthenticated when logout
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
});

function App() {
  return (
    <div>
      <RouterList />
    </div>
  );
}

export default App;
