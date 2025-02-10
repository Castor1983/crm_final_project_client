import {FC} from "react";
import {ManagerInterface} from "../../interfaces/manager.interface.ts";

type Props = {
    manager: ManagerInterface
}

const ManagerComponent: FC<Props> = ({manager}) => {
    return (
        <div className="border p-4 my-2">
            <p>id: {manager.id}</p>
            <p>email: {manager.email}</p>
            <p>name: {manager.name}</p>
            <p>surname: {manager.surname}</p>
            <p>is_active: {manager.is_active ? "true" : "false"}</p>
            <p>last_login: {manager.last_login || "null"}</p>
            <p>total: {manager.orderStats.total || "null"}</p>
            <p>inWork: {manager.orderStats.in_work || "null"}</p>
            <p>new: {manager.orderStats.new || "null"}</p>
            <p>agree: {manager.orderStats.agree || "null"}</p>
            <p>disagree: {manager.orderStats.disagree || "null"}</p>
            <p>dubbing: {manager.orderStats.dubbing || "null"}</p>
        </div>
    );
};

export default ManagerComponent;