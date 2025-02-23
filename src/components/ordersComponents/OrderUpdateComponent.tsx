import {FC, useEffect, useState} from "react";

import {useOrdersStore} from "../../store/orders.ts";
import {useGroupsStore} from "../../store/groups.ts";
import {editOrderSchema} from "../../validators/orderValidators.ts";
import {Order} from "../../interfaces/order.interface.ts";
import { toast } from "react-toastify";
import {fetchAddGroup, fetchGroups, fetchUpdateOrder} from "../../requests/requests.ts";
import OrderFormUpdateComponent from "./OrderFormUpdateComponent.tsx";



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
            fetchGroups(setGroups);
    }, [isAddingGroup]);

    useEffect(() => {
        if (editOrder) {
            setInitialOrder(editOrder);
        }
    }, []);

    const handleAddGroup = async () => {
        if (newGroup.trim().length < 4) {
            setValidationErrors((prev) => ({
                ...prev,
                group: "The group name must contain at least 4 characters",
            }));
            return;
        }
        if (groups.some(group => group.name === newGroup)) {
            setValidationErrors((prev) => ({
                ...prev,
                group: "The group is already exist!",
            }));
            return;
        }
        try {
            const response = await fetchAddGroup(newGroup)
            const newGroups = [...groups, response.data];
            setGroups(newGroups);

            setEditOrder(editOrder ? { ...editOrder, group: newGroup } : null);

            setNewGroup('');
            setIsAddingGroup(false);
            setValidationErrors((prev) => ({ ...prev, group: "" }));
        } catch (error) {
            console.error("the group adding is error. Try again.", error);
            toast.error("the group adding is error. Try again.")
            setValidationErrors((prev) => ({
                ...prev,
                group: "the group adding is error. Try again.",
            }));
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

        if (!editOrder || !initialOrder ) return;
        if(editOrder === initialOrder) {
            toast.info('No changes were made', {autoClose: 1000})
            setTimeout(()=> {
                setIsModalOpen(false)
            }, 2000)
                return
        }

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
           await fetchUpdateOrder(orderId, updatedOrder)
            toast.success("The order has been updated successfully!", { autoClose: 3000 });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Update order is error", error);
            toast.error("Update order is error")
        }
    };

    return(

     <OrderFormUpdateComponent isModalOpen={isModalOpen}
                           validationErrors={validationErrors}
                           handleAddGroup={handleAddGroup}
                           handleCloseModal={handleCloseModal}
                           handleUpdateOrder={handleUpdateOrder}
                           isAddingGroup={isAddingGroup}
                           setIsAddingGroup={setIsAddingGroup}/>
    )
}

export default OrderUpdateComponent;