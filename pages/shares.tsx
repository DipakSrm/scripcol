import { useEffect, useState } from "react";
import { useAuth } from "./hooks/authenication";
import { database } from "@/utils/appwrite";

import { Query } from "appwrite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface AggregatedShare {
    $id: string
    Name: string;
    Units: number;
    Rate: number;
    Type: string;
    Ref_Id: string;
}

export default function Shares() {
    const { user } = useAuth();
    const [data, setData] = useState<AggregatedShare[] | null>(null);
    const [AccountData, setAccountData] = useState<any[]>([]);
    const [isboxopen, setisboxopen] = useState(false)
    const [share_id, setshare_id] = useState<string>()
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const response: any = await database.listDocuments(
                        "64fb507e57d794c91f2f",
                        "64fb511ad635c541e6cf",
                        [Query.equal('User_Id', user.id)]
                    );

                    const selectedItem = response.documents.map((i: AggregatedShare) => ({
                        $id: i.$id,
                        Name: i.Name,
                        Units: i.Units,
                        Type: i.Type,
                        Rate: i.Rate,
                        Ref_Id: i.Ref_Id
                    }));
                    setData(selectedItem);
                    console.log("this is data", data)
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        if (data) {
            const fetchAccountData = async () => {
                try {
                    const promises = data.map(async (agg) => {
                        const response = await database.listDocuments(
                            "64fb507e57d794c91f2f",
                            "650579d559b127c0998a",
                            [Query.equal("$id", agg.Ref_Id)]
                        );

                        return response.documents;
                    });

                    // Wait for all promises to resolve
                    const accountDataArray = await Promise.all(promises);
                    setAccountData(accountDataArray)
                    // Do something with accountDataArray

                } catch (error) {
                    console.error('Error fetching account data:', error);
                }
            };

            fetchAccountData();
        }
    }, [data]);
    console.log("this is after", data)
    const handleOpen = (item: string) => {
        console.log("the given id is", item)
        setisboxopen(true)
        setshare_id(item)
        console.log(share_id)
    }
    const handleCancel = () => {
        setisboxopen(false)

    }
    const handleConfirm = async () => {
        const response = await axios.post('/api/sharedelete/', { id: share_id })
        if (response.status === 200) {
            setisboxopen(false);

            window.location.reload()
        } else {
            console.log("there is some error");
        }
    }
    //65d23cf39d28e2bd143f
    return (<> {
        isboxopen && (
            <>
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg ">

                    <div className="bg-white p-3 flex flex-col items-center justify-center  gap-10 lg:w-1/3 lg:h-1/3 rounded-md md:w-1/2 md:h-1/2 w-full h-full">
                        <div className="font-bold text-xl text-red-500">Your Share Will Be Deleted</div>
                        <div className="flex gap-3">
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 but_animation" onClick={handleConfirm}>Confirm <FontAwesomeIcon icon={faCheck} /></button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2" onClick={handleCancel}>Cancel <FontAwesomeIcon icon={faXmark} /></button>
                        </div>
                    </div>
                </div>
            </>
        )
    }<table className="min-w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 border border-gray-300">Name</th>
                    <th className="py-2 px-4 border border-gray-300">Accounts</th>
                    <th className="py-2 px-4 border border-gray-300">Rate</th>
                    <th className="py-2 px-4 border border-gray-300">Type</th>
                    <th className="py-2 px-4 border border-gray-300">Total</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((aggShare, index) => (
                    <tr key={index}>
                        <td className="py-2 px-4 border border-gray-300">{aggShare.Name}</td>
                        <td className="py-2 px-4 border border-gray-300">


                            {AccountData[index] && AccountData[index].length > 0 ?
                                AccountData[index].map((item: any) => (<div className="flex gap-4" key={item.$id}>
                                    {item.Name}
                                    <button className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 but_animation flex justify-center items-center gap-2" onClick={() => handleOpen(aggShare.$id)}>Sold
                                        <FontAwesomeIcon icon={faTrash} /></button >
                                </div>)) :
                                (AccountData[index] && AccountData[index].Name) || <p style={{ color: "Red" }}>No Data Available</p>}


                        </td>
                        <td className="py-2 px-4 border border-gray-300">{aggShare.Rate}</td>
                        <td className="py-2 px-4 border border-gray-300">{aggShare.Type}</td>
                        <td className="py-2 px-4 border border-gray-300">{aggShare.Rate * aggShare.Units}</td>
                    </tr>
                ))}
            </tbody>
        </table></>

    );
}
