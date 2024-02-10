import { useEffect, useState } from "react";
import { useAuth } from "./hooks/authenication";
import { database } from "@/utils/appwrite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Query } from "appwrite";

// interface Share {
//     $id: string;
//     Name: string;
//     Units: number;
//     Rate: number;
//     Ref_Id: string;
//     Type: string;
// }

interface AggregatedShare {
    Name: string;
    TotalUnits: number;
    TotalRate: number;
    Type: string

    Ref_Id: string;
}



export default function Shares() {
    const { user, loading } = useAuth();
    const [data, setData] = useState<AggregatedShare[]>();
    console.log("this is share ", data);
    useEffect(() => {
        if (user) {
            getdata();
        }
    }, [user]);

    const getdata = async () => {
        if (user) {
            try {
                const response: any = await database.listDocuments(
                    "64fb507e57d794c91f2f",
                    "64fb511ad635c541e6cf", [
                    Query.equal('User_Id', user.id),
                ]);



                const selectedItem = response.documents.map((i: AggregatedShare) => {
                    return {
                        Name: i.Name,
                        TotalUnits: i.TotalUnits,
                        Type: i.Type,
                        Ref_Id: i.Ref_Id
                    }
                });
                setData(selectedItem);
                // Here you can set selectedItem to the state or use it as needed
            } catch (error) {
                console.log(error);
                // Handle errors here, such as showing an error message to the user
            }
        } else {
            <p className="loading"></p>
        }
    }

    // Aggregate shares by Name



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
