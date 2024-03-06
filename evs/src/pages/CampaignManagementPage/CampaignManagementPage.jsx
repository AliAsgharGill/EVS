import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button, message, Card, Modal } from 'antd';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { DeleteOutlined, EditOutlined, IdcardOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { fetchCampaigns } from '../../slices/campaignSlice';
import { ArrowRightOutlined } from '@ant-design/icons';


const CampaignManagementPage = () => {
    const { Meta } = Card;
    const formRef = useRef(null)
    const dispatch = useDispatch()


    const campaigns = useSelector(state => state.campaign.campaigns)
    console.log("Campagins", campaigns);

    const [view, setView] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCampaign, setSelectedCampaign] = useState(null)

    const manageCandidates = (campagin) => {
        const campaignExist = campaigns.find(camp => camp.id === campagin.id)
        if (campaignExist) {
            setSelectedCampaign(campaignExist.candidates)
            setView(true)
        }
    }

    useEffect(() => {
        dispatch(fetchCampaigns())
    }, [dispatch])


    const onFinish = (values) => {
        console.log('Success:', values);
        setView(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishFrom = (values) => {
        console.log('Success:', values);
        formRef.current.resetFields()
        // dispatch()        
        setIsModalOpen(false)
    };

    const onFinishFailedFrom = (errorInfo) => {
        console.log('Failed:', errorInfo);
        formRef.current.resetFields()
    };



    const handleAddCandidate = () => {
        setIsModalOpen(true)

    }

    return (
        <>
            <div className=' mt-20 sm:mt-10'>
                <h2 className='font-bold text-3xl' >Campaign Management</h2>
                {/* Fetching Existing campaigns */}
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
                                        <Button onClick={() => { manageCandidates(campagin) }} type="primary" key="buttonTwo" className='bg-[#F09A3E] ' icon={<ArrowRightOutlined />} >
                                            Manage Candidates
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

                        </Card >
                    ))}
                </div >

            </div >
            {/* Modal for voting */}
            <Modal Modal open={view} title="Canditates" onCancel={() => setView(false)} onOk={() => setView(false)} onFinish={onFinish} onFinishFailed={onFinishFailed} className='w-screen' >
                <div className='p-4'>
                    <Button onClick={() => handleAddCandidate(selectedCampaign.candidates)} type="primary" key="button" className='bg-[#F09A3E]  ' icon={<ArrowRightOutlined />} >
                        Add Candidate
                    </Button >
                </div>
                <div className='grid  sm:grid-cols-1 md:grid-cols-2 gap-4'>
                    {selectedCampaign && (
                        // console.log("Camp Cand", selectedCampaign),
                        selectedCampaign.map((candidate, index) => (
                            // start

                            // end
                            <Card key={index} className='' actions={[
                                <EditOutlined key='edit' style={{ color: 'blue' }} /*onClick={() => handleEdit(candidate.id)} */ />,

                                < IdcardOutlined key='view' style={{ color: 'skyblue' }}/* onClick={() => handleIdCardClick(candidate.id)} */ />,

                                <DeleteOutlined key='delete' style={{ color: '#c13584' }}/* onClick={() => handleDelete(candidate.id)}*/ />
                            ]}
                                hoverable={true}
                            >
                                <div key={candidate.id} className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded h-[350px]'>
                                    <img src={candidate.candidateSymbol} alt='Symbol' className='rounded-full flex justify-center items-center' />,
                                    <div className='font-bold  font-serif  '>
                                        {candidate.candidateName}
                                    </div>
                                    <div className='font-bold  font-serif  '>
                                        ID:{candidate.id}
                                    </div>
                                    <div className='font-serif  '>
                                        Votes:{candidate.votes}
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </Modal >
            {/* Modal For Adding Candidate */}
            <Modal Modal open={isModalOpen} title="Add Candidate" onCancel={() => setIsModalOpen(false)} onOk={() => setIsModalOpen(false)} onFinish={onFinish} onFinishFailed={onFinishFailed} footer={null} >

                <Form
                    ref={formRef}
                    name="login-form"
                    onFinish={onFinishFrom}
                    onFinishFailed={onFinishFailedFrom}
                    layout="vertical"
                    className={`bg-gray-300 p-10 rounded`}
                >
                    <Form.Item
                        label="Name"
                        name="candidateName"
                        rules={[{ required: true, message: 'Please enter your Name!' }]}
                    >
                        <Input placeholder='Email' prefix={<FaRegUserCircle />} />
                    </Form.Item>
                    <Form.Item
                        label="Symbol Image Link"
                        name="candidateSymbol"
                        rules={[{ required: true, message: 'Please Input Link of Symbol!' }]}
                    >
                        <Input placeholder='Password' prefix={<RiLockPasswordLine />} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='bg-gray-900'>
                            Add
                        </Button>
                    </Form.Item>
                </Form >
            </Modal >
        </>
    )
}

// new

export default CampaignManagementPage