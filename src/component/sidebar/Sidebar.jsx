
import { TiHome } from "react-icons/ti";
import { FaUsersGear } from "react-icons/fa6";
import { RiImageAddFill } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";



import './Sidebar.css'; 

const Sidebar = ({ setActiveModule }) => {
  return (
    <div className="sidebar">
      <button className="sidebar__button" onClick={() =>{ setActiveModule('Home');console.log("home")}}><TiHome /> <p>Home</p></button>

      <button className="sidebar__button" onClick={() => {setActiveModule('Users');console.log("user")}}><FaUsersGear /> <p>Users</p></button>
      <button className="sidebar__button" onClick={() =>{ setActiveModule('Add Image');console.log("Add Image")}}><RiImageAddFill /> <p>Add Image</p></button>
      <button className="sidebar__button" onClick={() => {setActiveModule('Watch Image');console.log("Watch Image")}}><FaImages /> <p>Watch Image</p></button>
      <button className="sidebar__button" onClick={() => {setActiveModule('Logout');console.log("lougout")}}><FaPowerOff /> <p>Logout</p></button>
    </div>
  );
};

export default Sidebar;
