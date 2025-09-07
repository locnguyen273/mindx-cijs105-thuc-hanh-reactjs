import { Routes, Route } from "react-router-dom";
import TodoList from './components/todo-list/todo-list.jsx';
import ManageTaskApp from "./components/manage-task-app/manage-task-app";
import ListProduct from "./components/lesson6/list-product.jsx";
import ListUsers from "./components/lesson7/list-user.jsx";
import Login from "./pages/login";
import CommonLayout from "./templates/CommonLayout/index.jsx";
import AuthLayout from "./templates/AuthLayout/index.jsx";
import MindxExample from "./pages/mindx-example/index.jsx";
import ToDoCustomHooks from "./pages/todo-custom-hooks";

function App() {

  return (
    <>
      <Routes>
        <Route path="" element={<CommonLayout />}>
          <Route path="" index element={<ManageTaskApp />}/>
          <Route path="todo-list" element={<TodoList />}/>
          <Route path="users" element={<ListUsers />}/>
          <Route path="products" element={<ListProduct />}/>
          <Route path="mindx-example" element={<MindxExample />}/>
          <Route path="todo-custom-hooks" element={<ToDoCustomHooks />}/>
        </Route>

        <Route path="" element={<AuthLayout />}>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Login />}/>
        </Route>

      </Routes>
    </>

  )
}

export default App
