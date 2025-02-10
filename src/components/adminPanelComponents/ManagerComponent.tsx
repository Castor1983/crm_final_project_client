import {FC} from "react";
import {ManagerInterface} from "../../interfaces/manager.interface.ts";

type Props = {
    manager: ManagerInterface
}

const ManagerComponent: FC<Props> = ({manager}) => {
    return (
        <div className="border-red-700 p-4 my-2 w-[100%]">
            <p>id: {manager.id}</p>
            <p>email: {manager.email}</p>
            <p>name: {manager.name}</p>
            <p>surname: {manager.surname}</p>
            <p>is_active: {manager.is_active ? "true" : "false"}</p>
            <p>last_login: {manager.last_login || "null"}</p>
            <p>total: {manager.orderStats.total || "null"}</p>
            {manager.orderStats.in_work && manager.orderStats.in_work !== "null" && <p>inWork: {manager.orderStats.in_work }</p>}
            {manager.orderStats.new && manager.orderStats.new !== "null" && <p>new: {manager.orderStats.new || "null"}</p>}
    {manager.orderStats.agree && manager.orderStats.agree !== "null" && <p>agree: {manager.orderStats.agree }</p>}
        {manager.orderStats.disagree && manager.orderStats.disagree !== "null" && <p>disagree: {manager.orderStats.disagree }</p>}
            {manager.orderStats.dubbing && manager.orderStats.dubbing !== "null" && <p>dubbing: {manager.orderStats.dubbing}</p>}
        </div>
    );
};

export default ManagerComponent;