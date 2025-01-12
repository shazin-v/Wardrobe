import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../context";
import { FaRegCircleUser } from "react-icons/fa6";
import ROLE from "./role";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice";
import SummaryApi from "../../common/route";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const context = useContext(Context);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={"/"} className="text-xl font-bold text-blue-700">
            MyWardRobe
          </Link>
          {/* Right-side icons and buttons */}
          <div className="flex md:order-2">
            <div className="relative mr-5">
              {user?._id && (
                <div
                  className="text-3xl cursor-pointer relative flex justify-center"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  <FaRegCircleUser color="white" />
                </div>
              )}
              {menuDisplay && (
                <div className="absolute bg-white top-11 h-fit p-2 shadow-lg rounded">
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={"/admin-dashboard"}
                        className="whitespace-nowrap  md:block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      to={"/order"}
                      className="whitespace-nowrap md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Order
                    </Link>
                  </nav>
                </div>
              )}
            </div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 ms-2"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="w-full md:hidden">
              <ul className="flex flex-col p-4 font-medium bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <li>
                  <Link
                    to={"/"}
                    className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/about"}
                    className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/contact"}
                    className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/cart")}
                    className="flex items-center py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <FaShoppingCart className="mr-2" />
                    <span>Cart ({context?.cartProductCount || 0})</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
          {/* Desktop Menu */}
          <div
            className={`items-center justify-between hidden w-full md:flex md:w-auto`}
            id="navbar-search"
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse font-medium">
              <li>
                <Link
                  to={"/"}
                  className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700"
                >
                  Contact
                </Link>
              </li>
              <li>
                <button
                  onClick={() => navigate("/cart")}
                  className="flex items-center py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700"
                >
                  <FaShoppingCart className="mr-2" />
                  <span>Cart ({context?.cartProductCount || 0})</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
