import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCampaigns } from '../../slices/campaignSlice';
import { fetchDynamicCandidates } from '../../slices/dyanmicCandidateSlice/dyanmicCandidateSlice';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'


import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Result = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isUser, setIsUser] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3000/users?email=${user.email}&password=${user.password}`);
                const adminResponse = await axios.get(`http://localhost:3000/admins?email=${user.email}&password=${user.password}`);

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


    const campaigns = useSelector(state => state.campaign.campaigns)
    const candidates = useSelector(state => state.dynamicCandidates.candidates)
    // console.log(' Campaigns', campaigns);
    // console.log(' Candidates', candidates);

    useEffect(() => {
        dispatch(fetchCampaigns())
        dispatch(fetchDynamicCandidates())
    }, [dispatch])

    // seprating candidates of each campaign
    const [campaignCandidates, setCampaignCandidates] = useState([]);

    useEffect(() => {
        const campaignCandidatesObj = {};
        for (const campaign of campaigns) {
            campaignCandidatesObj[campaign.id] = candidates.filter(candidate => candidate.campaignID === campaign.id);
        }
        setCampaignCandidates(campaignCandidatesObj);
    }, [campaigns, candidates]);

    // console.log('campaignCandidates', campaignCandidates);



    // const onChange = (pagination, filters, sorter, extra) => {
    //     console.log('params', pagination, filters, sorter, extra);
    // };



    // graph start

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Running Campaigns',
            },
        },
    };


    const data = {
        labels: candidates.map(candidate => candidate.candidateName),

        datasets: [
            {
                label: 'Votes',
                data: candidates.map(candidate => candidate.votes),
                backgroundColor: [
                    'rgba(128, 0, 0, 0.2)',
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(255, 255, 0, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(0, 0, 255, 0.2)',
                    'rgba(255, 0, 255, 0.2)',
                    'rgba(0, 255, 255, 0.2)',
                    'rgba(0, 128, 0, 0.2)',
                    'rgba(0, 0, 128, 0.2)',
                    'rgba(128, 128, 0, 0.2)',
                    'rgba(128, 0, 128, 0.2)',
                    'rgba(0, 128, 128, 0.2)',
                    'rgba(192, 0, 0, 0.2)',
                    'rgba(0, 192, 0, 0.2)',
                    'rgba(0, 0, 192, 0.2)',
                    'rgba(192, 192, 0, 0.2)',
                    'rgba(192, 0, 192, 0.2)',
                    'rgba(0, 192, 192, 0.2)',
                    'rgba(64, 0, 0, 0.2)',
                    'rgba(0, 64, 0, 0.2)',
                    'rgba(0, 0, 64, 0.2)',
                    'rgba(64, 64, 0, 0.2)',
                    'rgba(64, 0, 64, 0.2)',
                    'rgba(0, 64, 64, 0.2)',
                    'rgba(255, 128, 0, 0.2)',
                    'rgba(255, 0, 128, 0.2)',
                    'rgba(128, 255, 0, 0.2)',
                    'rgba(128, 0, 255, 0.2)',
                    'rgba(0, 255, 128, 0.2)',
                    'rgba(0, 128, 255, 0.2)',
                    'rgba(255, 128, 128, 0.2)',
                    'rgba(128, 255, 128, 0.2)'

                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // graph end




    return (
        <>
            {isUser &&
                <div className="mt-10">
                    <h1 className="font-bold text-3xl text-[#F09A3E] my-5">Results</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 '>
                        {Object.entries(campaignCandidates).map(([campaignId, candidates]) => (
                            <div key={campaignId} className='border p-5 bg-slate-300 rounded-md'>
                                <h3 className='font-bold text-[#F09A3E] text-2xl text-start  '>{campaigns.find(campaign => campaign.id === campaignId)?.name}</h3>
                                <table className='text-start'>
                                    <thead >
                                        <tr className='flex space-x-20' >
                                            <th>Name</th>
                                            <th>Votes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidates.map(candidate => (
                                            <tr key={candidate.id}>
                                                <td>{candidate.candidateName}</td>
                                                <td>{candidate.votes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                    <div className='md:w-1/2 space-y-16 hidden sm:block  md:flex md:items-center'>
                        <Bar className='sm:hidden  md:hidden' options={options} data={data} />
                        <Doughnut data={data} />
                    </div>
                    <div className=' mx-auto flex items-center justify-center sm:hidden min-h-96'>
                        <Doughnut data={data} />
                    </div>
                </div>
            }

        </>
    )
}

export default Result
