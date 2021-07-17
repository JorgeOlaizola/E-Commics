import { admin } from '../types'

export const isAdmin = async (userId) => {
    const verification = axios.post('/api/users/admin', { id: userId})
    if(verification.data === false) {
        window.location.href = "/"
    }
}