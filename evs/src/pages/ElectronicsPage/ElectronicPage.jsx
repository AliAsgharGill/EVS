import { useNavigate } from 'react-router-dom'
const ElectronicPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="mt-12">
                <p>
                    Electronics Page
                </p>
                <button type="button" onClick={() => navigate('/electronicsVoting')}>Vote</button>
            </div>
        </>
    )
}

export default ElectronicPage
