import { createContext, ReactNode, useState } from 'react';
import { LoginType } from './@types';
import { getAuth } from './utils/auth';

interface AppContextType {
	auth: LoginType | null;
	setAuth: React.Dispatch<React.SetStateAction<LoginType | null>>;
}

const initialContext: AppContextType = {
	auth: getAuth(),
	setAuth: () => null,
};

export const AppContext = createContext<AppContextType>(initialContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
	const [auth, setAuth] = useState<LoginType | null>(initialContext.auth);
	return <AppContext.Provider value={{ auth, setAuth }}>{children}</AppContext.Provider>;
};

export default AppProvider;
