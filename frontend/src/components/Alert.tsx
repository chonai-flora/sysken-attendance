import { ReactNode } from "react";

const Alert = (props: { children: ReactNode }): JSX.Element => {
    return (
        <div className="toast w-full">
            <div role="alert" className="alert flex">
                {props.children}
            </div>
        </div>
    );
}

export default Alert;