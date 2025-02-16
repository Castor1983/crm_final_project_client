import React, {FC} from "react";
import Modal from "react-modal";
import {useManagersStore} from "../../store/managers.ts";
import {ManagerInterface} from "../../interfaces/manager.interface.ts";
import axios from "axios";
import {useAuthStore} from "../../store/auth.ts";
import {managersUrl} from "../../common/urls.ts";

type Props = {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}

const CreateManagerWindow: FC<Props> = ({isOpen, setIsOpen}) => {
const {manager, setManager} = useManagersStore()
    const {accessToken}= useAuthStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setManager({ ...manager, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        await axios.post( managersUrl, manager,  {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

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
                className="w-full p-2 bg-gray-200 focus:outline-none rounded mb-2"
                autoFocus
            />
            <label>Name</label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={manager.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-200 rounded focus:outline-none mb-2"
            />
            <label>Surname</label>
            <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={manager.surname}
                onChange={handleChange}
                className="w-full p-2 bg-gray-200 rounded focus:outline-none mb-4"
            />

            <div className="flex justify-end space-x-2">
                <button
                    onClick={() => {
                        setIsOpen(false)
                        setManager({} as ManagerInterface)
                    }}
                    className="px-4 py-2 bg-[#43a047] rounded text-white hover:bg-green-700"
                >
                    Close
                </button>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-[#43a047] text-white rounded hover:bg-green-700"
                >
                    Create
                </button>
            </div>
        </Modal>
    )
}

export default CreateManagerWindow;