import { useState } from "react"
import { projectAuth} from "../firebase/config"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    

}