import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { serverURI } from "./utils/config";

const socketContext = createContext();
const getSocket = () => useContext(socketContext);

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io(serverURI, { withCredentials: true }), []);

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    );
}

export { getSocket, SocketProvider };