import { useNavigate } from 'react-router-dom'
const PhonePage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="mt-12">
                <h1>Phone Voting Page</h1>
                <button onClick={() => navigate('/phonesVoting')} >Vote</button>
            </div>
        </>
    )
}

export default PhonePage
