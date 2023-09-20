import { database } from "@/utils/appwrite";
import { Client, Databases, ID, Query } from "appwrite";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faList,
  faBackspace,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/authenication";
import InAccount from "@/components/individualAccount";

// Import Tailwind CSS styles here

interface Model_Account {
  $id?: string;
  Name: string;
  BOID: string;
  AccountNumber: string;
  Email: string;
  PhoneNumber: string;
  ClientCode: string;
  Ref_Id?: string;
}

interface Share {
  $id: string;
  Name: string;
  Units: number;
  Rate: number;
  Ref_Id: string;
  Type: String;
}

export default function Page({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [data, setdata] = useState<Model_Account | undefined>();
  const [shares, setShares] = useState<Share[]>([]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [newShare, setNewShare] = useState({
    name: "",
    units: 10,
    rate: 50,
    type: "Primary",
  });

  useEffect(() => {
    // Ensure that params.id is defined before fetching data
    if (id) {
      const fetchData = async () => {
        try {
          const response = await database.getDocument(
            "64fb507e57d794c91f2f",
            "650579d559b127c0998a",
            `${id}`
          );

          const mappedData: Model_Account = {
            $id: response.$id || "",
            Name: response.Name || "",
            BOID: response.BOID || "",
            AccountNumber: response.AccountNumber || "",
            Email: response.Email || "",
            PhoneNumber: response.PhoneNumber || "",
            ClientCode: response.ClientCode || "",
            Ref_Id: response.Ref_Id || "",
          };

          setdata(mappedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewShare({
      ...newShare,
      [name]: name === "units" || name === "rate" ? parseFloat(value) : value,
    });
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewShare({
      ...newShare,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulate a successful response
      const response = database.createDocument(
        "64fb507e57d794c91f2f",
        "64fb511ad635c541e6cf",
        ID.unique(),
        {
          Name: newShare.name,
          Units: newShare.units,
          Rate: newShare.rate,
          Ref_Id: id,
          User_Id: user?.id,
          Type: newShare.type,
        }
      );
      console.log("resopnese for share", response);

      // Update the shares state with the new share data

      console.log("Document created:", document);
      toast.success("Form Submitted Successfully!!");
    } catch (error) {
      // Display an error toast message
      toast.error("Error submitting share. Please try again later.");
    }

    // Close the form
    handleFormClose();
  };
  useEffect(() => {
    // Ensure that params.id is defined before fetching shares
    if (id) {
      const getShares = async () => {
        try {
          const response = await database.listDocuments(
            "64fb507e57d794c91f2f",
            "64fb511ad635c541e6cf",
            [Query.equal("Ref_Id", `${id}`)]
          );

          // Map Document objects to Share objects
          const mappedShares: Share[] = response.documents.map((document) => ({
            $id: document.$id || "",
            Name: document.Name || "",
            Units: document.Units || 0,
            Rate: document.Rate || 0,
            Ref_Id: document.Ref_Id || "",
            Type: document.Type || "Primary",
          }));

          setShares(mappedShares);
        } catch (error) {
          console.log(error);
        }
      };

      getShares();
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row lg:flex-row gap-5 items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-md w-[80%] mx-auto">
        <h1 className="text-3xl font-semibold mb-4">My Account</h1>
        {data && <InAccount data={data} />}
      </div>

      {/* Shares Section */}
      <div className="bg-white rounded-lg p-8 mt-8 w-full overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">My Shares</h2>
        <button
          onClick={handleFormOpen}
          className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Share
        </button>
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
            {shares.map((share) => (
              <tr key={share.$id}>
                <td className="py-2 px-4 border border-gray-300">
                  {share.Name}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {share.Units}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {share.Rate}
                </td>

                <td className="py-2 px-4 border border-gray-300">
                  {share.Type}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {share.Rate * share.Units}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Share Form */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-2xl font-semibold mb-4">Add Share</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newShare.name}
                  onChange={handleInputChange}
                  className="border w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Units
                </label>
                <input
                  type="number"
                  name="units"
                  min={10}
                  value={newShare.units}
                  onChange={handleInputChange}
                  className="border w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rate
                </label>
                <input
                  type="number"
                  name="rate"
                  value={newShare.rate}
                  onChange={handleInputChange}
                  className="border w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  name="type"
                  id="type"
                  value={newShare.type}
                  onChange={handleTypeChange}
                  className="border w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleFormClose}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Container */}
    </div>
  );
}
