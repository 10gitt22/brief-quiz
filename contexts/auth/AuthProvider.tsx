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
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleUser = async () => {
      if (user) {
        const result = await userAPI.getUser(user.uid);
        if (result) setFirestoreUser(result);
        push('/');
        push;
      } else {
        setFirestoreUser(null);
        push('/login');
      }
    };
    console.log(user, 'user');
    handleUser();
  }, [user]);

  useEffect(() => {
    console.log(firestoreUser, 'firestore user');
  }, [firestoreUser]);

  const value = useMemo(() => {
    return {
      user,
      firestoreUser,
    };
  }, [user, firestoreUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
