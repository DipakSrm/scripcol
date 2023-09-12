import { useAuth } from "@/pages/hooks/authenication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading..</p>;
  }

  return (
    <>
      <div className="mx-10 p-5 relative">
        {user && (
          <>
            <h1 className="text-3xl font-bold">Welcome {`${user.name}!`}</h1>
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-xl">Your Accounts</h1>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex bg-green-600 text-white hover:bg-green-800 items-center rounded-lg shadow-lg py-2 px-4 gap-3"
                >
                  Add Account
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            {showModal && (
              <form className="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
                <div className="bg-white p-5 rounded-lg w-96">
                  <label className="text-sm font-semibold" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="text-sm rounded-sm p-2 w-full"
                    type="text"
                    placeholder="Dipak Sharma"
                    name="name"
                    id="name"
                  />
                  <label className="text-sm font-semibold" htmlFor="boid">
                    BOID
                  </label>
                  <input
                    className="text-sm rounded-sm p-2 w-full"
                    type="text"
                    placeholder="1301563825621234"
                    name="boid"
                    id="boid"
                  />{" "}
                  <label className="text-sm font-semibold" htmlFor="acc_number">
                    Account Number
                  </label>
                  <input
                    className="text-sm rounded-sm p-2 w-full"
                    type="text"
                    placeholder="1301563825621234"
                    name="acc_number"
                    id="acc_number"
                  />{" "}
                  <label className="text-sm font-semibold" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="text-sm rounded-sm p-2 w-full"
                    type="email"
                    placeholder="1301563825621234"
                    name="email"
                    id="email"
                  />{" "}
                  <label className="text-sm font-semibold" htmlFor="ph_number">
                    Phone Number
                  </label>
                  <input
                    className="text-sm rounded-sm p-2 w-full"
                    type="text"
                    placeholder="1301563825621234"
                    name="ph_number"
                    id="ph_number"
                  />
                  <label
                    className="text-sm font-semibold"
                    htmlFor="client_code"
                  >
                    Client Code{" "}
                  </label>
                  <input
                    className="text-sm rounded-sm p-2 w-full"
                    type="text"
                    placeholder="1301563825621234"
                    name="client_code"
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
                      onClick={() => setShowModal(false)}
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
