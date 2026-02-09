// import Header from '../components/Header.jsx';
// import TodoCreate from '../components/TodoCreate.jsx';
import {Header, TodoCreate, TodoFilter, TodoList } from '../components';
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTasks,
  getFilter,
  getTask,
} from "../redux/slices/taskSlice";
import { useEffect } from "react";
import { getState } from "../redux/slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();

  let tasks = useSelector(selectAllTasks);

  let {
    connectedUser: { _id },
  } = useSelector(getState);

  let filter = useSelector(getFilter);

  const itemsLeft = tasks.filter((task) => !task.completed).length;

  useEffect(() => {
    dispatch(getTask(_id));
  }, []);

  const filteredTasks = () => {
    switch (filter) {
      case "all":
        return tasks;
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-row transition-all duration-700">
      <div className="sidebar w-1/4 h-screen"></div>
      <main className="container w-1/2 mx-auto px-6 md:max-w-xl content-wrap">
        <Header />
        <TodoCreate />
        {itemsLeft > 0 && <TodoFilter />}
        <TodoList tasks={filteredTasks()} />
      </main>
      <div className="sidebar w-1/4 h-screen pt-8">
        {/* <Profile_avatar /> */}
      </div>
    </div>
  );
}; 

export default Home;
