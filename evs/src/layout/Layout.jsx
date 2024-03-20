import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { message, Alert } from 'antd'
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

const OfflineMessage = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            message.success('Your network connection has been restored.');
        };
        const handleOffline = () => {
            setIsOnline(false);
            message.error('Connection Lost!');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return !isOnline && <Alert
        className="mt-2"
        message="No internet connection."
        description=""
        type="warning"
        showIcon
    // closable
    />;
};

const Layout = () => {

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <OfflineMessage />
                <Outlet />
            </main>
            <footer className="mt-10">
                <Footer />
            </footer>
        </>
    )
}

export default Layout
