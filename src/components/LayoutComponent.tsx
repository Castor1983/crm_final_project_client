import HeaderComponent from "./headerComponents/HeaderComponent.tsx";
import FooterComponent from "./footerComponents/FooterComponent.tsx";
import {ReactNode} from "react";

const LayoutComponent = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComponent />
            <main className="flex-grow">{children}</main>
            <FooterComponent />
        </div>
    );
};

export default LayoutComponent;