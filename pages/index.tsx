import { useAuth } from "./hooks/authenication";
import SignUpForm from "./signup";

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user, loading, signOut } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {!user && (
        <div className="flex flex-col gap-5 ">
          <SignUpForm />
        </div>
      )}
      {user && (
        <button
          className="text-white bg-blue-600 p-4 w-50% text-lg"
          onClick={() => signOut()}
        >
          LogOut{" "}
        </button>
      )}
    </>
  );
}
