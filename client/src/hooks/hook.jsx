import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const useXErrors = (errors = []) => {
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) fallback();
                else toast.error(error?.response?.data?.message || "Something Went Wrong!!");
            }
        });
    }, [])
}

const useAsyncMutation = (mutationHook) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null)

    const [mutate] = mutationHook();

    const executeMutation = async (toastMessage, ...args) => {
        setIsLoading(true);
        const toastId = toast.loading(toastMessage || "Please wait...");

        try {
            const res = await mutate(...args);
            if (res.data) {
                toast.success(res.data.message || "Updated Data Successfully", { id: toastId });
                setData(res.data);
            } else {
                toast.error(res?.error?.data?.message || 'Something went Wrong!!', { id: toastId });
            }

        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return [executeMutation, isLoading, data];
}

const useSocketEvents = (socket, eventArray) => {
    useEffect(() => {
        Object.entries(eventArray).forEach(([event, handler]) => {
            socket.on(event, handler);
        });

        return () => {
            Object.entries(eventArray).forEach(([event, handler]) => {
                socket.off(event, handler);
            });
        }
    }, [socket, eventArray])
}

export { useXErrors, useAsyncMutation, useSocketEvents };