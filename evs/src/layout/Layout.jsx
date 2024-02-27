import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

const Layout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="mt-10">
                <Footer />
            </footer>
        </>
    )
}

export default Layout
