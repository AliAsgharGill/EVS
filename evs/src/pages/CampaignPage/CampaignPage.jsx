import { useEffect, useState } from 'react';
import { Card, Button, Modal, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCampaigns } from '../../slices/campaignSlice';
import { ArrowRightOutlined } from '@ant-design/icons';
import { MdHowToVote } from "react-icons/md";
import axios from 'axios'
import { fetchCandidates } from '../../slices/canidateSlice/canidateSlice'
import { useNavigate } from 'react-router-dom'
import { fetchDynamicCandidates, updateCandidateVotes } from '../../slices/dyanmicCandidateSlice/dyanmicCandidateSlice';

const CampaignPage = () => {
    const { Meta } = Card;
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




    useEffect(() => {
        dispatch(fetchCampaigns())
    }, [dispatch])

    const [disabledCampaigns, setDisabledCampaigns] = useState(() => {
        const storedDisabledCampaigns = localStorage.getItem('disabledCampaigns');
        return storedDisabledCampaigns ? JSON.parse(storedDisabledCampaigns) : [];
    });


    const handleVotingClick = (campagin) => {
        console.log("Campaign HandleVoting Main Iee Ha", campagin);
        Modal.confirm({
            title: 'Alert Vote',
            content: 'Are you sure you want to cast your vote? Once you confirm, you won\'t be able to cast your vote again.',
            okButtonProps: { style: { backgroundColor: "#F09A60" } },
            onOk() {
                setView(true);
                handleMangeCampaign(campagin)
            },
            onCancel() {
            },
        });
    };

    const campaigns = useSelector(state => state.campaign.campaigns)
    const dynamicCandidates = useSelector(state => state.dynamicCandidates.candidates)
    // console.log("Dynamic", dynamicCandidates);    


    const [view, setView] = useState(false)
    // const [selectedCampaign, setSelectedCampaign] = useState(null)
    const [participants, setParticipants] = useState(null)
    // console.log("selectedCampaign", selectedCampaign);

    const handleMangeCampaign = (campagin) => {
        console.log("Campaign Jo Iee Ha", campagin);
        const campaignExist = campaigns.find(camp => camp.id === campagin.id)
        const contestants = dynamicCandidates.filter(can => can.campaignID === campaignExist.id)
        setParticipants(contestants)
        if (campaignExist) {
            setView(true)
            const updatedDisabledCampaigns = [...disabledCampaigns, campaignExist.id];
            setDisabledCampaigns(updatedDisabledCampaigns); // Update the state
            localStorage.setItem('disabledCampaigns', JSON.stringify(updatedDisabledCampaigns)); // Update local storage
        }
    };

    // voting
    const handleVoteClick = (participant) => {
        console.log("Participant Updated", participant);
        dispatch(updateCandidateVotes(participant));
        message.success('Your Vote Counted Successfully')
        navigate('/')
    };

    useEffect(() => {
        dispatch(fetchCandidates())
        dispatch(fetchDynamicCandidates())
    }, [dispatch])

    const onFinish = (values) => {
        console.log('Success:', values);
        setView(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };

    return (
        <>
            {isUser &&
                <div>
                    <div>
                        <h1 className='mt-20 font-bold text-3xl'>Campaigns</h1>
                        <div className=' p-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center'>
                            {campaigns.map(campagin => (
                                <Card
                                    key={campagin.id}
                                    style={{ width: 300, }}
                                    className='outline outline-gray-100 outline-1 '
                                    hoverable
                                    cover={
                                        <img
                                            style={{
                                                height: 200
                                            }}
                                            alt="example"
                                            src={campagin.image}
                                        />
                                    }
                                    actions={[
                                        <>
                                            <div className='flex justify-around space-x-3'>
                                                <Button onClick={() => { handleVotingClick(campagin) }} type="primary" key="buttonOne" className='bg-[#F09A3E]' icon={<ArrowRightOutlined />} disabled={disabledCampaigns.includes(campagin.id)} >
                                                    Voting
                                                </Button>

                                            </div>
                                        </>
                                    ]}
                                >
                                    <Meta

                                        style={{ textAlign: 'justify', height: '120px' }}
                                        title={campagin.name}
                                        description={campagin.description}
                                    />
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Modal for Voting */}
                    <Modal open={view} title="Participants" width={1000} footer={null} onCancel={() => setView(false)} onOk={() => setView(false)} onFinish={onFinish} onFinishFailed={onFinishFailed} className=''  >
                        {/* voting */}
                        <div className='grid  sm:grid-cols-1 md:grid-cols-3 gap-4'>
                            {participants ? participants.map(participant => (
                                <Card key={participant.id} className='' actions={
                                    [
                                        <div className='flex justify-evenly items-center' key={participant.id}>
                                            <MdHowToVote focusable={true} key={participant.id} style={{ color: 'green', fontSize: '30px' }} className=' hover:fill-green-500 rounded-lg fill-gray-500 ' onClick={() => handleVoteClick(participant)} />
                                        </div>
                                    ]}

                                    hoverable={true}
                                >
                                    <div key={participant.id} className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded  h-[350px] '>
                                        <img src={participant.candidateSymbol} alt='Symbol' className='rounded-full flex justify-center items-center' />,
                                        <div className='font-bold  font-serif  '>
                                            {participant.candidateName}
                                        </div>
                                        <div className='font-serif'>
                                            {participant.votes}
                                        </div>
                                    </div>
                                </Card>

                            )) : <div>No Candidates Yet For Voting!</div>}
                        </div>
                    </Modal >
                </div>
            }
        </>
    )
}
export default CampaignPage
