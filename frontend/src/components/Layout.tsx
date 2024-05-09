import { ReactNode } from "react";

import Navbar from "./Navbar";

const Layout = (props: { children: ReactNode }): JSX.Element => {
    return (
        <div className="drawer-content flex flex-col">
            <Navbar />
            {props.children}
        </div>
    );
}

export default Layout;