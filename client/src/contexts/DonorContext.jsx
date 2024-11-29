import { createContext, useEffect, useState } from "react";
import { getCookie } from "../helper/getCookie";

export const DonorContext = createContext();

export const DonorContextProvider = ({ children }) => {

    const [donors, setDonors] = useState([]);
    const [profile, setProfile] = useState({});
    const [authenticated, setAuthenticated] = useState(false);
    const backendURL = import.meta.env.VITE_BACKEND_URL ; // || "http://localhost:3000"

    useEffect(() => {
        getCookie('accessToken') ? setAuthenticated(true) : setAuthenticated(false);
        console.log(backendURL)
    }, [])

    const value = {
        donors,
        setDonors,
        profile,
        setProfile,
        authenticated,
        setAuthenticated,
        backendURL
    }

    return <DonorContext.Provider value={value}>{ children}</DonorContext.Provider>
}