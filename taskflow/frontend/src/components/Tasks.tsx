import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "");

  const token = localStorage.getItem("token");
  // console.log(tasks);
  const navigate = useNavigate();

  if (user === "") {
    alert("Please login first");
    navigate("/login");
  }

  const { id } = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks", {
        params: { id: id },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const handleAddTask = async () => {
    try {
      if (title.length == 0) {
        return alert("Please enter task title");
      }
      // const user = JSON.stringify(loggedInUser)
      const res = await axios.post("http://localhost:5000/tasks", {
        title: title,
        id: id,
      });
      setTasks(res.data);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
    fetchTasks();
  };

  const handleDelete = async (taskId: any) => {
    try {
      if (!taskId) {
        return alert("Task does not exist");
      }

      if (window.confirm("Do you really want to delete the task?")) {
        const res = await axios.delete(
          `http://localhost:5000/tasks/${taskId}`,
          {
            params: { id },
            headers: {
              Authorization: `Bearer ${token}`, // This goes to the middleware
            },
          },
        );

        console.log(res.data);
        setTitle("");
      } else {
        fetchTasks();
      }
    } catch (err) {
      alert("Error occured while deleting the task");
      console.error(err);
    }
    fetchTasks();
  };
  const handleEdit = async (taskId: any) => {
    try {
      if (!taskId) return alert("Task does not exist");
      if (!title.trim()) return alert("Title cannot be empty");

      const res = await axios.put(
        `http://localhost:5000/tasks/${taskId}`,
        {
          title: title,
        },
        {
          params: { id },
          headers: {
            Authorization: `Bearer ${token}`, // This goes to the middleware
          },
        },
      );

      setTitle("");
      setEditId(null);
      fetchTasks();

      console.log(res.data);
    } catch (err) {
      alert("Error occured while updating the task");
      console.error(err);
    }
  };
  const handleComplete = async (taskId: any) => {
    try {
      if (!taskId) return alert("Task does not exist");
      // if (!title.trim()) return alert("Title cannot be empty");

      const res = await axios.put(
        `http://localhost:5000/tasks/${taskId}`,
        {
          completed: true,
        },
        {
          params: { id },
          headers: {
            Authorization: `Bearer ${token}`, // This goes to the middleware
          },
        },
      );

      setTitle("");
      setEditId(null);
      fetchTasks();
      alert("Task marked as completed");
      console.log(res.data);
    } catch (err) {
      alert("Error occured while updating the task");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md xl:w-6/12 md:8/12">
        <div className="text-center items-center flex">
          <input
            type="text"
            placeholder="Enter Task"
            className="m-2 p-2 border rounded-xl xl:w-10/12 h-8 focus:border-blue-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-black text-white text-sm xl:w-2/12 rounded-xl p-2 cursor-pointer hover:scale-105 transition-all"
            onClick={() => (editId ? handleEdit(editId) : handleAddTask())}
          >
            {editId ? "Update task" : "Add task"}
          </button>
        </div>

        <div className="m-2">
          {tasks.length ? (
            <div className="my-2">
              <h1 className="font-medium text-xl">Your Tasks</h1>
              {tasks.map((task: any) => (
                <div key={task?.id} className="flex justify-between">
                  <div className="m-2 mx-4 items-center flex gap-2">
                    {task?.completed ?<MdCheck className="text-green-500 min-w-5"size={20}/> : <FcCancel className="min-w-5"size={20}/>}
                    <li className="list-none text-lg">{task?.title}</li>
                  </div>
                  <div className="flex h-8">
                    <button
                      className="m-2 cursor-pointer hover:scale-115 transition-all"
                      onClick={() => {
                        setTitle(task?.title);
                        setEditId(task?.id);
                      }}
                      title="Edit Task"
                    >
                      <MdOutlineModeEdit size={25} />
                    </button>
                    <button
                      className="m-2 cursor-pointer hover:scale-115 transition-all"
                      onClick={() => handleDelete(task?.id)}
                      title="Delete Task"
                    >
                      <MdDeleteForever size={25} />
                    </button>
                    <button
                      className="m-2 cursor-pointer hover:scale-115 transition-all"
                      onClick={() => {
                        handleComplete(task?.id);
                      }}
                      title={
                        task?.completed ? "Completed" : "Mark task as complete"
                      }
                      disabled={task?.completed === true}
                    >
                      {/* <MdOutlineDoneOutline size={25} /> */}
                      {task?.completed ? (
                        <IoCheckmarkDoneCircle size={25} />
                      ) : (
                        <IoCheckmarkDoneCircleOutline size={25} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-center text-lg font-bold m-4">
              No task found.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
