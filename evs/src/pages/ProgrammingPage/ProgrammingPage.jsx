import { useState, useEffect } from 'react'
import { Button, Card, Modal, Form } from 'antd';
import { DeleteOutlined, EditOutlined, IdcardOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchLanguages, languageActions } from '../../slices/programmingSlice/programmingSlice'


const ProgrammingPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const languages = useSelector(state => state.programming.languages)
    const status = useSelector(state => state.programming.status)
    const error = useSelector(state => state.programming.error)

    // console.log("Languages:", languages, "Status", status, "Error:", error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLanguages())
        }
    }, [status, dispatch])

    if (status === "Loading") {
        return <div className='font-bold text-3xl mt-28  text-[#F09A3E] '>Loading...</div>
    }

    if (status === "Error") {
        return <div className='font-bold text-3xl mt-28  text-[#F09A3E] '>Error:{error}</div>
    }
    return (
        <>
            <div className="mt-12">
                <h1 className='font-bold text-3xl mt-28 text-[#F09A3E]'>Programming List</h1>
                <button className='font-bold p-2 rounded-lg bg-[#F09A3E] text-black' onClick={() => navigate('/programmingVoting')}>Vote</button>
            </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5'>
                {languages ?
                    languages.map((language) => (
                        <Card key={language.id} className='' actions={[
                            <EditOutlined key='edit' style={{ color: 'blue' }} />,

                            < IdcardOutlined key='view' style={{ color: 'skyblue' }} />,

                            <DeleteOutlined key='delete' style={{ color: '#c13584' }} />
                        ]}
                            hoverable={true}
                        >
                            <div key={language.id} className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded h-[350px]'>
                                <img src={language.symbol} alt='Symbol' className='rounded-full flex justify-center items-center w-fit h-16' />,
                                <div className='font-bold  font-serif  '>
                                    {language.name}
                                </div>
                                <div className='  font-serif '>
                                    {language.launchdate}
                                </div>
                                <div className='  font-serif  '>
                                    {language.feature}
                                </div>
                            </div>
                        </Card>
                    ))
                    : "No Data Found"
                }
            </div>

            {/* View Modal */}
            <Modal>
                
            </Modal>
        </>
    )
}

export default ProgrammingPage
