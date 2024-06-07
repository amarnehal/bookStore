import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logout from "./Logout";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const menuItems = [
    { name: "Home", path: "/", current: true },
    { name: "About", path: "/about", current: false },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/Images/booklogo.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {menuItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                          `rounded-md px-3 py-2 text-sm font-medium ${
                            isActive
                              ? "bg-rose-700 text-white"
                              : item.current
                              ? " text-gray-300 hover:bg-gray-700"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          }`
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    {authStatus ? (
                      <Logout />
                    ) : (
                      <>
                        <NavLink
                          className={({ isActive }) =>
                            `rounded-md px-3 py-2 text-sm font-medium ${
                              isActive
                                ? "bg-rose-700 text-white"
                                : " text-gray-300 hover:bg-gray-700  hover:text-white"
                            }`
                          }
                          to="/register"
                        >
                          Regsiter
                        </NavLink>
                        <NavLink
                          className={({ isActive }) =>
                            `rounded-md px-3 py-2 text-sm font-medium ${
                              isActive
                                ? "bg-rose-700 text-white"
                                : " text-gray-300 hover:bg-gray-700  hover:text-white"
                            }`
                          }
                          to="/login"
                        >
                          LogIn
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* /////profile */}
              {authStatus ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/Images/userprofileIcon.png"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/profile/${userData?.$id}`}
                              className={
                                (active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700")
                              }
                            >
                              {userData?.name} - Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/books"
                              className={
                                (active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700")
                              }
                            >
                              Manage Books
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : null}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {menuItems.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-base font-medium ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {authStatus ? (
                <>
                  <Disclosure.Button
                    as={Link}
                    to={`/profile/:${userData?.$id}`}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Profile
                  </Disclosure.Button>
                  {/* <Disclosure.Button
                    as={Link}
                    to="/books"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Manage Books
                  </Disclosure.Button> */}
                  <Logout className="bg-rose-700 text-white hover:bg-gray-700" />
                </>
              ) : (
                <>
                  <Disclosure.Button
                    as={NavLink}
                    to="/register"
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 text-base font-medium ${
                        isActive
                          ? "bg-rose-700 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    Register
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={NavLink}
                    to="/login"
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 text-base font-medium ${
                        isActive
                          ? "bg-rose-700 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    Log In
                  </Disclosure.Button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
