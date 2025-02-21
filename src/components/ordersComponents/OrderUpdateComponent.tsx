import {FC, useEffect, useState} from "react";
import {StatusEnum} from "../../enums/status.enum.ts";
import {CourseEnum} from "../../enums/course.enum.ts";
import {CourseFormatEnum} from "../../enums/courseFormat.enum.ts";
import {CourseTypeEnum} from "../../enums/courseType.enum.ts";
import Modal from "react-modal";
import {useOrdersStore} from "../../store/orders.ts";
import {useGroupsStore} from "../../store/groups.ts";
import {urls} from "../../common/urls.ts";
import {apiAuth} from "../../services/api.ts";
import {editOrderSchema} from "../../validators/orderValidators.ts";
import {Order} from "../../interfaces/order.interface.ts";

type Props = {
    isModalOpen: boolean
    setIsModalOpen: (open: boolean) => void
}
const OrderUpdateComponent: FC <Props> = ({isModalOpen, setIsModalOpen}) => {
    const {editOrder, setEditOrder} = useOrdersStore()
    const {groups, setGroups, newGroup, setNewGroup}=useGroupsStore()
    const [isAddingGroup, setIsAddingGroup] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
    const [initialOrder, setInitialOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await apiAuth.get(urls.orders.groups)

                setGroups(response.data);
            } catch (error) {
                console.error("Помилка при отриманні груп:", error);//TODO
            }
        };
            fetchGroups();
    }, [isAddingGroup]);
    useEffect(() => {
        if (editOrder) {
            setInitialOrder(editOrder);
        }
    }, []);

    const handleAddGroup = async () => {
        if (!newGroup.trim()) return;
        if (groups.some(group => group.name === newGroup)) {
            alert("Група з такою назвою вже існує!"); //TODO
            return;
        }
        try {
            const response = await apiAuth.post(
                urls.orders.groups,
                { name: newGroup },
            );
            const newGroups = [...groups, response.data];
            setGroups(newGroups);

            setEditOrder(editOrder ? { ...editOrder, group: newGroup } : null);

            setNewGroup('');
            setIsAddingGroup(false);
        } catch (error) {
            console.error("Помилка при додаванні групи:", error);//TODO
        }
    };

    const handleCloseModal = () => {
        setEditOrder(null);
        setTimeout(() => setIsModalOpen(false), 100);
    };

    const getUpdatedFields = (updatedOrder: Order, initialOrder: Order | null) => {
        if (!initialOrder) return updatedOrder;

        return Object.keys(updatedOrder).reduce((changes, key) => {
            const typedKey = key as keyof Order;

            if (updatedOrder[typedKey] !== initialOrder[typedKey]) {
                changes[typedKey] = updatedOrder[typedKey] ?? undefined;
            }

            return changes;
        }, {} as Partial<Record<keyof Order, string | number | undefined>>);
    };
    const handleUpdateOrder = async () => {

        if (!editOrder || !initialOrder) return;

    const orderId = editOrder.id?.toString();
    const updatedFields = getUpdatedFields(editOrder, initialOrder);
    const updatedOrder = Object.fromEntries(
            Object.entries(updatedFields).map(([key, value]) => [
                key,
                value === "" || value === null
                    ? null
                    : typeof value === "string" && !isNaN(Number(value)) && key !== "phone"
                        ? Number(value)
                        : value,
            ])
        );

        const {name, age, alreadyPaid, email, surname, sum, phone} = updatedOrder
        const { error } = editOrderSchema.validate({ name, age, alreadyPaid, email, surname, sum, phone}, { abortEarly: false });

        if (error) {
            const errors: Record<string, string> = error.details.reduce((acc: Record<string, string>, err) => {
                acc[err.path[0]] = err.message;
                return acc;
            }, {});

            setValidationErrors(errors);
            return;
        }
        setValidationErrors({});
        try {
            await apiAuth.patch(
                urls.orders.editOrder(orderId),
               updatedOrder,
            );
            alert("Замовлення оновлено успішно!"); //TODO
            setIsModalOpen(false);
        } catch (error) {
            console.error("Помилка при оновленні замовлення:", error);
            alert("Не вдалося оновити замовлення!"); // todo
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
                            onChange={(e) => setEditOrder(editOrder ? { ...editOrder, group: e.target.value } : null)}
                            className="bg-gray-200 p-2 rounded focus:outline-none"
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
                            className="bg-gray-200 p-2 rounded focus:outline-none"
                            placeholder="Group"
                        />

                    )}
                {validationErrors.group && <span className="text-red-500">{validationErrors.group}</span>}
                    {!isAddingGroup ? (
                        <button onClick={() => setIsAddingGroup(true)}
                                className="mt-2 bg-[#43a047] text-white p-2 rounded hover:bg-green-700">
                            ADD GROUP
                        </button>
                    ) : (
                        <div className="flex gap-2 mt-2">
                            <button onClick={handleAddGroup} className="bg-[#43a047] text-white p-2 rounded hover:bg-green-700">
                                ADD
                            </button>
                            <button onClick={() => setIsAddingGroup(false)}
                                    className="bg-[#43a047] text-white p-2 rounded hover:bg-green-700">
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
                        className="bg-gray-200 p-2 rounded focus:outline-none"
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
                        className="bg-gray-200 p-2 rounded focus:outline-none"
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
                        className="bg-gray-200 p-2 rounded appearance-none no-spinner focus:outline-none"
                    />
                    {validationErrors.sum && <span className="text-red-500">{validationErrors.sum}</span>}
                </div>

                <div className="flex flex-col">
                    <label>Surname:</label>
                    <input
                        type="text"
                        value={editOrder?.surname || ""}
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, surname: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded focus:outline-none"
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
                        className="bg-gray-200 p-2 rounded  appearance-none no-spinner focus:outline-none"
                    />
                    {validationErrors.alreadyPaid && <span className="text-red-500">{validationErrors.alreadyPaid}</span>}
                </div>

                <div className="flex flex-col">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={editOrder?.email || ""}
                        onChange={(e) => setEditOrder(editOrder ? {...editOrder, email: e.target.value} : null)}
                        className="bg-gray-200 p-2 rounded focus:outline-none"
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
                        className="bg-gray-200 p-2 rounded focus:outline-none"
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
                        className="bg-gray-200 p-2 rounded focus:outline-none"
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
                        className="bg-gray-200 p-2 rounded focus:outline-none"
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
                        className="bg-gray-200 p-2 rounded appearance-none no-spinner focus:outline-none"
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
                        className="bg-gray-200 p-2 rounded focus:outline-none"
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
                <button onClick={handleCloseModal} className="bg-[#43a047] text-white px-4 py-2 rounded hover:bg-green-700">
                    CLOSE
                </button>
                <button onClick={handleUpdateOrder} className="bg-[#43a047] text-white px-4 py-2 rounded hover:bg-green-700">SUBMIT</button>
            </div>
        </Modal>
    )
}

export default OrderUpdateComponent;