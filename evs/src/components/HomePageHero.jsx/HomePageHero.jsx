import { Button, Modal } from "antd";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from "react";

export const HomePageHero = () => {
    const navigate = useNavigate()
    const candidates = useSelector(state => state.candidates.candidates)
    const [view, setView] = useState(false)

    return (
        <div className="relative">
            <img
                src="public/Images/Background/HomePageHero.jpg"
                className="absolute inset-0 object-cover w-full h-full filter brightness-75 rounded-lg "
                alt="HeroImage"
            />
            <div className="relative bg-opacity-75 bg-deep-purple-accent-700">
                <svg
                    className="absolute inset-x-0 bottom-0 text-white"
                    viewBox="0 0 1160 163"
                >
                    <path
                        fill="currentColor"
                        d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
                    />
                </svg>
                <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between xl:flex-row">
                        <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                                By the people For  <br className="hidden md:block" />
                                the people Of the people
                            </h2>
                            <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                                quae.
                            </p>
                            <Button
                                onClick={() => navigate('/vote')}
                                aria-label=""
                                className=" text-black inline-flex bg-[#F09A3E] items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700 p-5 "
                            >
                                Cast Vote Now
                                <svg
                                    className="inline-block w-3 ml-2"
                                    fill="currentColor"
                                    viewBox="0 0 12 12"
                                >
                                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                                </svg>
                            </Button>
                        </div>

                        <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                            <div className="bg-white rounded-md shadow-2xl p-7 sm:p-10">
                                <h3 className="font-bold text-lg">Voting Result of All Campaigns!</h3>
                                <div className="grid gap-4 sm:grid-cols-2 p-2 mt-3">
                                    <Button className="bg-[#F09A3E] font-bold    hover:shadow-xl" onClick={() => setView(true)} >Candidates Result </Button>
                                    <Button className="bg-[#F09A3E] font-bold hover:shadow-xl" onClick={() => setView(true)} >Programming</Button>
                                    <Button className="bg-[#F09A3E] font-bold hover:shadow-xl" onClick={() => setView(true)} >Phones Result</Button>
                                    <Button className="bg-[#F09A3E] font-bold hover:shadow-xl" onClick={() => setView(true)} >Electronics Result</Button>
                                </div>
                                <Modal open={view} onCancel={() => setView(false)} onOk={() => setView(false)} >
                                    {candidates ?
                                        candidates.map(candidate => (
                                            <div className="flex justify-between items-center m-2 bg-slate-300 p-1 rounded-md space-x-3" key={candidate.id}>
                                                <p className="p-1" > {candidate.name}</p>
                                                <p className="bg-[#F09A3E] p-1 rounded-md"> {candidate.votes} Votes</p>
                                            </div>
                                        ))
                                        : "Waiting For Result"}
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};