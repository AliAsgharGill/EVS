import { useEffect, useState } from 'react';
import { Card, Button, Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCampaigns, updateVotes } from '../../slices/campaignSlice';
import { ArrowRightOutlined } from '@ant-design/icons';
import { MdHowToVote } from "react-icons/md";


// voting

import { LiaVoteYeaSolid } from "react-icons/lia";
import { fetchCandidates } from '../../slices/canidateSlice/canidateSlice'
import { useNavigate } from 'react-router-dom'
import { fetchDynamicCandidates, updateCandidateVotes } from '../../slices/dyanmicCandidateSlice/dyanmicCandidateSlice';

const CampaignPage = () => {
    const { Meta } = Card;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchCampaigns())
    }, [dispatch])




    const campaigns = useSelector(state => state.campaign.campaigns)
    const dynamicCandidates = useSelector(state => state.dynamicCandidates.candidates)
    console.log("Dynamic", dynamicCandidates);
    // console.log("campaigns", campaigns);


    const [view, setView] = useState(false)
    const [selectedCampaign, setSelectedCampaign] = useState(null)
    const [urlId, setUrlId] = useState(false)
    const [participants, setParticipants] = useState(null)
    console.log("selectedCampaign", selectedCampaign);

    const handleMangeCampaign = (campagin) => {
        const campaignExist = campaigns.find(camp => camp.id === campagin.id)
        const contestants = dynamicCandidates.filter(can => can.campaignID === campaignExist.id)
        console.log("contestants", contestants);
        setParticipants(contestants)
        if (campaignExist) {
            setUrlId(campaignExist.id)
            const data = campaignExist.candidates
            setSelectedCampaign(data)
            setView(true)
        }
    }

    // voting
    const handleVoteClick = (candidate, campaignId) => {

    };
    const handleVote = (campaignId, candidateId, votes) => {
        console.log("Data", campaignId, candidateId, votes);
        dispatch(updateCandidateVotes({ campaignId, candidateId, votes }));
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
                                        <Button onClick={() => { handleMangeCampaign(campagin) }} type="primary" key="buttonOne" className='bg-[#F09A3E] ' icon={<ArrowRightOutlined />} >
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
            <Modal open={view} title="Canditates" footer={null} onCancel={() => setView(false)} onOk={() => setView(false)} onFinish={onFinish} onFinishFailed={onFinishFailed} className=''  >
                {/* voting */}
                <div className='grid  sm:grid-cols-1 md:grid-cols-2 gap-4'>
                    {participants ? participants.map(candidate => (
                        <Card key={candidate.id} className='' actions={
                            [
                                <div className='flex justify-evenly items-center' key={candidate.id}>
                                    <LiaVoteYeaSolid focusable={true} key={candidate.id} style={{ color: 'green', fontSize: '30px' }} className=' hover:fill-green-500 rounded-lg fill-gray-500 ' onClick={() => handleVoteClick(candidate, urlId)} />
                                    <MdHowToVote focusable={true} key={candidate.id} style={{ color: 'green', fontSize: '30px' }} className=' hover:fill-green-500 rounded-lg fill-gray-500 ' onClick={() => handleVote(candidate, urlId, candidate.votes)} />
                                </div>
                            ]}

                            hoverable={true}
                        >
                            <div key={candidate.id} className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded  h-[350px] '>
                                <img src={candidate.candidateSymbol} alt='Symbol' className='rounded-full flex justify-center items-center' />,
                                <div className='font-bold  font-serif  '>
                                    {candidate.candidateName}
                                </div>

                                <div className='  font-serif  '>
                                    {candidate.votes}
                                </div>
                            </div>
                        </Card>

                    )) : "No Candidates Yet For Voting!"}
                </div>
            </Modal >
        </>
    )
}
export default CampaignPage
