import {FC} from "react";
import {ManagerInterface} from "../../interfaces/manager.interface.ts";

type Props = {
    manager: ManagerInterface
}

const ManagerComponent: FC<Props> = ({manager}) => {
    return (
        <div className="grid grid-cols-3 m-2 p-3 rounded border-1 border-green-500  text-[12px]">

            <div className="">
                <p>id: {manager.id}</p>
                <p>email: {manager.email}</p>
                <p>name: {manager.name}</p>
                <p>surname: {manager.surname}</p>
                <p>is_active: {manager.is_active ? "true" : "false"}</p>
                <p>last_login: {manager.last_login || "null"}</p>
            </div>


            <div>
                <p>total: {manager.orderStats.total || "null"}</p>
                {manager.orderStats.in_work && manager.orderStats.in_work !== "null" && manager.orderStats.in_work !== "0" &&
                    <p>inWork: {manager.orderStats.in_work}</p>}
                {manager.orderStats.new && manager.orderStats.new !== "null" && manager.orderStats.new !== "0" &&
                    <p>new: {manager.orderStats.new || "null"}</p>}
                {manager.orderStats.agree && manager.orderStats.agree !== "null" && manager.orderStats.agree !== "0" &&
                    <p>agree: {manager.orderStats.agree}</p>}
                {manager.orderStats.disagree && manager.orderStats.disagree !== "null" && manager.orderStats.disagree !== "0" &&
                    <p>disagree: {manager.orderStats.disagree}</p>}
                {manager.orderStats.dubbing && manager.orderStats.dubbing !== "null" && manager.orderStats.dubbing !== "0" &&
                    <p>dubbing: {manager.orderStats.dubbing}</p>}
            </div>
            <div className="flex justify-between items-start ">
                <button className="bg-[#43a047] hover:bg-green-700 rounded text-white px-4 py-1">{manager.is_active ? "RECOVERY PASSWORD" : "ACTIVATE"}</button>
                <button className="bg-[#43a047] hover:bg-green-700 rounded text-white px-4 py-1">BAN</button>
                <button className="bg-[#43a047] hover:bg-green-700 rounded text-white px-4 py-1">UNBAN</button>
            </div>
        </div>
    );
};

export default ManagerComponent;