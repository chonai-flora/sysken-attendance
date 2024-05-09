import { Link } from "react-router-dom";
import { MdOutlinePeopleOutline } from "react-icons/md";

const Navbar = (): JSX.Element => {
    return (
        <div className="navbar px-4 bg-red-300">
            <div className="flex-1">
                <img src="/sysken_logo.png"
                    alt="sysken_logo"
                    className="h-[40px] absolute"
                />
                <Link className="ml-7 font-semibold text-xl text-white" to="/">
                    情報システム研究部 活動記録
                </Link>
            </div>

            <div className="btn btn-circle btn-ghost">
                <MdOutlinePeopleOutline className="text-3xl" />
            </div>
        </div>
    );
}

export default Navbar;