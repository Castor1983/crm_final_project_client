import {FC} from "react";
import AdminPanelComponent from "../../components/adminPanelComponents/AdminPanelComponent.tsx";
import LayoutComponent from "../../components/LayoutComponent.tsx";

const AdminPanelPage: FC = () => {

    return (
        <LayoutComponent>
            <div className="flex min-h-screen items-center justify-center bg-[#76b852]">
                <AdminPanelComponent/>
            </div>
        </LayoutComponent>

    );
};

export default AdminPanelPage;