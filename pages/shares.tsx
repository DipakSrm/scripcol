import { useEffect, useState } from "react";
import { useAuth } from "./hooks/authenication";
import { database } from "@/utils/appwrite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Share {
    $id: string;
    Name: string;
    Units: number;
    Rate: number;
    Ref_Id: string;
    Type: string;
}

interface AggregatedShare {
    Name: string;
    TotalUnits: number;
    TotalRate: number;
    Type: string
    Items: Share[];
}

interface ShareProps {
    [x: string]: any;
    data: Share[];
}

export default function Shares() {
    const { user, loading } = useAuth();
    const [data, setData] = useState<AggregatedShare[]>();

    useEffect(() => {
        if (user) {
            getdata();
        }
    }, [user]);

    const getdata = async () => {
        try {
            if (user) {
                const response: any = await database.listDocuments(
                    "64fb507e57d794c91f2f",
                    "64fb511ad635c541e6cf"
                );

                // Aggregate shares by Name
                const aggregatedData: AggregatedShare[] = [];

                for (const share of response.documents) {
                    const existingShare = aggregatedData.find((s) => s.Name === share.Name);

                    if (existingShare) {
                        // Update existing aggregated share
                        existingShare.TotalUnits += share.Units;
                        existingShare.TotalRate = (existingShare.TotalRate + share.Rate) / 2;
                        existingShare.Items.push(share);
                    } else {
                        // Create a new aggregated share entry
                        const newAggregatedShare: AggregatedShare = {
                            Name: share.Name,
                            TotalUnits: share.Units,
                            TotalRate: share.Rate,
                            Type: share.Type,
                            Items: [share],
                        };
                        aggregatedData.push(newAggregatedShare);
                    }
                }

                setData(aggregatedData);

            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border border-gray-300">Name</th>
                        <th className="py-2 px-4 border border-gray-300">Units</th>
                        <th className="py-2 px-4 border border-gray-300">Rate</th>
                        <th className="py-2 px-4 border border-gray-300">Type</th>
                        <th className="py-2 px-4 border border-gray-300">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((aggShare) => (
                            <tr key={aggShare.Name}>
                                <td className="py-2 px-4 border border-gray-300">
                                    {aggShare.Name}
                                </td>
                                <td className="py-2 px-4 border border-gray-300">
                                    {aggShare.TotalUnits}
                                </td>
                                <td className="py-2 px-4 border border-gray-300">
                                    {aggShare.TotalRate}
                                </td>
                                <td className="py-2 px-4 border border-gray-300">{aggShare.Type}</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    {aggShare.TotalRate * aggShare.TotalUnits}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}
