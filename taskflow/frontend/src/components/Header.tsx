import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {

  const users = useSelector((state:any)=>state.auth.resUser)

  const user = JSON.parse(users)

  return (
    <div className="flex bg-blue-50 justify-between mx-2 py-2 items-center rounded-2xl drop-shadow-2xl">
      <div className="flex items-center gap-3">
        <img
          className="w-12 rounded-2xl ml-6 my-2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6qQ2chHS4h4D6hteiqNrWZK7pvSBXilk1Ow&s"
          alt="logo"
        />
        <h1 className="font-bold text-xl">Task Flow</h1>
      </div>
      {user && (
        <div className="items-center flex gap-4">
          <h1>Logged in: {user?.email}</h1>
          <h1 className="font-bold xl:text-lg mr-4 sm:text-md hover:scale-115 transition-all">
            <Link to={"/logout"}>Logout</Link>
          </h1>
        </div>
      )}
    </div>
  );
}
