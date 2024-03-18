import { NavLink } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { logoutUser } from "../../slices/userSlice/userSlice"
import { Button, Modal, Dropdown, Space } from 'antd'
import { FaRegCircleUser } from "react-icons/fa6";
import { DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from 'axios'

const Navbar = () => {
    const dispatch = useDispatch()
    const [change, setChange] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    // console.log("User", user);

    const [isAdmin, setAdmin] = useState(false)

    // check is user admin?
    const checkAdmin = async () => {
        const response = await axios.get('http://localhost:3000/admins')
        const admins = response.data
        // console.log('Admins:', admins);
        const isUserAdmin = admins.find(admin => admin.email === user.email)
        if (isUserAdmin) {
            setAdmin(isUserAdmin)
        }
    }

    if (user) {
        checkAdmin()
    }


    const items = [
        {
            label: <NavLink to='/dashboard'>Dashboard</NavLink>,
            key: '1',
        },
        {
            label: <NavLink to='/campaignspage'>Manage Campaigns</NavLink>,
            key: '2',
        },
    ];

    const handleLogout = () => {
        Modal.confirm({
            title: 'Confirm Logout',
            content: 'Are you sure you want Logout?',
            okButtonProps: { style: { backgroundColor: "#F09A60" } },
            onOk() {
                localStorage.removeItem('user')
                dispatch(logoutUser())
                setChange(true)
            },
            onCancel() { },
        });
    }
    const handleChange = () => {
        setChange(true)
    }
    useEffect(() => {

    }, [change, dispatch])

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-gray-300 ">
            <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="relative flex items-center justify-between">
                    <NavLink
                        to="/"
                        aria-label="Voting System"
                        title="Voting System"
                        className="inline-flex items-center"
                    >
                        <img src={'/Images/Logo/EvsLogo.jpg'} alt="Logo" className="w-16" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-bg-[#F09A3E] uppercase">
                            Voting System
                        </span>
                    </NavLink>
                    <ul className="flex items-center hidden space-x-8   lg:flex">
                        <li>
                            <NavLink to="/" className="hover:underline me-4 font-bold md:me-6">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/candidates" className="hover:underline font-bold me-4 md:me-6">Candidates</NavLink>
                        </li>
                        <li>
                            <NavLink to="/campaigns" className="hover:underline font-bold me-4 md:me-6">Campaigns</NavLink>
                        </li>
                        <li>
                            <NavLink to="/result" className="hover:underline font-bold me-4 md:me-6 ">Result</NavLink>
                        </li>

                    </ul>
                    <div className="space-x-5 hidden sm:block ">
                        {user ?
                            <div className="flex justify-around space-x-5 items-center ">
                                <div className="flex items-center space-x-1 hover:text-[#F09A3E] "  > <FaRegCircleUser /><b>{user.name}</b> </div>
                                {isAdmin &&

                                    <div>
                                        <Dropdown
                                            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                            menu={{
                                                items,
                                            }}
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    Admin
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <NavLink to="/result" className="hover:underline font-bold me-4 md:me-6 ">Dashboard</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/result" className="hover:underline font-bold me-4 md:me-6 ">Manage Campaings</NavLink>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                }

                                <Button type="button" className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                            :
                            <div className="flex justify-around items-center ">
                                <ul className="flex items-center hidden space-x-8 lg:flex">
                                    <li>

                                        <NavLink to={'/login/user'} type="button" className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-[#F09A3E] bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none" onClick={handleChange} >Login</NavLink>
                                        <span className="w-5"></span>
                                    </li>
                                    <li>
                                        <NavLink to={'/signup/user'} type="button" className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-[#F09A3E] bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none" onClick={handleChange}>Signup</NavLink>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>

                    <div className="lg:hidden">
                        <button
                            aria-label="Open Menu"
                            title="Open Menu"
                            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                                />
                            </svg>
                        </button>
                        {isMenuOpen && (
                            <div className="absolute top-0 left-0 w-full z-20">
                                <div className="p-5 bg-white border rounded shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <NavLink
                                                to="/"
                                                aria-label="Voting System"
                                                title="Voting System"
                                                className="inline-flex items-center"
                                            >
                                                <img src={'/Images/Logo/EvsLogo.jpg'} alt="Logo" className="w-16" />
                                                <span className="ml-2 text-xl font-bold tracking-wide text-bg-[#F09A3E] uppercase">
                                                    Voting System
                                                </span>
                                            </NavLink>
                                        </div>
                                        <div>
                                            <button
                                                aria-label="Close Menu"
                                                title="Close Menu"
                                                className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <nav>
                                        <ul className="space-y-4 ">
                                            <li>
                                                <NavLink to="/" className="hover:underline me-4 font-bold md:me-6">Home</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/candidates" className="hover:underline me-4 md:me-6 font-bold">Candidates</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/campaigns" className="hover:underline me-4 md:me-6 font-bold">Campaigns</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/result" className="hover:underline me-4 md:me-6 font-bold">Result</NavLink>
                                            </li>
                                            {!user &&
                                                <div className=" flex-col space-y-5   ">
                                                    <li>
                                                        <NavLink to={'/login/user'} type="button" className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-[#F09A3E] bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none" onClick={handleChange} >Login</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/signup/user'} type="button" className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-[#F09A3E] bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none" onClick={handleChange}>Signup</NavLink>
                                                    </li>
                                                </div>
                                            }
                                            {/* UserName and Logout on small screen */}
                                            <div className="space-x-5  sm:hidden ">
                                                {user ?
                                                    <div>
                                                        <div className=" flex-col justify-center space-y-5 items-center ">
                                                            <div className="flex items-center justify-center space-x-1 hover:text-[#F09A3E] "  >
                                                                <FaRegCircleUser /><b>{user.name}</b>
                                                            </div>
                                                            {isAdmin &&
                                                                <div>
                                                                    <Dropdown
                                                                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                                                        menu={{
                                                                            items,
                                                                        }}
                                                                    >
                                                                        <a onClick={(e) => e.preventDefault()}>
                                                                            <Space>
                                                                                Admin
                                                                                <DownOutlined />
                                                                            </Space>
                                                                        </a>
                                                                    </Dropdown>
                                                                    <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                                            <li>
                                                                                <NavLink to="/result" className="hover:underline font-bold me-4 md:me-6 ">Dashboard</NavLink>
                                                                            </li>
                                                                            <li>
                                                                                <NavLink to="/result" className="hover:underline font-bold me-4 md:me-6 ">Manage Campaings</NavLink>
                                                                            </li>
                                                                        </ul>
                                                                    </div>

                                                                </div>
                                                            }
                                                            <Button type="button" className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none hover:bg-[#F09A3E]" onClick={handleLogout}>
                                                                Logout
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="flex justify-around items-center ">
                                                        <ul className="flex items-center hidden space-x-8 lg:flex">
                                                            <li>

                                                                <NavLink to={'/login/user'} type="button" className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-[#F09A3E] bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none" onClick={handleChange} >Login</NavLink>
                                                                <span className="w-5"></span>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/signup/user'} type="button" className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-[#F09A3E] bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none" onClick={handleChange}>Signup</NavLink>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Navbar