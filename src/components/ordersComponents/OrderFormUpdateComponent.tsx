import Modal from "react-modal";
import {buttonClass, inputClass} from "../../styles/styles.ts";
import {StatusEnum} from "../../enums/status.enum.ts";
import {CourseEnum} from "../../enums/course.enum.ts";
import {CourseFormatEnum} from "../../enums/courseFormat.enum.ts";
import {CourseTypeEnum} from "../../enums/courseType.enum.ts";
import React, { FC } from "react";
import {useGroupsStore} from "../../store/groups.ts";
import {useOrdersStore} from "../../store/orders.ts";

type Props = {
    isModalOpen: boolean,
    validationErrors: Record<string, string>;
    isAddingGroup: boolean,
    setIsAddingGroup: React.Dispatch<React.SetStateAction<boolean>>,
    handleAddGroup: () => void,
    handleCloseModal: () => void,
    handleUpdateOrder: () => void
}

const OrderFormUpdateComponent: FC<Props> = ({isModalOpen, handleUpdateOrder, handleCloseModal, handleAddGroup, validationErrors, setIsAddingGroup, isAddingGroup }) => {
    const {groups, newGroup, setNewGroup}=useGroupsStore();
            const {editOrder, setEditOrder} = useOrdersStore();

    return (
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} className="modal-content">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label>Group:</label>
                    {!isAddingGroup ? (
                        <select
                            value={editOrder?.group || ""}
                            onChange={(e) => setEditOrder(editOrder ? { ...editOrder, group: e.target.value } : null)}
                            className={inputClass}
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
                            className={inputClass}
                            placeholder="Group"
                        />

                    )}
                    {validationErrors.group && <span className="text-red-500">{validationErrors.group}</span>}
                    {!isAddingGroup ? (
                        <button onClick={() => setIsAddingGroup(true)}
                                className={buttonClass}>
                            ADD GROUP
                        </button>
                    ) : (
                        <div className="flex gap-2 mt-2">
                            <button onClick={handleAddGroup} className={buttonClass}>
                                ADD
                            </button>
                            <button onClick={() => setIsAddingGroup(false)}
                                    className={buttonClass}>
                                SELECT
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <label>Status:</label>
                    <select
                        value={editOrder?.status || ""}
                        onChange={(e) => setEditOrder(editOrder ? {
                            ...editOrder,
                            status: e.target.value as StatusEnum
                        } : null)}
                        className={inputClass}
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
                        className={inputClass}
                    />
                    {validationErrors.name && <span className="text-red-500">{validationErrors.name}</span>}
                </div>

                <div className="flex flex-col">
                    <label>Sum:</label>
                    <input
                        type="number"
                        value={editOrder?.sum ?? ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEditOrder(editOrder ? { ...editOrder, sum: value === "" ? null : Number(value) } : null);
                        }}
                        className={`${inputClass} appearance - none no-spinner`}
                    />
                    {validationErrors.sum && <span className="text-red-500">{validationErrors.sum}</span>}
                </div>

                <div className="flex flex-col">
                    <label>Surname:</label>
                    <input
                        type="text"
                        value={editOrder?.surname || ""}
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, surname: e.target.value} : null)}
                        className={inputClass}
                    />
                    {validationErrors.surname && <span className="text-red-500">{validationErrors.surname}</span>}
                </div>

                <div className="flex flex-col">
                    <label>Already paid:</label>
                    <input
                        type="number"
                        value={editOrder?.alreadyPaid ?? ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEditOrder(editOrder ? { ...editOrder, alreadyPaid: value === "" ? null : Number(value) } : null);
                        }}
                        className={`${inputClass} appearance - none no-spinner`}
                    />
                    {validationErrors.alreadyPaid && <span className="text-red-500">{validationErrors.alreadyPaid}</span>}
                </div>

                <div className="flex flex-col">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={editOrder?.email || ""}
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, email: e.target.value} : null)}
                        className={inputClass}
                    />
                    {validationErrors.email && <span className="text-red-500">{validationErrors.email}</span>}
                </div>

                <div className="flex flex-col">
                    <label>Course:</label>
                    <select
                        value={editOrder?.course || ""}
                        onChange={(e) => setEditOrder(editOrder ? {
                            ...editOrder,
                            course: e.target.value as CourseEnum
                        } : null)}
                        className={inputClass}
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

                        onChange={(e) => {
                            const value = e.target.value;
                            setEditOrder(editOrder ? {...editOrder, phone: value} : null)
                        }}
                        className={inputClass}
                    />
                    {validationErrors.phone && <span className="text-red-500">{validationErrors.phone}</span>}
                </div>

                <div className="flex flex-col">
                    <label>Course format:</label>
                    <select
                        value={editOrder?.course_format || ""}
                        onChange={(e) => setEditOrder(editOrder ? {
                            ...editOrder,
                            course_format: e.target.value as CourseFormatEnum
                        } : null)}
                        className={inputClass}
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
                        value={editOrder?.age ?? ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEditOrder(editOrder ? { ...editOrder, age: value === "" ? null : Number(value) } : null);
                        }}
                        className={`${inputClass} appearance - none no-spinner`}
                    />
                    {validationErrors.age && <span className="text-red-500">{validationErrors.age}</span>}
                </div>


                <div className="flex flex-col">
                    <label>Course type:</label>
                    <select
                        value={editOrder?.course_type || ""}
                        onChange={(e) => setEditOrder(editOrder ? {
                            ...editOrder,
                            course_type: e.target.value as CourseTypeEnum
                        } : null)}
                        className={inputClass}
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
                <button onClick={handleCloseModal} className={buttonClass}>
                    CLOSE
                </button>
                <button onClick={handleUpdateOrder} className={buttonClass}>SUBMIT</button>
            </div>
        </Modal>
    );
};

export default OrderFormUpdateComponent;