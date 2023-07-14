import { toast } from 'react-toastify'

export function errorHandlingRequest(message) {
    if (message.constructor.name === "Object") {
        for (const key in message) {
            toast.error(message[key][0])
        }
    } else {
        toast.error(message)
    }
}

export function successHandlingRequest(message) {
    if (message.constructor.name === "Object") {
        for (const key in message) {
            toast.success(message[key][0])
        }
    } else {
        toast.success(message)
    }
}