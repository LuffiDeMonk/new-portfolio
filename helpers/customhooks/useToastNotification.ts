import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
    type: string,
    message: string
}


const useToastNotification = (state: Props) => {
    useEffect(() => {
        if (state.type === 'error') {
            toast.error(state.message)
        }
        if (state.type === 'success') {
            toast.success(state.message)
        }
    }, [state])
    return null
}

export default useToastNotification