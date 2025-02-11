import {FC} from "react";
import AdminPanelComponent from "../../components/adminPanelComponents/AdminPanelComponent.tsx";
import LayoutComponent from "../../components/LayoutComponent.tsx";

const AdminPanelPage: FC = () => {

    return (
        <LayoutComponent>
            <div className="flex">
                <AdminPanelComponent/>
            </div>
        </LayoutComponent>

    );
};

export default AdminPanelPage;