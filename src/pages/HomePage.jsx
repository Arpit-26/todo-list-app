import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus } from "../redux/taskSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleStatusChange = (task) => {
    dispatch(updateTaskStatus({ ...task, completed: !task.completed }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="space-y-4">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Failed to load tasks</p>}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg"
          >
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p>{task.description || "No description"}</p>
            </div>
            <div>
              <button
                className={`px-4 py-2 rounded ${
                  task.completed ? "bg-green-500" : "bg-red-500"
                }`}
                onClick={() => handleStatusChange(task)}
              >
                {task.completed ? "Completed" : "Incomplete"}
              </button>
            </div>
            <Link to={`/edit/${task.id}`} className="text-blue-500">
              Edit
            </Link>
          </div>
        ))}
      </div>
      <Link to="/add" className="text-blue-500 mt-4 inline-block">
        Add New Task
      </Link>
    </div>
  );
};

export default HomePage;
