import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { account } from "@/utils/appwrite";
import { AppwriteException, ID } from "appwrite";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

type AuthProviderProps = {
  children: ReactNode;
};

// Define the context type
export interface UserState {
  user: { id: string; email: string; name: string } | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
}

const defaultState: UserState = {
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => {},
  signUp: async () => {},
};

// Create the context at the module level
export const AuthContext = createContext<UserState | null>(defaultState);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<null | {
    id: string;
    email: string;
    name: string;
  }>(null);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const { $id, email, name } = await account.get();
        setUser({ id: $id, email, name });
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserAuthentication();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      const { $id, name } = await account.get();
      setUser({ id: $id, email, name });
      toast.success("Sign-in successful!");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      setLoading(false);
      toast.success("Sign-out successful!");
    } catch (error) {
      console.error("Sign-out error:", error);
      toast.error("Sign-out failed.");
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      await account.create(ID.unique(), email, password, name);
      toast.success("Sign-up successful!");
    } catch (error: any) {
      if (error instanceof AppwriteException && error.code === 409) {
        // A user with the same email already exists
        toast.error("A user with the same email already exists.");
      } else {
        console.error("Sign-up error:", error);
        toast.error("Sign-up failed. Please try again later.");
      }
    }
  };
  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
      <ToastContainer /> {/* Add Toastify container */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (authContext === null) {
    // Handle the case when AuthContext is null
    return {
      user: null,
      loading: true,
      signOut: async () => {},
      signIn: async (email: string, password: string) => {},
      signUp: async (email: string, password: string, name: string) => {},
    };
  }

  return authContext;
};
