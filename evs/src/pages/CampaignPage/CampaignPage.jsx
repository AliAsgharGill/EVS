import { useEffect, useState } from 'react';
import { Card, Button, Modal, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampaigns } from '../../slices/campaignSlice';
import { ArrowRightOutlined } from '@ant-design/icons';
import { MdHowToVote } from 'react-icons/md';
import axios from 'axios';
import { fetchCandidates } from '../../slices/canidateSlice/canidateSlice';
import { useNavigate } from 'react-router-dom';
import { fetchDynamicCandidates, updateCandidateVotes } from '../../slices/dyanmicCandidateSlice/dyanmicCandidateSlice';

const CampaignPage = () => {
    const { Meta } = Card;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isUser, setIsUser] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3000/users?email=${user.email}&password=${user.password}`);
                const adminResponse = await axios.get(`http://localhost:3000/admins?email=${user.email}&password=${user.password}`);
                setIsUser(!!userResponse.data.length || !!adminResponse.data.length);
            } catch (error) {
                console.log('Error Fetching Users', error);
            }
        };

        if (user) {
            fetchUsers();
        } else {
            navigate('/login/user');
            message.warning('Please Login First!');
        }
    }, [user, navigate]);

    useEffect(() => {
        dispatch(fetchCampaigns());
    }, [dispatch]);

    const [disabledCampaigns, setDisabledCampaigns] = useState(() => {
        const storedDisabledCampaigns = localStorage.getItem('disabledCampaigns');
        return storedDisabledCampaigns ? JSON.parse(storedDisabledCampaigns) : [];
    });

    const handleVotingClick = (campaign) => {
        Modal.confirm({
            title: 'Alert Vote',
            content: 'Are you sure you want to cast your vote? Once you confirm, you won\'t be able to cast your vote again.',
            okButtonProps: { style: { backgroundColor: '#F09A60' } },
            onOk() {
                handleMangeCampaign(campaign);
            },
            onCancel() { },
        });
    };

    const campaigns = useSelector((state) => state.campaign.campaigns);
    const dynamicCandidates = useSelector((state) => state.dynamicCandidates.candidates);

    const [view, setView] = useState(false);
    const [participants, setParticipants] = useState(null);


    const handleMangeCampaign = (campaign) => {
        const campaignExist = campaigns.find((camp) => camp.id === campaign.id);
        const contestants = dynamicCandidates.filter((can) => can.campaignID === campaignExist.id);
        setParticipants(contestants);
        if (campaignExist) {
            setView(true);
            const updatedDisabledCampaigns = [...disabledCampaigns, campaignExist.id];
            setDisabledCampaigns(updatedDisabledCampaigns);
            localStorage.setItem('disabledCampaigns', JSON.stringify(updatedDisabledCampaigns));
        }
    };

    const handleVoteClick = (participant) => {
        dispatch(updateCandidateVotes(participant));
        message.success('Your Vote Counted Successfully');
        navigate('/');
    };

    useEffect(() => {
        dispatch(fetchCandidates());
        dispatch(fetchDynamicCandidates());
    }, [dispatch]);

    const onFinish = () => {
        setView(false);
    };
    
    const calculateRemainingTime = (endDate) => {
        const endDateTime = new Date(endDate).getTime();
        const currentDateTime = new Date().getTime();
        const diff = endDateTime - currentDateTime;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        let remainingTime = '';
        if (days > 0) {
            remainingTime += days + ' days ';
        }
        if (hours > 0) {
            remainingTime += hours + ' hours ';
        }
        if (minutes > 0) {
            remainingTime += minutes + ' minutes ';
        }
        if (seconds > 0) {
            remainingTime += seconds + ' seconds ';
        }

        return remainingTime.trim();
    };


    return (
        <>
            {isUser && (
                <div>
                    <div>
                        <h1 className="mt-10 font-bold text-3xl">Campaigns</h1>
                        <div className="p-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
                            {campaigns.map((campaign) => {

                                // here calculate and hide the campaign if time end
                                const endDate = new Date(campaign.endDate);
                                const currentDate = new Date();
                                if (endDate < currentDate) {
                                    return null;
                                }

                                const remainingTime = calculateRemainingTime(campaign.endDate);


                                return (
                                    <Card
                                        key={campaign.id}
                                        style={{ width: 300 }}
                                        className="outline outline-gray-100 outline-1"
                                        hoverable
                                        cover={<img style={{ height: 200 }} alt="example" src={campaign.image} />}
                                        actions={[
                                            <Button
                                                onClick={() => {
                                                    handleVotingClick(campaign);
                                                }}
                                                type="primary"
                                                key="buttonOne"
                                                className="bg-[#F09A3E]"
                                                icon={<ArrowRightOutlined />}
                                                disabled={disabledCampaigns.includes(campaign.id)}
                                            >
                                                Voting
                                            </Button>,
                                        ]}
                                    >
                                        <Meta style={{ textAlign: 'justify', height: '120px' }} title={campaign.name} description={campaign.description} endDate={campaign.endDate} />
                                        <div className="font-bold my-4">
                                            <div>Campaign End In</div>
                                            <div>{remainingTime}</div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    <Modal open={view} title="Participants" width={1000} footer={null} onCancel={() => setView(false)} onOk={() => setView(false)} onFinish={onFinish}>
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                            {participants ? (
                                participants.map((participant) => (
                                    <Card
                                        key={participant.id}
                                        className=""
                                        actions={[
                                            <div className="flex justify-evenly items-center" key={participant.id}>
                                                <MdHowToVote
                                                    focusable={true}
                                                    key={participant.id}
                                                    style={{ color: 'green', fontSize: '30px' }}
                                                    className="hover:fill-green-500 rounded-lg fill-gray-500 "
                                                    onClick={() => handleVoteClick(participant)}
                                                />
                                            </div>,
                                        ]}
                                        hoverable={true}
                                    >
                                        <div key={participant.id} className="bg-gray-300 flex justify-center items-center flex-col p-8 rounded  h-[350px] ">
                                            <img src={participant.candidateSymbol} alt="Symbol" className="rounded-full flex justify-center items-center" />,
                                            <div className="font-bold  font-serif  ">{participant.candidateName}</div>
                                            <div className="font-serif">{participant.votes}</div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div>No Candidates Yet For Voting!</div>
                            )}
                        </div>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default CampaignPage;
