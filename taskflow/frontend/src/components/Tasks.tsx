import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import { MdFilterListAlt } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import TaskList from "./TaskList";

const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const getUser = sessionStorage.getItem("loggedInUser");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const user = getUser ? JSON.parse(getUser) : null;

  const token = sessionStorage.getItem("token");
  // console.log(user);
  const navigate = useNavigate();
  const fetchTasks = async () => {
    // const { id } = user;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/${user.id}`,
        {
          params: { id: user?.id },
        },
      );
      setTasks(res.data.data);
      setFilteredTasks(res.data.data);

      toast.success(res?.data?.message);
      // console.log(res?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const paginatedTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  // console.log(filteredTasks)
  const handleAddTask = async () => {
    try {
      if (title.length == 0) {
        return toast.error("Please enter task title");
      }
      // const user = JSON.stringify(loggedInUser)
      const res = await axios.post("http://localhost:5000/api/tasks", {
        title: title,
        userId: user?.id,
      });
      setTasks(res?.data?.data);
      setTitle("");
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error("Unable to add task at the moment");
      console.error(err);
    }
    fetchTasks();
  };

  const handleDelete = async (taskId: any) => {
    try {
      if (!taskId) {
        return toast.error("Task does not exist");
      }

      if (window.confirm("Do you really want to delete the task?")) {
        const res = await axios.delete(
          `http://localhost:5000/api/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // console.log(res.data);
        setTitle("");
        toast.success(res?.data?.message);
      } else {
        fetchTasks();
      }
    } catch (err) {
      toast.error("Error occured while deleting the task");
      console.error(err);
    }
    fetchTasks();
  };
  const handleEdit = async (taskId: any) => {
    try {
      if (!taskId) return toast.error("Task does not exist");
      if (!title.trim()) return toast.error("Title cannot be empty");

      const res = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          title: title,
          userId: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // This goes to the middleware
          },
        },
      );

      setTitle("");
      setEditId(null);
      fetchTasks();
      toast.success(res?.data?.message);

      // console.log(res.data);
    } catch (err) {
      toast.error("Error occured while updating the task");
      console.error(err);
    }
  };
  const handleComplete = async (taskId: any) => {
    try {
      if (!taskId) return toast.error("Task does not exist");
      // if (!title.trim()) return toast.error("Title cannot be empty");

      const res = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          completed: true,
          userId: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // This goes to the middleware
          },
        },
      );

      setTitle("");
      setEditId(null);
      fetchTasks();
      toast.success("Task marked as completed");
      // console.log(res.data);
    } catch (err) {
      toast.error("Error occured while updating the task");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    fetchTasks();
  }, []);

  useEffect(() => {
    const filteredTasks = Array.isArray(tasks)
      ? tasks.filter((task) => {
          if (filter === "completed") return task.completed;
          if (filter === "pending") return !task.completed;
          return true;
        })
      : [];

    setFilteredTasks(filteredTasks);
  }, [filter, tasks]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md xl:w-6/12 md:8/12">
        {/* <div className="text-center items-center flex"> */}
        <div className="flex items-center flex-wrap gap-2">
          <input
            type="text"
            placeholder="Enter Task"
            className="flex-1 border p-2 rounded-xl"
            // className="m-2 p-2 border rounded-xl xl:w-8/12 h-8 focus:border-blue-200"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button
            className="bg-black text-white px-4 py-2 rounded-xl"
            // className="bg-black text-white text-center justify-center flex gap-1 text-sm xl:w-2/12 rounded-xl mx-2 p-2 cursor-pointer hover:scale-105 transition-all"
            onClick={() => (editId ? handleEdit(editId) : handleAddTask())}
          >
            {editId ? "Update task" : "Add task"}
          </button>
          {!editId && (
            <button
              className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-1"
              // className="bg-black text-white text-center justify-center text-sm xl:w-2/12 rounded-xl p-2 mx-2 flex gap-1 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                const filteredTasks = tasks.filter((task) =>
                  task?.title.toLowerCase().includes(title.toLowerCase()),
                );
                setFilteredTasks(filteredTasks);
              }}
            >
              Search <CiSearch className="place-self-center" size={22} />
            </button>
          )}
        </div>

        <div className="m-2">
          {tasks.length ? (
            <div className="my-2">
              <div className="flex justify-between me-6">
                <h1 className="font-medium text-xl">Your Tasks</h1>
                <div className="relative">
                  <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    {filter === "pending" || filter === "completed" ? (
                      <MdFilterListAlt size={25} />
                    ) : (
                      <CiFilter size={25} />
                    )}
                  </button>

                  {showFilter && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded border">
                      <button
                        onClick={() => {
                          setFilter("all");
                          setShowFilter(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        All Tasks
                      </button>

                      <button
                        onClick={() => {
                          setFilter("completed");
                          setShowFilter(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Completed
                      </button>

                      <button
                        onClick={() => {
                          setFilter("pending");
                          setShowFilter(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Pending
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {paginatedTasks.map((task: any) => (
                <TaskList
                  key={task.taskid}
                  task={task}
                  setTitle={setTitle}
                  setEditId={setEditId}
                  handleDelete={handleDelete}
                  handleComplete={handleComplete}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-center text-lg font-bold m-4">
              No task found.
            </h1>
          )}
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
