import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import { LiaVoteYeaSolid } from "react-icons/lia";
import { useDispatch } from 'react-redux'
import { updateCandidateVotes } from '../../slices/canidateSlice/canidateSlice';
import { fetchCandidates } from '../../slices/canidateSlice/canidateSlice'
import { useNavigate } from 'react-router-dom'


const Vote = () => {
    const candidates = useSelector(state => state.candidates.candidates);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleVoteClick = (candidate) => {
        const updatedVotes = Number(candidate.votes) + 1;
        dispatch(updateCandidateVotes({ id: candidate.id, votes: updatedVotes }));
        navigate('/')
    };
    useEffect(() => {
        dispatch(fetchCandidates())
    }, [dispatch])


    return (
        <>
            <div className="min-h-screen mt-12">
                <h1 className='my-5 mb-10 text-4xl font-bold'>Cast Vote To Your Favorite Candidate</h1>
                <div className='grid grid-cols-3 gap-4' >
                    {candidates ? candidates.map(candidate => (
                        <Card key={candidate.id} className='' actions={[

                            <div className='flex justify-evenly items-center' key={candidate.id}>
                                <LiaVoteYeaSolid focusable={true} key={candidate.id} style={{ color: 'green', fontSize: '30px' }} className=' hover:fill-green-500 rounded-lg fill-gray-500 ' onClick={() => handleVoteClick(candidate)} />
                            </div>
                        ]}

                            hoverable={true}
                        >
                            <div key={candidate.id} className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded  h-[350px] '>
                                <img src={candidate.symbol} alt='Symbol' className='rounded-full flex justify-center items-center' />,
                                <div className='font-bold  font-serif  '>
                                    {candidate.name}
                                </div>
                                <div className='  font-serif '>
                                    {candidate.email}
                                </div>
                                <div className='  font-serif  '>
                                    {candidate.phone}
                                </div>
                                <div className='  font-serif  '>
                                    {candidate.votes}
                                </div>
                            </div>
                        </Card>

                    )) : "No Data Found!"}
                </div>
            </div>
        </>
    );
};

export default Vote;
