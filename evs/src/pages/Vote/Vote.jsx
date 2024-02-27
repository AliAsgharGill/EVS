import { useSelector } from 'react-redux';
import { Card } from 'antd';
import { FaStamp, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const Vote = () => {
    const candidates = useSelector(state => state.candidates.candidates);

    console.log(candidates);

    return (
        <>
            <div className="min-h-screen mt-12">
                <h1 className='my-5 mb-10 text-4xl font-bold'>Cast Vote To Your Favorite Party</h1>
                <div className='grid grid-cols-3 gap-4' >
                    {candidates ? candidates.map(candidate => (
                        <Card key={candidate.id} className='' actions={[

                            <div className='flex justify-evenly items-center' key={candidate.id}>

                                <FaThumbsUp key={candidate.id} style={{ color: 'blue', fontSize: '30px' }} />,
                                <FaThumbsDown key={candidate.id} style={{ color: '#c13584', fontSize: '30px' }} />
                            </div>
                        ]}

                            hoverable={true}
                        >
                            <div key={candidate.id} className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded  h-[350px]'>
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
                            </div>
                        </Card>

                    )) : "No Data Found!"}
                </div>
            </div>
        </>
    );
};

export default Vote;
