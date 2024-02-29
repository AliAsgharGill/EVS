import { NavLink } from "react-router-dom"

const Footer = () => {
    return (
        <>


            <footer className="bg-white rounded-lg w-full shadow dark:bg-gray-300   ">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="flex justify-center items-center mx-auto flex-col  md:flex-row lg:flex-row  sm:flex sm:items-center sm:justify-between">
                        <NavLink href="http://localhost:5173/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={'public/Images/Logo/EvsLogo.jpg'} className="h-8" alt="EVS" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-[#F09A3E]">Voting System</span>
                        </NavLink>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <NavLink to="/" className="hover:underline me-4 md:me-6">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/candidates" className="hover:underline me-4 md:me-6">Candidates List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/vote" className="hover:underline me-4 md:me-6">Vote Now</NavLink>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-[#F09A3E] sm:mx-auto dark:border-gray-[#F09A3E] lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-900">© 2024 <a href="https://flowbite.com/" className="hover:underline">Voting System™</a>. All Rights Reserved.</span>
                </div>
            </footer>


        </>
    )
}

export default Footer
