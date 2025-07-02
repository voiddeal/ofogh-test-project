import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { RouterProvider } from "react-router"
import router from "./routes/routes.ts"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
)

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./utils/serviceWorker.js")
}
