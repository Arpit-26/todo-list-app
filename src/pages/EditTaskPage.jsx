import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      setTask(response.data);
    };
    fetchTask();
  }, [id]);

  const handleStatusChange = async () => {
    const updatedTask = { ...task, completed: !task.completed };
    await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      updatedTask
    );
    navigate("/");
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <div className="mb-4">
        <h2 className="font-semibold">{task.title}</h2>
        <p>{task.description || "No description"}</p>
        <button
          onClick={handleStatusChange}
          className={`px-4 py-2 rounded ${
            task.completed ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
        </button>
      </div>
    </div>
  );
};

export default EditTaskPage;
