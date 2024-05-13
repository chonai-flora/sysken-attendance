import { GrClose } from "react-icons/gr";
import { ReactNode, MouseEventHandler } from "react";

type Props = {
    open: boolean;
    children: ReactNode;
    onClose: MouseEventHandler<HTMLButtonElement>;
};

const Modal = (props: Props): JSX.Element => {
    return (
        <div className={"modal " + (props.open && "modal-open")}>
            <div className="modal-box p-0 overflow-visible">
                <div className="indicator inline w-full">
                    <div className="indicator-item z-auto">
                        <button onClick={props.onClose} className="btn btn-circle btn-sm">
                            <GrClose />
                        </button>
                    </div>
                    <div className="p-6">
                        {props.children}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Modal;