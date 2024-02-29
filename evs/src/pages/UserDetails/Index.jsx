import { useParams } from "react-router-dom"
const UserDetails = () => {
    const {userId} = useParams()
    
    return (
        <>
            <div className="min-h-screen">
                <h1 className="font-poppins" >User Detail Page of user {userId}</h1>
            </div>
        </>
    )
}

export default UserDetails
