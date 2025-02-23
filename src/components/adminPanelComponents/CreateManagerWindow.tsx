import React, {FC} from "react";
import Modal from "react-modal";

import {useManagersStore} from "../../store/managers.ts";
import {ManagerInterface} from "../../interfaces/manager.interface.ts";
import {buttonClass, inputClass} from "../../styles/styles.ts";
import {fetchCreateManager} from "../../requests/requests.ts";

type Props = {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}

const CreateManagerWindow: FC<Props> = ({isOpen, setIsOpen}) => {
const {manager, setManager} = useManagersStore()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setManager({ ...manager, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
       await fetchCreateManager(manager)
        setIsOpen(false);
        setManager({} as ManagerInterface)
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20"
        >
            <label>Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={manager.email}
                onChange={handleChange}
                className={`${inputClass} w-full mb-2`}
                autoFocus
            />
            <label>Name</label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={manager.name}
                onChange={handleChange}
                className={`${inputClass} w-full mb-2`}
            />
            <label>Surname</label>
            <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={manager.surname}
                onChange={handleChange}
                className={`${inputClass} w-full mb-4`}
            />

            <div className="flex justify-end space-x-2">
                <button
                    onClick={() => {
                        setIsOpen(false)
                        setManager({} as ManagerInterface)
                    }}
                    className={buttonClass}
                >
                    Close
                </button>
                <button
                    onClick={handleCreate}
                    className={buttonClass}
                >
                    Create
                </button>
            </div>
        </Modal>
    )
}

export default CreateManagerWindow;