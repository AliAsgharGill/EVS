import { Button, Card, Modal, Form } from 'antd';
import { DeleteOutlined, EditOutlined, IdcardOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { candidatesActions, fetchCandidates } from '../../slices/canidateSlice/canidateSlice'
import AddNewCandidateForm from '../../components/NewCandidateForm/AddNewCandidateForm';
import { useNavigate } from 'react-router-dom'


const CandidateList = () => {

    const [selectedCandidate, setSelectedCandidate] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [edit, setEdit] = useState(null)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const candidates = useSelector((state) => state.candidates.candidates)
    const status = useSelector((state) => state.candidates.status)
    const error = useSelector((state) => state.candidates.error)


    const handleEdit = (id) => {
        const findCandidate = candidates.find(candidate => candidate.id === id)
        if (findCandidate) {
            setEdit(findCandidate)
            setViewModal(true)
        }
    }

    const handleUpdateCandidate = () => {
        dispatch(candidatesActions.updateCandidate(edit));
        setViewModal(false);
        setEdit(null)
    }


    const handleIdCardClick = (id) => {
        const findCandidate = candidates.find(candidate => candidate.id === id)
        setSelectedCandidate(findCandidate)
        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsVisible(false);
    };

    const handleAddNewCandidate = () => {
        setIsVisible(true)
    }


    const onFinish = (values) => {
        console.log('Success:', values);
        setViewModal(false)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setViewModal(false)
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this candidate?')) {
            dispatch(candidatesActions.deleteCandidate(id));
        }
    }



    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCandidates())
        }
    }, [status, dispatch])


    if (status === 'Loading...') {
        return <div className='font-bold text-3xl mt-28  text-[#F09A3E] '>Loading...</div>
    }
    if (status === 'Failed') {
        return <div className='font-bold text-3xl mt-28  text-[#F09A3E] '>Error:{error}</div>
    }



    return (
        <>

            <h1 className='font-bold text-3xl mt-10  text-gray-500 '>List of Candidates</h1>
            <div className='flex my-5  justify-center sm:justify-start items-center space-x-5 ' >
                <Button className='bg-[#F09A3E] font-bold text-gray-800' onClick={handleAddNewCandidate} > Add New Candidate</Button>
                <Button className='bg-[#F09A3E] font-bold text-gray-800' onClick={() => navigate('/candidatesVoting')} > Cast Vote Now</Button>
            </div>
            {/* List of Candidates */}
            <div className=' grid gap-4 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 '>
                {candidates ? candidates.map((candidate, index) => (

                    <Card key={index} className='' actions={[
                        <EditOutlined key='edit' style={{ color: 'blue' }} onClick={() => handleEdit(candidate.id)} />,

                        <IdcardOutlined key='view' style={{ color: 'skyblue' }} onClick={() => handleIdCardClick(candidate.id)} />,

                        <DeleteOutlined key='delete' style={{ color: '#c13584' }} onClick={() => handleDelete(candidate.id)} />
                    ]}
                        hoverable={true}
                    >
                        <div key={candidate.id} className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded h-[350px]'>
                            <img src={candidate.symbol ? candidate.symbol : candidate.image} alt='Symbol' className='rounded-full flex justify-center items-center' />,
                            <div className='font-bold  font-serif  '>
                                {candidate.name}
                            </div>
                            <div className='  font-serif '>
                                {candidate.email}
                            </div>
                            <div className='  font-serif  '>
                                {candidate.phone}
                            </div>
                        </div>
                    </Card>
                )) : "No Candidates"}

            </div >

            {/* View Modal Code */}
            <Modal open={isModalVisible} title="Canditate For National Assembly" onCancel={() => setIsModalVisible(false)} onOk={() => setIsModalVisible(false)} onFinish={onFinish} onFinishFailed={onFinishFailed}  >
                {selectedCandidate && (
                    <Card key={selectedCandidate.id} hoverable={true}>
                        <div className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded'>
                            <img src={selectedCandidate.image} alt='User' className='rounded-full flex justify-center items-center' />,
                            <div className='font-bold  font-serif '>
                                {selectedCandidate.name}
                            </div>
                            <div className='font-bold  font-serif '>
                                {selectedCandidate.na}
                            </div>
                            <div className='font-bold  font-serif '>
                                {selectedCandidate.email}
                            </div>
                            <div className='font-bold  font-serif my5 '>
                                Party:{selectedCandidate.company.name}
                            </div>
                        </div>
                    </Card>
                )}
            </Modal>

            {/* Add new Candidate Modal */}
            <Modal open={isVisible} title="Add Canditate" onCancel={() => setIsVisible(false)} onOk={() => setIsVisible(false)}  >
                {<AddNewCandidateForm onCloseModal={handleCloseModal} />}
            </Modal>

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


        </>
    )

}

export default CandidateList