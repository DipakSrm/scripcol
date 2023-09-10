import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { client, account } from "@/utils/appwrite";
import { ID } from "appwrite";

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
const defaultstate: UserState = {
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => {},
  signUp: async () => {},
};

// Create the context at the module level
export const AuthContext = createContext<UserState | null>(defaultstate);

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
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      await account.create(ID.unique(), email, password, name);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
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
