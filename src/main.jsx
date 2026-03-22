// main.jsx
import { ViteReactSSG } from "vite-react-ssg";
import "./css/index.css";
import App from "./App.jsx";

export const createRoot = ViteReactSSG({
  routes: [
    {
      path: "/",
      element: <App />,
    },
  ],
});
