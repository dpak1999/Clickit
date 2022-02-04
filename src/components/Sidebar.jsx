/** @format */

import { RiHomeFill } from 'react-icons/ri';
import {} from 'react-icons/io';

import Logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';

const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';
const isInactiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';

const categories = [
  { name: 'Animal' },
  { name: 'Wallpapers' },
  { name: 'Photography' },
  { name: 'Gaming' },
  { name: 'Coding' },
];

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to={'/'}
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={Logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isInactiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-2xl">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((cat) => (
            <NavLink
              key={cat.name}
              to={`/category/${cat.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isInactiveStyle
              }
              onClick={handleCloseSidebar}
            >
              {cat.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user profile"
          />
          <p>{user.username}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;