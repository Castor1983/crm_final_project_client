import {FC, useEffect, useState} from "react";
import {StatusEnum} from "../../enums/status.enum.ts";
import {CourseEnum} from "../../enums/course.enum.ts";
import {CourseFormatEnum} from "../../enums/courseFormat.enum.ts";
import {CourseTypeEnum} from "../../enums/courseType.enum.ts";
import Modal from "react-modal";
import {useOrdersStore} from "../../store/orders.ts";
import {useGroupsStore} from "../../store/groups.ts";
import axios from "axios";
import {useAuthStore} from "../../store/auth.ts";

type Props = {
    isModalOpen: boolean
    setIsModalOpen: (open: boolean) => void
}
const ModalWindowComponent: FC <Props> = ({isModalOpen, setIsModalOpen}) => {
const {editOrder, setEditOrder} = useOrdersStore()
    const {groups, setGroups, newGroup, setNewGroup}=useGroupsStore()
    const accessToken = useAuthStore.getState().accessToken
    const [isAddingGroup, setIsAddingGroup] = useState(false);
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/orders/groups", {//TODO
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }});
                setGroups(response.data);
            } catch (error) {
                console.error("Помилка при отриманні груп:", error);
            }
        };
        if (isModalOpen) {
            fetchGroups();
        }
    }, [isModalOpen, isAddingGroup, groups]);
    const handleAddGroup = async () => {
        if (!newGroup.trim()) return;
        if (groups.some(group => group.name === newGroup)) {
            alert("Група з такою назвою вже існує!"); //TODO
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:3001/api/orders/groups", //TODO
                { name: newGroup },
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            );
            setGroups([...groups, response.data]);
            setEditOrder(editOrder && { ...editOrder, group: response.data.name });
            setNewGroup("");
        } catch (error) {
            console.error("Помилка при додаванні групи:", error);
        }
    };

    const handleCloseModal = () => {
        setEditOrder(null);
        setIsModalOpen(false);
    };
    const handleUpdateOrder = async () => {
        if (!editOrder) return;
const orderId = editOrder.id?.toString()
        const {course, sum, name, age, course_format, course_type, phone, group, alreadyPaid, status, surname, email} = editOrder
        try {
            await axios.patch(
                `http://localhost:3001/api/orders/edit/${orderId}`,
                {course, sum, name, age, course_format, course_type, phone, group, alreadyPaid, status, surname, email},
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            );
            alert("Замовлення оновлено успішно!"); //TODO
            setIsModalOpen(false);
        } catch (error) {
            console.error("Помилка при оновленні замовлення:", error);
            alert("Не вдалося оновити замовлення!");
        }
    };

    return(
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} className="modal-content">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label>Group:</label>
                    {!isAddingGroup ? (
                        <select
                            value={editOrder?.group || ""}
                            onChange={(e) => setEditOrder(editOrder ? {...editOrder, group: e.target.value} : null)}
                            className="bg-gray-200 p-2 rounded"
                        >
                            <option value="">Select group</option>
                            {groups.map((group, index) => (
                                <option key={index} value={group.name}>{group.name}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={newGroup}
                            onChange={(e) => setNewGroup(e.target.value)}
                            className="bg-gray-200 p-2 rounded"
                            placeholder="Group"
                        />
                    )}

                    {!isAddingGroup ? (
                        <button onClick={() => setIsAddingGroup(true)}
                                className="mt-2 bg-[#43a047] text-white p-2 rounded">
                            ADD GROUP
                        </button>
                    ) : (
                        <div className="flex gap-2 mt-2">
                            <button onClick={handleAddGroup} className="bg-[#43a047] text-white p-2 rounded">
                                ADD
                            </button>
                            <button onClick={() => setIsAddingGroup(false)}
                                    className="bg-[#43a047] text-white p-2 rounded">
                                SELECT
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col"> //TODO validation
                    <label>Status:</label>
                    <select
                        value={editOrder?.status || ""}
                        onChange={(e) => setEditOrder(editOrder ? {
                            ...editOrder,
                            status: e.target.value as StatusEnum
                        } : null)}
                        className="bg-gray-200 p-2 rounded"
                    >
                        <option value={StatusEnum.EMPTY}>-</option>
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
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, name: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Sum:</label>
                    <input
                        type="number"
                        value={editOrder?.sum || ""}
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, sum: Number(e.target.value)} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Surname:</label>
                    <input
                        type="text"
                        value={editOrder?.surname || ""}
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, surname: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Already paid:</label>
                    <input
                        type="number"
                        value={editOrder?.alreadyPaid || ""}
                        onChange={(e) => setEditOrder(editOrder ? {
                            ...editOrder,
                            alreadyPaid: Number(e.target.value)
                        } : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={editOrder?.email || ""}
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, email: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Course:</label>
                    <select
                        value={editOrder?.course || ""}
                        onChange={(e) => setEditOrder(editOrder ? {
                            ...editOrder,
                            course: e.target.value as CourseEnum
                        } : null)}
                        className="bg-gray-200 p-2 rounded"
                    >
                        <option value={CourseEnum.EMPTY}>-</option>
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
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, phone: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Course format:</label>
                    <select
                        value={editOrder?.course_format || ""}
                        onChange={(e) => setEditOrder(editOrder ? {
                            ...editOrder,
                            course_format: e.target.value as CourseFormatEnum
                        } : null)}
                        className="bg-gray-200 p-2 rounded"
                    >
                        <option value={CourseFormatEnum.EMPTY}>-</option>
                        <option value={CourseFormatEnum.ONLINE}>online</option>
                        <option value={CourseFormatEnum.STATIC}>static</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label>Age:</label>
                    <input
                        type="number"
                        value={editOrder?.age || ""}
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, age: Number(e.target.value)} : null)}
                        className="bg-gray-200 p-2 rounded"
                    />
                </div>


                <div className="flex flex-col">
                    <label>Course type:</label>
                    <select
                        value={editOrder?.course_type || ""}
                        onChange={(e) => setEditOrder(editOrder ? {
                            ...editOrder,
                            course_type: e.target.value as CourseTypeEnum
                        } : null)}
                        className="bg-gray-200 p-2 rounded"
                    >
                        <option value={CourseTypeEnum.EMPTY}>-</option>
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
                <button onClick={handleUpdateOrder} className="bg-[#43a047] text-white px-4 py-2 rounded">SUBMIT</button>
            </div>
        </Modal>
    )
}

export default ModalWindowComponent;