import { faCheck, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from "react-toastify";
import axios from 'axios';
import react, { useEffect } from 'react'
import { useState } from 'react'
interface Share {
  $id: string;
  Name: string;
  Units: number;
  Rate: number;
  Ref_Id: string;
  Type: String;
}
interface ShareProps {
  data: Share[];
}
interface shareData {
  id: string,
  name: string
}
export default function Share({ data }: ShareProps) {
  const [isboxopen, setisboxopen] = useState(false)
  const [share_id, setshare_id] = useState<string>()
  
  const handleOpen = (item: string) => {
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


  return (
    <>{isboxopen && (
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
    )}
      {" "}
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
          {data.map((item) => (
            <tr key={item.$id}>
              <td className="py-2 px-4 border border-gray-300 flex justify-evenly items-center gap-2">
                <div>{item.Name}</div>
                <button className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 but_animation flex justify-center items-center gap-2" onClick={() => handleOpen(item.$id)}>Remove
                  <FontAwesomeIcon icon={faTrash} /></button >
              </td>
              <td className="py-2 px-4 border border-gray-300">{item.Units}</td>
              <td className="py-2 px-4 border border-gray-300">{item.Rate}</td>

              <td className="py-2 px-4 border border-gray-300">{item.Type}</td>
              <td className="py-2 px-4 border border-gray-300">
                {item.Rate * item.Units}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
