import Layout from "@/components/layout";
import { useAuth } from "./hooks/authenication";
import SignUpForm from "./signup";
import Home from "@/components/home";

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
        <>
          <Layout>
            <Home />
          </Layout>
        </>
      )}
    </>
  );
}
