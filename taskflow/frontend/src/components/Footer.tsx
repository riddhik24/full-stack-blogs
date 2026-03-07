import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export const Footer = () => {
  return (
    <div className="justify-between flex">
        <div className="mx-4 font-medium xl:text-lg md:text-sm">
            <p>Created by Riddhik Mohite ©</p>
        </div>
        <div className="flex mx-4 my-2">
            <a className="mx-2"href="https://www.github.com/riddhik24" target='_blank' rel="noopener noreferrer"><FaGithub size={25}/></a>
            <a className="mx-2" href="https://www.linkedin.com/in/riddhik-mohite-689354259/" target='__blank' rel="noopener noreferrer"><FaLinkedin size={25}/></a>
            <a className="mx-2" href="https://riddhik24.github.io/" target='__blank' rel="noopener noreferrer"><CgProfile size={25}/></a>
        </div>
    </div>
  )
}
