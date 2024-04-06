import { useEffect } from "react"
import { toast } from "react-hot-toast"

const useXErrors = (errors = []) => {
    useEffect(() => {
        // errors.forEach(({ isError, error, fallback }) => {
        //     if (isError) {
        //         if (fallback) fallback();
        //         else toast.error(error?.response?.data?.message || "Something Went Wrong!!");
        //     }
        // });
    }, [errors])
}

export { useXErrors }