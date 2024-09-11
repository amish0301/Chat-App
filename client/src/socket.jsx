import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { serverURI } from "./utils/config";

const SocketContext = createContext();
const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io(serverURI, { withCredentials: true }), []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export { getSocket, SocketProvider };