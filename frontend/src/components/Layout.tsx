
import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen bg-gray-100 flex flex-col items-center p-6">
            <NavBar />
            <div className="w-full flex-grow flex">
                {children}
            </div>
        </div>
    );
};

export default Layout;
