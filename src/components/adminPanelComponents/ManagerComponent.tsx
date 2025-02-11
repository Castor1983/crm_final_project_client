import {FC} from "react";
import {ManagerInterface} from "../../interfaces/manager.interface.ts";

type Props = {
    manager: ManagerInterface
}

const ManagerComponent: FC<Props> = ({manager}) => {
    return (
        <div className="border-1 border-green-500  rounded w-[100vh] p-4 my-2">
            <p>id: {manager.id}</p>
            <p>email: {manager.email}</p>
            <p>name: {manager.name}</p>
            <p>surname: {manager.surname}</p>
            <p>is_active: {manager.is_active ? "true" : "false"}</p>
            <p>last_login: {manager.last_login || "null"}</p>
            <p>total: {manager.orderStats.total || "null"}</p>
            {manager.orderStats.in_work && manager.orderStats.in_work !== "null" && manager.orderStats.in_work !== "0" && <p>inWork: {manager.orderStats.in_work }</p>}
            {manager.orderStats.new && manager.orderStats.new !== "null" && manager.orderStats.new !== "0" && <p>new: {manager.orderStats.new || "null"}</p>}
            {manager.orderStats.agree && manager.orderStats.agree !== "null" && manager.orderStats.agree !== "0" && <p>agree: {manager.orderStats.agree }</p>}
            {manager.orderStats.disagree && manager.orderStats.disagree !== "null" && manager.orderStats.disagree !== "0" && <p>disagree: {manager.orderStats.disagree }</p>}
            {manager.orderStats.dubbing && manager.orderStats.dubbing !== "null" && manager.orderStats.dubbing !== "0" && <p>dubbing: {manager.orderStats.dubbing}</p>}
        </div>
    );
};

export default ManagerComponent;