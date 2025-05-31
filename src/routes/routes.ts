import { createBrowserRouter } from "react-router"
import HomePage from "../pages/Home.tsx"
import PostsPage from "../pages/Posts.tsx"
import CreatePostPage from "../pages/CreatePost.tsx"
import ViewChartsPage from "../pages/ViewCharts.tsx"
import App from "../App.tsx"

export default createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "posts", Component: PostsPage },
      { path: "create-post", Component: CreatePostPage },
      { path: "view-charts", Component: ViewChartsPage },
    ],
  },
])
