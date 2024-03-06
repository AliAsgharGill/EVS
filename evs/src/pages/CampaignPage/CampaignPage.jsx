import { useEffect, useState } from 'react';
import { Card, Button, Modal, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCampaigns, updateVotes } from '../../slices/campaignSlice';
import { ArrowRightOutlined } from '@ant-design/icons';
// voting

import { LiaVoteYeaSolid } from "react-icons/lia";
import { updateCandidateVotes } from '../../slices/canidateSlice/canidateSlice';
import { fetchCandidates } from '../../slices/canidateSlice/canidateSlice'
import { useNavigate } from 'react-router-dom'

const CampaignPage = () => {
    const { Meta } = Card;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchCampaigns())
    }, [dispatch])

    const campaigns = useSelector(state => state.campaign.campaigns)
    // console.log(campaigns);


    const [view, setView] = useState(false)
    const [selectedCampaign, setSelectedCampaign] = useState(null)
    const [urlId, setUrlId] = useState(false)
    console.log("selectedCampaign", selectedCampaign);

    const handleCastVote = (campagin) => {
        const campaignExist = campaigns.find(camp => camp.id === campagin.id)
        if (campaignExist) {
            setUrlId(campaignExist.id)
            const data = campaignExist.candidates
            setSelectedCampaign(data)
            setView(true)
        }
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        setView(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };

    // voting
    const handleVoteClick = (candidate, campaignId) => {
        const updatedVotes = candidate.votes + 1;
        dispatch(updateVotes({ campaignId: campaignId, candidateId: candidate.id, vote: updatedVotes }))
            // .then(() => {
            //     message.success("Vote counted successfully!");
            // })
            // .catch((error) => {
            //     console.error("Failed to update votes:", error);
            //     message.error("Failed to update votes. Please try again.");
            // });
        setView(false);
    };


    useEffect(() => {
        dispatch(fetchCandidates())
    }, [dispatch])
    return (
        <>
            <div>
                <h1 className='mt-20 font-bold text-3xl'>Campaigns</h1>
                <div className=' p-5 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 place-items-center'>
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
                                        <Button onClick={() => { handleCastVote(campagin) }} type="primary" key="buttonOne" className='bg-[#F09A3E] ' icon={<ArrowRightOutlined />} >
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
                    {selectedCampaign ? selectedCampaign.map(candidate => (
                        <Card key={candidate.id} className='' actions={
                            [
                                <div className='flex justify-evenly items-center' key={candidate.id}>
                                    <LiaVoteYeaSolid focusable={true} key={candidate.id} style={{ color: 'green', fontSize: '30px' }} className=' hover:fill-green-500 rounded-lg fill-gray-500 ' onClick={() => handleVoteClick(candidate, urlId)} />
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

                    )) : "No Data Found!"}
                </div>
            </Modal >
        </>
    )
}
export default CampaignPage
