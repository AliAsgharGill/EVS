import { useSelector } from "react-redux"
const Voting = () => {
    const campaigns = useSelector(state => state.campaign.campaigns)
    console.log(campaigns);
    return (
        <>
            <h1 className="mt-20"> Choose Campagin To Vote</h1>
        </>
    )
}

export default Voting
