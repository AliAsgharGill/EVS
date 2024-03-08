import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCampaigns } from '../../slices/campaignSlice';
import { fetchDynamicCandidates } from '../../slices/dyanmicCandidateSlice/dyanmicCandidateSlice';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
const Result = () => {
    const navigate = useNavigate()
    const [isUser, setIsUser] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3000/users?email=${user.email}&password=${user.password}`);
                const adminResponse = await axios.get(`http://localhost:3000/admins?email=${user.email}&password=${user.password}`);


                // const response = await axios.get(`http://localhost:3000/users?email=${user.email}`) && await axios.get(`http://localhost:3000/users?password=${user.password}`) || await axios.get(`http://localhost:3000/admins?email=${user.email}`) && await axios.get(`http://localhost:3000/admins?password=${user.password}`)
                setIsUser(!!userResponse.data.length || !!adminResponse.data.length)
            } catch (error) {
                console.log("Error Fetching Admins", error);
            }
        }

        if (user) {
            fetchUsers()
        } else {
            navigate('/login/user');
            message.warning("Please Login First!")
        }
    }, [user, navigate]);


    const dispatch = useDispatch()
    const campaigns = useSelector(state => state.campaign.campaigns)
    const candidates = useSelector(state => state.dynamicCandidates.candidates)
    console.log(' Campaigns', campaigns);
    console.log(' Candidates', candidates);

    useEffect(() => {
        dispatch(fetchCampaigns())
        dispatch(fetchDynamicCandidates)

    }, [dispatch])
    return (
        <>
            {isUser ?

                <div className="mt-10">
                    <h1 className="font-bold text-3xl text-[#F09A3E] ">Results</h1>
                </div>
                :
                <div className="mt-20">
                    <div>No Data</div>
                </div>
            }
        </>
    )
}

export default Result
