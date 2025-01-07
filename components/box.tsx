import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";

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

export default function Box({
  $id,
  Name,
  Email,
  AccountNumber,
  PhoneNumber,
  ClientCode,
  BOID,
  Meroshare_Id
}: Model_Account) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-800">{Name}</h1>
          <button
            onClick={() => setOpen(!open)}
            className={`text-gray-500 hover:text-gray-700 ${open ? "transform rotate-180" : ""
              }`}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <button
            onClick={() => router.push(`accounts/${$id}`)}
            className="bg-green-300 hover:bg-green-500 text-lg  px-3 py-1 rounded-md "
          >
            visit
          </button>
        </div>
        <div className={`mt-2 ${open ? "" : "hidden"}`}>
          <p className="text-gray-600 text-sm">{Email}</p>
          <ul className="mt-2">
            <li>
              <span className="text-blue-600">BOID:</span> {BOID}
            </li>
               <li>
              <span className="text-blue-600">Meroshare:</span> {Meroshare_Id}
            </li>
            <li>
              <span className="text-blue-600">Account Number:</span>{" "}
              {AccountNumber}
            </li>
            <li>
              <span className="text-blue-600">Phone Number:</span> {PhoneNumber}
            </li>
            <li>
              <span className="text-blue-600">Client Code:</span> {ClientCode}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
