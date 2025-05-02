    import { createContext, useContext, useState, useEffect } from "react";
    import { getProfile } from "../services/authService";

    const UserContext = createContext();

    export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) return setUser(null);
        try {
        const profile = await getProfile(token);
        setUser(profile);
        } catch {
        setUser(null);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, reloadUser: loadUser }}>
        {children}
        </UserContext.Provider>
    );
    }

    export const useUser = () => useContext(UserContext);
