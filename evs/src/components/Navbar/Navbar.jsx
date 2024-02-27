import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <nav className="bg-white dark:bg-gray-300 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-300">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={'public/Images/Logo/EvsLogo.jpg'} className="h-8" alt="EVS" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-[#F09A3E]">Voting System</span>
                    </NavLink>
                    <div className="flex md:order-2 md:space-x-0 rtl:space-x-reverse">

                        <NavLink to={'/login'} type="button" className="text-white bg-[#F09A3E] hover:bg-[#F09A3E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-500 dark:hover:bg-[#F09A3E] dark:hover:text-black dark:focus:ring-[#F09A3E]">Login</NavLink>
                        <span className="w-5"></span>

                        <NavLink to={'/signup'} type="button" className="text-white bg-[#F09A3E] hover:bg-[#F09A3E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-500 dark:hover:bg-[#F09A3E] dark:hover:text-black dark:focus:ring-[#F09A3E]">Signup</NavLink>
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul id="sidebar" className=" flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-300 md:dark:bg-gray-300 dark:border-gray-300">
                            <li>
                                <NavLink to="/" className="hover:underline me-4 md:me-6">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/candidates" className="hover:underline me-4 md:me-6">Candidates</NavLink>
                            </li>
                            <li>
                                <NavLink to="/vote" className="hover:underline me-4 md:me-6">Voting</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
