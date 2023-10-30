import React, { useState, createContext, ReactNode } from 'react';

interface MediaContextProps {
    user: null | any;
    setUser: React.Dispatch<React.SetStateAction<null | any>>;
}

const MediaContext = createContext<MediaContextProps | null>(null);

const MediaProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<null | any>(null);

    return (
        <MediaContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </MediaContext.Provider>
    );
};

export { MediaContext, MediaProvider };