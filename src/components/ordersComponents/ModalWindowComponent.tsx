import {FC} from "react";
import {StatusEnum} from "../../enums/status.enum.ts";
import {CourseEnum} from "../../enums/course.enum.ts";
import {CourseFormatEnum} from "../../enums/courseFormat.enum.ts";
import {CourseTypeEnum} from "../../enums/courseType.enum.ts";
import Modal from "react-modal";
import {useOrdersStore} from "../../store/orders.ts";

type Props = {
    isModalOpen: boolean
    setIsModalOpen: (open: boolean) => void
}
const ModalWindowComponent: FC <Props> = ({isModalOpen, setIsModalOpen}) => {
const {editOrder, setEditOrder} = useOrdersStore()
    const handleCloseModal = () => {
        setEditOrder(null);
        setIsModalOpen(false);
    };
    return(
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} className="modal-content">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label>Group:</label>
                    <input
                        type="text"
                        value={editOrder?.group || ""}
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, group: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Status:</label>
                    <select
                        value={editOrder?.status || ""}
                        onChange={(e) => setEditOrder(editOrder ?{...editOrder, status: e.target.value as StatusEnum} : null)}
                        className="bg-gray-200 p-2 rounded"
                    >
                        <option value={StatusEnum.INWORK}>In work</option>
                        <option value={StatusEnum.NEW}>New</option>
                        <option value={StatusEnum.AGREE}>Agree</option>
                        <option value={StatusEnum.DISAGREE}>Disagree</option>
                        <option value={StatusEnum.DUBBING}>Dubbing</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={editOrder?.name || ""}
                        onChange={(e) => setEditOrder(editOrder ?{...editOrder, name: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Sum:</label>
                    <input
                        type="number"
                        value={editOrder?.sum || ""}
                        onChange={(e) => setEditOrder(editOrder ?{...editOrder, sum: Number(e.target.value)} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Surname:</label>
                    <input
                        type="text"
                        value={editOrder?.surname || ""}
                        onChange={(e) => setEditOrder(editOrder ?{...editOrder, surname: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Already paid:</label>
                    <input
                        type="number"
                        value={editOrder?.alreadyPaid || ""}
                        onChange={(e) => setEditOrder(editOrder ?{...editOrder, alreadyPaid: Number(e.target.value)} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={editOrder?.email || ""}
                        onChange={(e) => setEditOrder(editOrder ?{...editOrder, email: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Course:</label>
                    <select
                        value={editOrder?.course || ""}
                        onChange={(e) => setEditOrder(editOrder ?{...editOrder, course: e.target.value as CourseEnum} : null)}
                        className="bg-gray-200 p-2 rounded"
                    >
                        <option value={CourseEnum.FE}>FE</option>
                        <option value={CourseEnum.JCX}>JCX</option>
                        <option value={CourseEnum.FS}>FS</option>
                        <option value={CourseEnum.PCX}>PCX</option>
                        <option value={CourseEnum.JSCX}>JSCX</option>
                        <option value={CourseEnum.QACX}>QACX</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={editOrder?.phone || ""}
                        onChange={(e) => setEditOrder(editOrder ?{...editOrder, phone: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Course format:</label>
                    <select
                        value={editOrder?.course_format || ""}
                        onChange={(e) => setEditOrder(editOrder ?{
                            ...editOrder,
                            course_format: e.target.value as CourseFormatEnum
                        } : null)}
                        className="bg-gray-200 p-2 rounded"
                    >
                        <option value={CourseFormatEnum.ONLINE}>online</option>
                        <option value={CourseFormatEnum.STATIC}>static</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label>Age:</label>
                    <input
                        type="number"
                        value={editOrder?.age || ""}
                        onChange={(e) => setEditOrder(editOrder ?{...editOrder, age: Number(e.target.value)} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>


                <div className="flex flex-col">
                    <label>Course type:</label>
                    <select
                        value={editOrder?.course_type || ""}
                        onChange={(e) => setEditOrder(editOrder ?{...editOrder, course_type: e.target.value as CourseTypeEnum} : null)}
                        className="bg-gray-200 p-2 rounded"
                    >
                        <option value={CourseTypeEnum.PRO}>pro</option>
                        <option value={CourseTypeEnum.INCUBATOR}>incubator</option>
                        <option value={CourseTypeEnum.VIP}>vip</option>
                        <option value={CourseTypeEnum.PREMIUM}>premium</option>
                        <option value={CourseTypeEnum.MINIMAL}>minimal</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <button onClick={handleCloseModal} className="bg-[#43a047] text-white px-4 py-2 rounded">
                    CLOSE
                </button>
                <button className="bg-[#43a047] text-white px-4 py-2 rounded">SUBMIT</button>
            </div>
        </Modal>
    )
}

export default ModalWindowComponent;