import { useAuth } from "@/pages/hooks/authenication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { account, database } from "@/utils/appwrite";
import { Client, Databases, ID } from "appwrite";
import Box from "./box";
interface Model_Account {
    $id?: string;
    Name: string;
    BOID: string;
    AccountNumber: string;
    Email: string;
    PhoneNumber: string;
    ClientCode: string;
    Ref_Id?: string;
    Meroshare_Id: string;
}
interface HomeModel {
    data: Model_Account[];
}
export default function Home({ data }: HomeModel) {
    const { user, loading } = useAuth();
    if (loading) {
        return <p>Loading..</p>;
    }
    const [showModal, setShowModal] = useState(false);
    const [Account, setAccount] = useState<Model_Account>({
        Name: "",
        BOID: "",
        AccountNumber: "",
        Email: "",
        PhoneNumber: "",
        ClientCode: "",
        Ref_Id: user?.id,
        Meroshare_Id: "",
    });
    const [reloadPage, setReloadPage] = useState(false);

    useEffect(() => {
        if (reloadPage) {
            // Reload the page after a successful submission
            window.location.reload();
        }
    }, [reloadPage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccount({
            ...Account,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const document = await database.createDocument(
                "64fb507e57d794c91f2f",
                "650579d559b127c0998a",
                ID.unique(),
                {
                    Name: Account.Name,
                    BOID: Account.BOID,
                    AccountNumber: Account.AccountNumber,
                    Email: Account.Email,
                    PhoneNumber: Account.PhoneNumber,
                    ClientCode: Account.ClientCode,
                    Ref_Id: user?.id,
                    Meroshare_Id: Account.Meroshare_Id,
                }
            );

            console.log("Document created:", document);
            toast.success("Form Submitted Successfully!!");
            setReloadPage(true);
            // Fetch updated data after submission
        } catch (error) {
            console.error("Error creating document:", error);
            toast.error("Error submitting form. Please try again later.");
        }

        setShowModal(false);
    };

    return (
        <>
            <div className=" p-5 relative">
                {user && (
                    <>
                        <h1 className="text-3xl font-bold">Welcome {`${user.name}!`}</h1>
                        {data.length == 0 ? (
                            <h1 className="text-xl">No Accounts To show</h1>
                        ) : (
                            <h1 className="text-xl my-3 text-red-500 font-bold   ">Total Accounts = {data.length}</h1>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-1">
                            {data.map((item) => {
                                return (
                                    <div key={item.$id}>
                                        <Box {...item} />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="flex bg-green-600 my-5 text-white hover:bg-green-800 items-center rounded-lg shadow-lg py-2 px-4 gap-3"
                                >
                                    Add Account
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                        {showModal && (
                            <form
                                className="fixed inset-0 flex items-center justify-center backdrop-blur-lg"
                                onSubmit={handleSubmit}
                            >
                                <div className="bg-white p-5 rounded-lg w-96">
                                    <label className="text-sm font-semibold" htmlFor="name">
                                        Name*
                                    </label>
                                    <input
                                        value={Account.Name}
                                        onChange={handleChange}
                                        className="text-sm rounded-sm p-2 w-full"
                                        type="text"
                                        placeholder="Dipak Sharma"
                                        name="Name"
                                        id="name"
                                    />
                                    <label className="text-sm font-semibold" htmlFor="boid">
                                        BOID*
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className="text-sm rounded-sm p-2 w-full"
                                        type="text"
                                        placeholder="1301563825621234"
                                        name="BOID"
                                        id="boid"
                                        value={Account.BOID}
                                    />{" "}
                                    <label className="text-sm font-semibold" htmlFor="acc_number">
                                        Account Number*
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className="text-sm rounded-sm p-2 w-full"
                                        type="text"
                                        placeholder="1301563825621234"
                                        name="AccountNumber"
                                        id="acc_number"
                                        value={Account.AccountNumber}
                                    />{" "}
                                    <label className="text-sm font-semibold" htmlFor="meroshare">
                                        Meroshare Id*
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className="text-sm rounded-sm p-2 w-full"
                                        type="text"
                                        placeholder="1301563825621234"
                                        name="Meroshare_Id"
                                        id="meroshare"
                                        value={Account.Meroshare_Id}
                                        maxLength={8}
                                    />{" "}
                                    <label className="text-sm font-semibold" htmlFor="email">
                                        Email*
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className="text-sm rounded-sm p-2 w-full"
                                        type="email"
                                        placeholder="1301563825621234"
                                        value={Account.Email}
                                        name="Email"
                                        id="email"
                                    />{" "}
                                    <label className="text-sm font-semibold" htmlFor="ph_number">
                                        Phone Number*
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className="text-sm rounded-sm p-2 w-full"
                                        value={Account.PhoneNumber}
                                        type="text"
                                        maxLength={10}
                                        placeholder="1301563825621234"
                                        name="PhoneNumber"
                                        id="ph_number"
                                    />
                                    <label
                                        className="text-sm font-semibold"
                                        htmlFor="client_code"
                                    >
                                        Client Code{" "}
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className="text-sm rounded-sm p-2 w-full"
                                        type="text"
                                        value={Account.ClientCode}
                                        placeholder="1301563825621234"
                                        name="ClientCode"
                                        id="client_code"
                                    />
                                    {/* Add other input fields here */}
                                    <div className="flex gap-3 mt-3">
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="flex bg-gray-600 text-white hover:bg-gray-800 items-center rounded-lg shadow-lg py-2 px-4 gap-3"
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex bg-blue-600 text-white hover:bg-blue-800 items-center rounded-lg shadow-lg py-2 px-4 gap-3"
                                        >
                                            Add
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
