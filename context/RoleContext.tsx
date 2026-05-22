'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole && (savedRole === 'buyer' || savedRole === 'seller')) {
      setRole(savedRole);
    }
    setIsLoading(false);
  }, []);

  const handleSetRole = (newRole: UserRole) => {
    if (newRole) {
      localStorage.setItem('userRole', newRole);
    } else {
      localStorage.removeItem('userRole');
    }
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