import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { Card } from "flowbite-react";

const Index = ({ auth }: PageProps) => {
    const [data, setData] = useState<Record<string, unknown>[]>([]);
    useEffect(() => {
        window.axios
            .get(route("passport.tokens.index"))
            .then((response) => response.data)
            .then((data) => setData(data));
    }, []);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Applications" />

            <div className="px-4 pt-6">
                <Card>
                    <ul>
                        {data.map((client, index) => (
                            <li key={index}>{client["id"] as string}</li>
                        ))}
                    </ul>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
