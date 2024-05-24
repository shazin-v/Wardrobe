import Logo from "./Logo";
import { CgSearch } from "react-icons/cg";
import { HiMiniUserCircle } from "react-icons/hi2";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={60} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center justify-between max-w-sm border rounded-full focus-within:shadow-lg">
          <input
            type="text"
            placeholder="Search for a product here..."
            className="w-full  outline-none pl-2"
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex justify-center items-center rounded-r-full text-white">
            <CgSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            <HiMiniUserCircle />
          </div>
          <div className="text-3xl relative">
            <span>
              <RiShoppingCart2Fill />
            </span>

            <div className=" bg-red-600 text-white w-5 p-1 rounded-full flex items-center justify-center absolute -top-4   -right-3">
              <p className="text-sm bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center">
                0
              </p>
            </div>
          </div>

          <div>
            <Link to={"/login"} className="py-1 px-3 bg-red-600 rounded-full text-white hover:bg-red-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
