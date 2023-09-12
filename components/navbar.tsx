import { useAuth } from "@/pages/hooks/authenication";

export default function Navbar() {
  const { signOut } = useAuth(); // Use parentheses to call the useAuth hook

  const handleButton = () => {
    signOut();
  };

  return (
    <>
      <nav className="w-full py-5 bg-blue-800 flex justify-around items-center text-white">
        <div className="font-bold text-3xl">ScripCol</div>
        <button
          onClick={handleButton}
          className="hover:text-gray-400 font-light"
        >
          Log Out
        </button>{" "}
        {/* Use handleButton to call signOut */}
      </nav>
    </>
  );
}
