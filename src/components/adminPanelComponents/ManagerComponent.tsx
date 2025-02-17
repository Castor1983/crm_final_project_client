import {FC, useState} from "react";

import {ManagerInterface} from "../../interfaces/manager.interface.ts";
import {urls} from "../../common/urls.ts";
import {apiAuth} from "../../services/api.ts";

type Props = {
    manager: ManagerInterface
    onUpdate: () => void;
}

const ManagerComponent: FC<Props> = ({manager, onUpdate}) => {
    const [activationLink, setActivationLink] = useState("");
    const [ban, setBan] = useState<boolean>(manager.is_banned)
    const [buttonText, setButtonText] = useState(manager.is_active ? "RECOVERY PASSWORD" : "ACTIVATE");

    const handleActivate = async () => {
        const response = await apiAuth.post(urls.managers.activateManager(manager.id),//todo
            )
        setActivationLink(response.data.activationLink);
        setButtonText("COPY TO CLIPBOARD");
    }

    const handleRecovery = async () => {
        const response = await apiAuth.post(urls.managers.deactivate(manager.id),//todo
        )
        setActivationLink(response.data.activationLink);
        setButtonText("COPY TO CLIPBOARD");
    }


    const copyToClipboard = () => {
        if (activationLink) {
            navigator.clipboard.writeText(activationLink);
            setButtonText("COPIED! ✅");
            setTimeout(() => setButtonText("COPY TO CLIPBOARD"), 2000);
        }
    };
    const handleBan = async () => {
        try {
            await apiAuth.patch(urls.managers.ban(manager.id),);
            setBan(true);
            setButtonText("ACTIVATE")
            onUpdate();
        } catch (error) {
            console.error("Ban error:", error);//todo
        }
    };

    const handleUnban = async () => {
        try {
            await apiAuth.patch(urls.managers.unban(manager.id));
            setBan(false);
            onUpdate();
            setButtonText("RECOVERY PASSWORD")
        } catch (error) {
            console.error("Unban error:", error);//todo
        }
    };


    return (
        <div className="grid grid-cols-3 m-2 p-3 rounded border-1 border-green-500  text-[12px]">

            <div>
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
                <button
                    onClick={() => {
                        if (buttonText === "RECOVERY PASSWORD") {
                            handleRecovery();
                        } else if (activationLink) {
                            copyToClipboard();
                        } else {
                            handleActivate();
                        }
                    }}
                    className="bg-[#43a047] hover:bg-green-700 rounded text-white px-4 py-1"
                >
                    {buttonText}
                </button>
                <button  onClick={ban ? handleUnban : handleBan}
                         className="bg-[#43a047] hover:bg-green-700 rounded text-white px-4 py-1 transition-all duration-200"
                >
                    {ban ? "UNBAN" : "BAN"}
                </button>

            </div>
        </div>
    );
};

export default ManagerComponent;