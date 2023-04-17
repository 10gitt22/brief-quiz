import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase/config';
import { FirestoreUser } from 'firebase/entities/user';
import { userAPI } from 'firebase/services/firestore';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  firestoreUser: FirestoreUser | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  firestoreUser: null,
});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  const [firestoreUser, setFirestoreUser] = useState<null | FirestoreUser>(
    null
  );
  const { push } = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        push('/');
      } else {
        setUser(null);
        push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleUser = async () => {
      if (user) {
        const result = await userAPI.getUser(user.uid);
        if (result) setFirestoreUser(result);
      } else {
        setFirestoreUser(null);
      }
    };
    handleUser();
  }, [user]);

  const value = useMemo(() => {
    return {
      user,
      firestoreUser,
    };
  }, [user, firestoreUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
