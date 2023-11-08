import { useAuth } from "@/pages/hooks/authenication";
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

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  return (
    <>
      <div className="flex w-[80%] mx-auto flex-col">
        <div className="text-center">
          <h1 className="text-3xl font-bold my-4 ">Welcome to scripCol <span className="text-blue-600">{user ? user.name : 'loading..'}</span></h1>
          <h2 className="text-gray-400 font-light text-lg">This is scripcol where you can track all your Accounts and  Shares.</h2>
        </div>
        <div className="flex gap-5 my-4 flex-col md:flex-row   ">
          <div className="w-full rounded-md bg-blue-500 text-2xl text-white font-bold grid place-content-center min-h-[30vh] relative card_box">
            Account
            <div className="card">
              <button className="flex bg-green-500 text-white hover:bg-green-600  rounded-lg shadow-lg px-4 py-2" onClick={() => router.push('/accounts')}>Visit</button>
            </div>
          </div>
          <div className="w-full rounded-md bg-blue-500 text-2xl text-white font-bold grid place-content-center min-h-[30vh] relative card_box">
            Shares
            <div className="card">
              <button className="flex bg-green-500 text-white hover:bg-green-600  rounded-lg shadow-lg px-4 py-2" onClick={() => router.push('/shares')}>Visit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}