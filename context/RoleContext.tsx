'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';

type UserRole = 'buyer' | 'seller' | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoading: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const userRole = user.publicMetadata?.role as UserRole;
      if (userRole) {
        setRole(userRole);
      } else {
        setRole(null);
      }
    } else {
      setRole(null);
    }
    setIsLoading(false);
  }, [isSignedIn, user]);

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole, isLoading }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}