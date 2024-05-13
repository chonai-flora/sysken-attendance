import { ReactNode, useState } from "react";

import Navbar from "./Navbar";
import Modal from "./Modal";
import Alert from "./Alert";

import { useAlertState } from "../hooks/useAlertState";

const Layout = (props: { children: ReactNode, modal?: ReactNode }): JSX.Element => {
    const { alert } = useAlertState();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col">
            <Navbar
                onButtonClick={() => setModalOpen(true)}
            />

            {props.children}

            {alert && (
                <Alert children={alert} />
            )}

            {props.modal && (
                <Modal
                    open={modalOpen}
                    children={props.modal}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}

export default Layout;