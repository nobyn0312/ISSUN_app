'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createClient } from '@/lib/supabase/client';

export type AuthUser = {
  id: string;
  email: string | null;
  photoURL: string | null;
};

interface UserProfile {
  username: string | null;
  userId: string | null;
  age: string | null;
  height: number | null;
  shape: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isLogin: boolean;
  username: string | null;
  userId: string | null;
  age: string | null;
  height: number | null;
  shape: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: null,
    userId: '',
    age: null,
    height: 0,
    shape: '',
  });

  useEffect(() => {
    const supabase = createClient();

    const loadProfile = async (userId: string) => {
      const { data } = await supabase
        .from('profiles')
        .select('username, age, height, shape')
        .eq('id', userId)
        .maybeSingle();

      if (data) {
        setUserProfile({
          username: data.username || null,
          userId,
          age: data.age || null,
          height: data.height ?? null,
          shape: data.shape || null,
        });
      } else {
        setUserProfile({
          username: null,
          userId,
          age: null,
          height: null,
          shape: null,
        });
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? null,
          photoURL: session.user.user_metadata?.avatar_url ?? null,
        });
        void loadProfile(session.user.id);
      } else {
        setUser(null);
        setUserProfile({
          username: null,
          userId: null,
          age: null,
          height: null,
          shape: null,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin: user !== null,
        username: userProfile.username,
        userId: userProfile.userId,
        age: userProfile.age,
        height: userProfile.height,
        shape: userProfile.shape,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('エラー');
  }
  return context;
};
