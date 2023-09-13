import {
    useState,
    PropsWithChildren,
    ReactNode,
    useEffect,
    FormEventHandler,
} from "react";
import { User } from "@/types";
import {
    CustomFlowbiteTheme,
    DarkThemeToggle,
    Flowbite,
    Navbar,
    Sidebar,
    TextInput,
    Tooltip,
} from "flowbite-react";

import {
    HiBell,
    HiMenuAlt1,
    HiOutlineX,
    HiSearch,
    HiUsers,
    HiDesktopComputer,
    HiChartPie,
} from "react-icons/hi";
import { HiMiniSquares2X2 } from "react-icons/hi2";

import useWindowDimension from "@/hooks/useWindowDimension";
import { Link, router } from "@inertiajs/react";
import { config } from "process";
export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [sidebarCollapse, setSidebarCollapse] = useState<boolean>(false);
    const { width } = useWindowDimension();

    useEffect(() => {
        if (width < 1024) {
            setSidebarCollapse(true);
        } else {
            setSidebarCollapse(false);
        }
    }, [width]);

    const toggleSidebar = () => {
        setSidebarCollapse((previousValue) => !previousValue);
    };

    const customTheme: CustomFlowbiteTheme = {
        navbar: {
            root: {
                base: "navbar-root-base",
                inner: {
                    base: "navbar-root-inner",
                },
            },
        },
        sidebar: {
            root: {
                base: "sidebar-base",
                inner: "sidebar-inner",
            },
        },
        tooltip: {
            target: "tooltip-target",
            base: "z-10 w-fit rounded-xl divide-y divide-gray-100 shadow transition-opacity duration-100 border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
        },
    };

    const logout: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(route("logout"));
    };

    const userProfileContent = (
        <div className="rounded-xl text-sm text-gray-700 dark:text-gray-200">
            <ul>
                <div className="block py-2 px-4 text-sm text-gray-700 dark:text-gray-200">
                    <span className="block text-sm">{user.name}</span>
                    <span className="block truncate text-sm font-medium">
                        {user.email}
                    </span>
                </div>
                <li className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-whiteflex cursor-pointer dark:hover:text-white">
                    <form onSubmit={logout}>
                        <button type="submit">Logout</button>
                    </form>
                </li>
            </ul>
        </div>
    );

    return (
        <Flowbite theme={{ theme: customTheme }}>
            <Navbar fluid>
                <div className="w-full p-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline"
                                onClick={toggleSidebar}
                            >
                                <span className="sr-only">Toggle sidebar</span>
                                {sidebarCollapse ? (
                                    <HiMenuAlt1 className="h-6 w-6" />
                                ) : (
                                    <HiOutlineX className="h-6 w-6" />
                                )}
                            </button>
                            <Navbar.Brand href="https://flowbite-react.com">
                                <img
                                    alt="Flowbite React Logo"
                                    className="mr-3 h-6 sm:h-9"
                                    src="https://flowbite.com/docs/images/logo.svg"
                                />
                                <span className="hidden self-center whitespace-nowrap text-xl font-semibold dark:text-white md:inline">
                                    Accounts UAI
                                </span>
                            </Navbar.Brand>
                        </div>

                        <div className="flex items-center lg:gap-3">
                            <div className="flex items-center">
                                <Tooltip trigger="click" content="Nothing">
                                    <button className="flex items-center">
                                        <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span className="sr-only">
                                                Notifications
                                            </span>
                                            <HiBell className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
                                        </span>
                                    </button>
                                </Tooltip>
                                <Tooltip trigger="click" content="Nothing">
                                    <button className="flex items-center">
                                        <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span className="sr-only">
                                                Notifications
                                            </span>
                                            <HiMiniSquares2X2 className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
                                        </span>
                                    </button>
                                </Tooltip>
                                <DarkThemeToggle />
                            </div>
                            <div className="hidden lg:block">
                                <Tooltip
                                    trigger="click"
                                    style="auto"
                                    placement="bottom-end"
                                    content={userProfileContent}
                                >
                                    <button className="flex items-center">
                                        <span>
                                            <span className="sr-only">
                                                User menu
                                            </span>
                                            <div
                                                className="flex justify-center items-center space-x-4"
                                                data-testid="flowbite-avatar"
                                            >
                                                <div className="relative">
                                                    <img
                                                        alt=""
                                                        className="!rounded-full w-8 h-8"
                                                        data-testid="flowbite-avatar-img"
                                                        src="https://flowbite-pro-react-admin-dashboard.vercel.app/images/users/neil-sims.png"
                                                    />
                                                </div>
                                            </div>
                                        </span>
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </Navbar>

            <div className="flex items-start pt-16">
                <div className={`lg:!block ${sidebarCollapse ? "hidden" : ""}`}>
                    <Sidebar as="aside" collapsed={sidebarCollapse}>
                        <div className="flex h-full flex-col justify-between py-2">
                            <div>
                                <form className="pb-3 md:hidden">
                                    <TextInput
                                        placeholder="Search"
                                        icon={HiSearch}
                                    />
                                </form>
                                <Sidebar.Items>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item
                                            as={Link}
                                            icon={HiChartPie}
                                            href={route("dashboard")}
                                        >
                                            Dashboard
                                        </Sidebar.Item>

                                        <Sidebar.Item
                                            as={Link}
                                            icon={HiDesktopComputer}
                                            href={route("applications.index")}
                                        >
                                            Applications
                                        </Sidebar.Item>

                                        <Sidebar.Item
                                            as={Link}
                                            icon={HiUsers}
                                            href={route("users.index")}
                                        >
                                            Users
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                            </div>
                        </div>
                    </Sidebar>
                </div>

                <main
                    className={`overflow-y-auto relative w-full h-full bg-gray-50 dark:bg-gray-900 ${
                        sidebarCollapse ? "lg:ml-16" : "lg:ml-64"
                    }`}
                >
                    {children}
                </main>
            </div>
        </Flowbite>
    );
}
