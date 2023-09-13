import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head } from "@inertiajs/react";
import { Button, Card, Table } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";

const Index = ({
    auth,
    users,
}: PageProps & {
    users: User[];
}) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <div className="px-4 pt-6">
                <Card>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>

                        <Table.Body>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.name}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center">
                                                <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
                                                Active
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex items-center gap-x-3 whitespace-nowrap">
                                                <Button color="indigo">
                                                    <div className="flex items-center gap-x-2">
                                                        <HiPencil className="text-lg" />
                                                        <span>Edit Users</span>
                                                    </div>
                                                </Button>
                                                <Button color="failure">
                                                    <div className="flex items-center gap-x-2">
                                                        <HiTrash className="text-lg" />
                                                        <span>
                                                            Delete users
                                                        </span>
                                                    </div>
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row className="text-center">
                                    <Table.Cell colSpan={4}>
                                        {"Tidak ada data"}
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
