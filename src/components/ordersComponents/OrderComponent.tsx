import {FC} from 'react';
import {Order} from "../../interfaces/order.interface.ts";

interface OrderComponentProps {
    order: Order;
}

const OrderComponent: FC <OrderComponentProps> = ({ order }) => {
    const {id, name, surname, email, phone, age, course, course_format, course_type, status, sum, alreadyPaid,
        created_at} = order
    return (
        <div className="order-card">
            <table className="min-w-full border-collapse">
                <thead>
                <tr>
                    <th className="border p-2">Поле</th>
                    <th className="border p-2">Значение</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border p-2">ID</td>
                    <td className="border p-2">{id}</td>
                </tr>
                <tr>
                    <td className="border p-2">Имя</td>
                    <td className="border p-2">{name}</td>
                </tr>
                <tr>
                    <td className="border p-2">Фамилия</td>
                    <td className="border p-2">{surname}</td>
                </tr>
                <tr>
                    <td className="border p-2">Email</td>
                    <td className="border p-2">{email}</td>
                </tr>
                <tr>
                    <td className="border p-2">Телефон</td>
                    <td className="border p-2">{phone}</td>
                </tr>
                <tr>
                    <td className="border p-2">Возраст</td>
                    <td className="border p-2">{age}</td>
                </tr>
                <tr>
                    <td className="border p-2">Курс</td>
                    <td className="border p-2">{course}</td>
                </tr>
                <tr>
                    <td className="border p-2">Формат курса</td>
                    <td className="border p-2">{course_format}</td>
                </tr>
                <tr>
                    <td className="border p-2">Тип курса</td>
                    <td className="border p-2">{course_type}</td>
                </tr>
                <tr>
                    <td className="border p-2">Статус</td>
                    <td className="border p-2">{status}</td>
                </tr>
                <tr>
                    <td className="border p-2">Сумма</td>
                    <td className="border p-2">{sum}</td>
                </tr>
                <tr>
                    <td className="border p-2">Уже оплачено</td>
                    <td className="border p-2">{alreadyPaid}</td>
                </tr>
                <tr>
                    <td className="border p-2">Дата создания</td>
                    <td className="border p-2">{new Date(created_at).toLocaleDateString()}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderComponent;