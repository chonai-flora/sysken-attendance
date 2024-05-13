import { Link } from "react-router-dom";
import { MdOutlinePersonAdd } from "react-icons/md";

const Navbar = (props: { onButtonClick?: any }): JSX.Element => {
    return (
        <div className="navbar px-4 bg-blue-300">
            <div className="flex-1">
                <img src="/sysken_logo.png"
                    alt="sysken_logo"
                    className="h-[40px] absolute"
                />
                <Link className="ml-8 text-xl text-white font-semibold" to="/">
                    情報システム研究部 活動記録
                </Link>
            </div>

            <button
                className="btn btn-circle btn-ghost"
                onClick={props.onButtonClick}
            >
                <MdOutlinePersonAdd className="text-3xl" />
            </button>
        </div>
    );
}

export default Navbar;