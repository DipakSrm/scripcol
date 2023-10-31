import { faCheck, faEdit, faTimesCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteBox from "@/components/deleteBox"
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
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

interface ModelProps {
  data: Model_Account;
}

function MyAccount({ data }: ModelProps) {
  console.log("initial id", data.$id);
  const [editMode, setEditMode] = useState(false);
  const [editedData, seteditedData] = useState({ ...data });
  const [delBox, setdelBox] = useState(false)
  const router = useRouter();
  console.log("editeddata", editedData);
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    seteditedData({ ...data });
    setEditMode(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    seteditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = async (e: any) => {
    console.log("Edited Data:", editedData);
    console.log("Data ID:", data.$id);
    try {
      const response = await fetch("/api/updated", {
        method: "POST",
        body: JSON.stringify(editedData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("this is response", response);

      if (response.status === 200) {
        setEditMode(false);

        window.location.reload();
      } else {
        // Handle API error here
        const data = await response.json();
        toast.error(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("An error occurred while updating the document");
    }
  };
  const openDelete = () => {
    setdelBox(true)
    console.log("box open")
  }
  const cancelDelete = () => {
    setdelBox(false)
  }
  const confirmDelete = async () => {
    try {
      const response = await axios.post('/api/delete', { id: data.$id });

      if (response.status === 200) {

        console.log("success delkete")
        router.push('/')
        toast.success(<p className="text-green-500">Successfully Deleted</p>)
      } else {
        toast.error('Failed To Delete');
      }
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <>
      {delBox &&
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg ">

          <div className="bg-white p-3 flex flex-col items-center justify-center  gap-10 lg:w-1/3 lg:h-1/3 rounded-md md:w-1/2 md:h-1/2 w-full h-full">
            <div className="font-bold text-xl text-red-500">Your Account Will Be Deleted</div>
            <div className="flex gap-3">
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2" onClick={confirmDelete}>Confirm <FontAwesomeIcon icon={faCheck} /></button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2" onClick={cancelDelete}>Cancel <FontAwesomeIcon icon={faXmark} /></button>
            </div>
          </div>
        </div>}
      {" "}
      {editMode ? (
        // Render the edit form when in edit mode
        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
          {/* Add input fields for editing data */}
          <label htmlFor="Name" className="text-lg font-semibold">
            Name
          </label>
          <input
            type="text"
            value={editedData.Name}
            onChange={handleInputChange}
            className="my-3 p-2 rounded-md border border-blue-400"
            name="Name"
            id="Name"
          />
          <label htmlFor="Email" className="text-lg font-semibold">
            Email
          </label>
          <input
            type="text"
            value={editedData.Email}
            onChange={handleInputChange}
            className="my-3 p-2 rounded-md border border-blue-400"
            name="Email"
            id="Email"
          />
          <label htmlFor="BOID" className="text-lg font-semibold">
            BOID
          </label>
          <input
            type="text"
            value={editedData.BOID}
            onChange={handleInputChange}
            className="my-3 p-2 rounded-md border border-blue-400"
            name="BOID"
            id="BOID"
          />
          <label htmlFor="AccountNumber" className="text-lg font-semibold">
            Account Number
          </label>
          <input
            type="text"
            value={editedData.AccountNumber}
            onChange={handleInputChange}
            className="my-3 p-2 rounded-md border border-blue-400"
            name="AccountNumber"
            id="AccountNumber"
          />
          <label htmlFor="Meroshare_Id" className="text-lg font-semibold">
            Meroshare Id
          </label>
          <input
            type="text"
            value={editedData.Meroshare_Id}
            onChange={handleInputChange}
            className="my-3 p-2 rounded-md border border-blue-400"
            name="Meroshare_Id"
            id="Meroshare_Id"
          />
          <label htmlFor="PhoneNumber" className="text-lg font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            value={editedData.PhoneNumber}
            onChange={handleInputChange}
            className="my-3 p-2 rounded-md border border-blue-400"
            name="PhoneNumber"
            id="PhoneNumber"
          />
          <label htmlFor="ClientCode" className="text-lg font-semibold">
            Client Code
          </label>
          <input
            type="text"
            value={editedData.ClientCode}
            onChange={handleInputChange}
            className="my-3 p-2 rounded-md border border-blue-400"
            id="ClientCode"
            name="ClientCode"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className=" px-3 py-2 rounded-md shadow bg-green-400 hover:bg-green-600 flex items-center gap-3"
            >
              Save
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              onClick={handleCancel}
              className=" px-3 py-2 rounded-lg shadow bg-red-400 hover:bg-red-600 flex items-center gap-3"
            >
              Cancel
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>
        </form>
      ) : (
        // Render the display view when not in edit mode

        <div>
          {/* Display data */}
          <div className="mb-4">
            <p className="font-bold">Name:</p>
            <p>{data.Name}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Email:</p>
            <p>{data.Email}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">BOID:</p>
            <p>{data.BOID}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Account Number:</p>
            <p>{data.AccountNumber}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">MeroShare _Id:</p>
            <p>{data.Meroshare_Id}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">PhoneNumber:</p>
            <p>{data.PhoneNumber}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">ClientCode:</p>
            <p>{data.ClientCode}</p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row justify-between">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded-full flex justify-center items-center gap-3 but_animation hover:bg-blue-600"
            >
              Edit
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex justify-center items-center gap-3 but_animation" onClick={openDelete}>
              Delete
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-500 text-white px-4 py-2 rounded-full"
            >
              Back
            </button>
          </div>

        </div>

      )

      }
    </>
  );
}

export default MyAccount;
