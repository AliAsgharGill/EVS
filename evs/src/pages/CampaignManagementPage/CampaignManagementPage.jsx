import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button, message, Card, Modal } from 'antd';
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';
import { deleteCampaign, fetchCampaigns } from '../../slices/campaignSlice';
import { ArrowRightOutlined } from '@ant-design/icons';
import { FaLink } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { addCandidate, deleteCandidate, fetchDynamicCandidates, updateCandidate } from '../../slices/dyanmicCandidateSlice/dyanmicCandidateSlice';
import { DeleteOutlined, EditOutlined, IdcardOutlined } from '@ant-design/icons';

const CampaignManagementPage = () => {
    const { Meta } = Card;
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isAdmin, setIsAdmin] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admins?email=${user.email}`)
                setIsAdmin(!!response.data.length)
            } catch (error) {
                console.log("Error Fetching Admins", error);
            }
        }

        if (user) {
            fetchAdmins()
        } else {
            navigate('/login/admin');
            message.info("Please Login First As Admin")
        }
    }, [user, navigate]);




    const [view, setView] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [campaignID, setCampaignID] = useState(null)
    const campaigns = useSelector(state => state.campaign.campaigns)
    // console.log("Campagins", campaigns);    
    const dynamicCandidates = useSelector(state => state.dynamicCandidates.candidates)

    const [selectedCampaign, setSelectedCampaign] = useState(null)
    const [participants, setParticipants] = useState(null)

    const manageCandidates = (campagin) => {
        const campaignExist = campaigns.find(camp => camp.id === campagin.id)
        const contestants = dynamicCandidates.filter(can => can.campaignID === campaignExist.id)
        // console.log("contestants", contestants);
        setParticipants(contestants)
        if (campaignExist) {
            const data = campaignExist.candidates
            setSelectedCampaign(data)
            setView(true)
        }

        const campExist = campaigns.find(camp => camp.id === campagin.id)
        if (campExist) {
            setSelectedCampaign(campaignExist.candidates)
            setCampaignID(campaignExist.id)
            setView(true)
        }
    }

    const handleDeleteCampaign = (id) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want delete?',
            okButtonProps: { style: { backgroundColor: "#F09A60" } },
            onOk() {
                dispatch(deleteCampaign(id));
            },
            onCancel() { },
        });
    }

    useEffect(() => {
        dispatch(fetchCampaigns())
        dispatch(fetchDynamicCandidates())
    }, [dispatch])


    const onFinish = (values) => {
        console.log('Success:', values);
        setView(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishFrom = async (values) => {
        console.log('Success:', values);
        formRef.current.resetFields()
        dispatch(addCandidate({ ...values, campaignID: campaignID, votes: 0 }))
        setIsModalOpen(false)
        message.success("Candidate Added Successfully!")
    };

    const onFinishFailedFrom = (errorInfo) => {
        console.log('Failed:', errorInfo);
        formRef.current.resetFields()
    };

    const handleAddCandidate = (campaign) => {
        console.log("Campaign Is:", campaign);
        setIsModalOpen(true)
    }


    const [edit, setEdit] = useState(null)
    const [viewModal, setViewModal] = useState(false)

    const handleEdit = (id) => {
        const findCandidate = dynamicCandidates.find(candidate => candidate.id === id)
        if (findCandidate) {
            setEdit(findCandidate)
            setViewModal(true)
        }
    }

    const handleUpdateCandidate = () => {
        dispatch(updateCandidate(edit));
        setViewModal(false);
        setEdit(null)
    }

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want delete?',
            okButtonProps: { style: { backgroundColor: "#F09A60" } },
            onOk() {
                dispatch(deleteCandidate(id));
            },
            onCancel() { },
        });
    }
    return (
        <>
            {isAdmin && (
                <div>
                    <div className=' mt-20 sm:mt-10'>
                        <h2 className='font-bold text-3xl text-[#F09A3E]' >Campaign Management</h2>
                        {/* Fetching Existing campaigns */}
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
                                                <IdcardOutlined onClick={() => { manageCandidates(campagin) }} key='view' style={{ color: 'skyblue' }} />,


                                                <DeleteOutlined onClick={() => handleDeleteCampaign(campagin.id)} key='delete' style={{ color: '#c13584' }} />



                                                {/* <EditOutlined key='edit' style={{ color: 'blue' }} />, */}



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
                    {/* Modal for dispaying candidates */}
                    <Modal Modal open={view} title="Canditates" onCancel={() => setView(false)} onOk={() => setView(false)} onFinish={onFinish} width={1000} onFinishFailed={onFinishFailed} className='w-screen' >
                        <div className='p-4 space-x-5'>
                            <Button onClick={() => handleAddCandidate(selectedCampaign)} type="primary" key="button" className='bg-[#F09A3E]  ' icon={<FaRegUserCircle />} >
                                Add Candidate
                            </Button >
                        </div>
                        <div className='grid  sm:grid-cols-1 md:grid-cols-3 gap-4'>
                            {participants && (
                                // console.log("Camp Cand", selectedCampaign),
                                participants.map((participant => (
                                    <Card key={participant.id} className='' actions={[
                                        // <EditOutlined key='edit' style={{ color: 'blue' }} onClick={() => handleEdit(participant.id)} />,

                                        <DeleteOutlined key='delete' style={{ color: '#c13584' }} onClick={() => handleDelete(participant.id)} />
                                    ]}
                                        hoverable={true}
                                    >
                                        <div key={participant.id} className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded h-[350px]'>
                                            <img src={participant.candidateSymbol} alt='Symbol' className='rounded-full flex justify-center items-center' />,
                                            <div className='font-bold  font-serif  '>
                                                {participant.candidateName}
                                            </div>
                                            <div className='font-bold  font-serif  '>
                                                ID:{participant.id}
                                            </div>
                                            <div className='font-serif  '>
                                                Votes:{participant.votes}
                                            </div>
                                        </div>
                                    </Card>
                                ))
                                ))}
                        </div>
                    </Modal >
                    {/* Modal For Adding Candidate */}
                    <Modal Modal open={isModalOpen} title="Add Candidate/Product" onCancel={() => setIsModalOpen(false)} onOk={() => setIsModalOpen(false)} onFinish={onFinish} onFinishFailed={onFinishFailed} footer={null} >

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
                                <Input placeholder='Name' prefix={<FaRegUserCircle />} />
                            </Form.Item>
                            <Form.Item
                                label="Symbol Image Link"
                                name="candidateSymbol"
                                rules={[{ required: true, message: 'Please Input Link of Symbol!' }]}
                            >
                                <Input placeholder='Symbol Link' prefix={<FaLink />} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className='bg-gray-900 w-full'>
                                    Add
                                </Button>
                            </Form.Item>
                        </Form >
                    </Modal >

                    {/* Edit Modal Code */}
                    <Modal
                        open={viewModal}
                        title="Edit Candidate"
                        onCancel={() => setViewModal(false)}
                        onOk={handleUpdateCandidate}
                        okButtonProps={{ style: { backgroundColor: 'blue' } }}
                    >
                        {edit ? (
                            <Form Form onSubmit={handleUpdateCandidate} className='flex p-2 justify-center space-y-2  items-center flex-col bg-slate-300 '>
                                <input
                                    className='mt-3 p-1 rounded-lg w-1/2 outline-none'
                                    type="text"
                                    name='name'
                                    defaultValue={edit.name}
                                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                                />
                                <input
                                    className='mt-3 p-1 rounded-lg w-1/2 outline-none'
                                    type="text"
                                    name='email'
                                    defaultValue={edit.email}
                                    onChange={(e) => setEdit({ ...edit, email: e.target.value })}
                                />
                                <input
                                    className='mt-3 p-1 rounded-lg w-1/2 outline-none'
                                    type="text"
                                    name='phone'
                                    defaultValue={edit.phone}
                                    onChange={(e) => setEdit({ ...edit, phone: e.target.value })}
                                />

                            </Form>
                        ) : (
                            'No Data'
                        )}
                    </Modal >
                </div>
            )}
        </>
    )
}

// new

export default CampaignManagementPage