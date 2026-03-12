import { MdDeleteForever } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

const TaskList = ({
  task,
  setTitle,
  setEditId,
  handleDelete,
  handleComplete,
}) => {
  return (
    <div className="flex justify-between">
      <div className="m-2 mx-4 items-center flex gap-2">
        {task?.completed ? (
          <MdCheck className="text-green-500 min-w-5" size={20} />
        ) : (
          <FcCancel className="min-w-5" size={20} />
        )}
        <li className="list-none text-lg">{task?.title}</li>
      </div>
      <div className="flex h-8">
        <button
          className="m-2 cursor-pointer hover:scale-115 transition-all"
          onClick={() => {
            setTitle(task?.title);
            setEditId(task?.taskid);
          }}
          title="Edit Task"
        >
          <MdOutlineModeEdit size={25} />
        </button>
        <button
          className="m-2 cursor-pointer hover:scale-115 transition-all"
          onClick={() => handleDelete(task?.taskid)}
          title="Delete Task"
        >
          <MdDeleteForever size={25} />
        </button>
        <button
          className="m-2 cursor-pointer hover:scale-115 transition-all"
          onClick={() => {
            handleComplete(task?.taskid);
          }}
          title={task?.completed ? "Completed" : "Mark task as complete"}
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
  );
};

export default TaskList;
