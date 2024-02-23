import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCandidates } from '../../slices/canidateSlice/canidateSlice'
import { Card, Modal } from "antd"
import { DeleteOutlined, EditOutlined, IdcardOutlined } from '@ant-design/icons';


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


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCandidates())
        }
    }, [status, dispatch])


    if (status === 'Loading...') {
        return <div>Loading...</div>
    }
    if (status === 'Failed') {
        return <div>Error:{error}</div>
    }

    return (
        <>

            <h1 className='font-bold text-3xl mb-10 text-gray-500 '>List of Candidates</h1>

            {/* List of Candidates */}
            <div className=' grid grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                {candidates.map((candidate) => (

                    <Card key={candidate.id} className='' actions={[
                        <EditOutlined key={candidate.id} style={{ color: 'blue' }} onClick={() => handleEdit(candidate.id)} />,

                        < IdcardOutlined key={candidate.id} style={{ color: 'skyblue' }} onClick={() => handleIdCardClick(candidate.id)} />,

                        <DeleteOutlined key={candidate.id} style={{ color: '#c13584' }} />
                    ]}
                        hoverable={true}
                    >
                        <div className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded h-[350px]'>
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

        </>
    )

}

export default CandidateList



