import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { candidatesActions, fetchCandidates } from '../../slices/canidateSlice/canidateSlice'
import { Card, Modal, Button } from "antd"
import { DeleteOutlined, EditOutlined, IdcardOutlined } from '@ant-design/icons';
import SignupForm from '../../components/SignupForm/SignupForm';
import AddNewCandidateForm from '../../components/NewCandidateForm/AddNewCandidateForm';


const CandidateList = () => {
    const dispatch = useDispatch()

    const candidates = useSelector((state) => state.candidates.candidates)
    const status = useSelector((state) => state.candidates.status)
    const error = useSelector((state) => state.candidates.error)


    const handleEdit = (id) => {
        const findCandidate = candidates.find(candidate => candidate.id === id)
        // setCandidate(findCandidate)
        console.log('Can:', findCandidate);
    }

    const handleIdCardClick = (id) => {
        const findCandidate = candidates.find(candidate => candidate.id === id)
        setSelectedCandidate(findCandidate)
        setIsModalVisible(true)
    }

    const [selectedCandidate, setSelectedCandidate] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isVisible, setIsVisible] = useState(false)


    const handleDelete = (id) => {
        // console.log("Delete:", id);
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
        return <div className='bg-red-600'>Loading...</div>
    }
    if (status === 'Failed') {
        return <div>Error:{error}</div>
    }

    const handleAddNewCandidate = () => {
        setIsVisible(true)

    }

    return (
        <>

            <h1 className='font-bold text-3xl mt-28  text-gray-500 '>List of Candidates</h1>
            <div className='flex my-5' >
                <Button className='bg-[#F09A3E] font-bold text-gray-800' onClick={handleAddNewCandidate} > Add New Candidate</Button>
            </div>
            {/* List of Candidates */}
            <div className=' grid grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                {candidates.map((candidate, index) => (

                    <Card key={index} className='' actions={[
                        <EditOutlined key={candidate.id} style={{ color: 'blue' }} onClick={() => handleEdit(candidate.id)} />,

                        < IdcardOutlined key={candidate.id} style={{ color: 'skyblue' }} onClick={() => handleIdCardClick(candidate.id)} />,

                        <DeleteOutlined key={candidate.id} style={{ color: '#c13584' }} onClick={() => handleDelete(candidate.id)} />
                    ]}
                        hoverable={true}
                    >
                        <div key={candidate.id} className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded h-[350px]'>
                            <img src={candidate.image} alt='Symbol' className='rounded-full flex justify-center items-center' />,
                            <div className='font-bold  font-serif '>
                                {candidate.name}
                            </div>
                            <div className='font-bold  font-serif '>
                                {candidate.email}
                            </div>
                            <div className='font-bold  font-serif '>
                                {candidate.na}
                            </div>
                        </div>
                    </Card>
                ))}
            </div >

            {/* Modal Code */}

            <Modal open={isModalVisible} title="Canditate For National Assembly" onCancel={() => setIsModalVisible(false)} onOk={() => setIsModalVisible(false)}  >
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
            <Modal open={isVisible} title="Add Canditate For National Assembly" onCancel={() => setIsVisible(false)} onOk={() => setIsVisible(false)}  >
                {<AddNewCandidateForm />}
            </Modal>

        </>
    )

}

export default CandidateList



