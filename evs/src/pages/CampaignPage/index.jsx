import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { fetchCampaigns } from '../../slices/campaignSlice';
import UserDetails from '../UserDetails/Index';
import CustomCard from '../../components/CustomCard/Index';

const CampaignPage = () => {
    const candidateImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlGrPLYk-YU4p3zX0wDMp8JIEEmyptrqqkA&usqp=CAU'
    const programmingImage = 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_640.jpg'
    const phonesImage = "https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938_640.jpg"
    const electronicsImage = "https://cdn.pixabay.com/photo/2017/07/31/18/29/laptop-2559792_1280.jpg"

    const dispatch = useDispatch()
    const campaigns = useSelector((state) => state.campaign.campaigns)
    console.log("camp", campaigns);
    useEffect(() => {
        dispatch(fetchCampaigns())
    }, [])
    return (
        <>
            <h1 className=" mt-20 sm:mt-12 font-bold text-3xl text-[#F09A3E] ">Choose Campaign To Vote</h1>
            <div className='grid sm:grid-cols-3 gap-y-6 gap-4 my-10'>
                {/* candidate card */}
                <CustomCard title={'Candidates'} description={'Explore a diverse range of candidates with varying backgrounds, experiences, and visions for the future, Cast vote to your favorite.'} image={candidateImage} path={'/candidates'} />
                {/* programming card */}
                <CustomCard title={'Programming Languages'} description={"Discover a variety of programming languages, each with its own strengths and use cases. Cast vote to your favorite."} image={programmingImage} path={'/'} />
                {/* Phones Card */}
                <CustomCard title={'Phones'} description={'"Explore the latest smartphones with advanced features and cutting-edge technology,Cast vote to your favorite.",'} image={phonesImage} path={'/'} />
                {/* Electronics Card */}
                <CustomCard title={"Electronics"} description={"Discover a wide range of electronic products, from gaming consoles to laptops and drones,Cast vote to your favorite."} image={electronicsImage} path={'/'} />
            </div >
            {/* Dyanimic Data */}
            {/* <div>
                <div className='grid place-items-center sm:grid-cols-2 lg:grid-cols-3 p-3 gap-4  mt-5 min-h-screen ' >
                    {campaigns ? campaigns.map((campaign, index) => (
                        <div key={index} className=''>
                            <Card
                                className='outline outline-gray-100'
                                key={index}
                                hoverable
                                style={{
                                    width: 300,
                                }}

                                cover={
                                    <img
                                        style={{
                                            height: 200
                                        }}
                                        alt="example"
                                        src={campaign.image}
                                    />
                                }
                                actions={[
                                    <Button type="primary" key="button" className='bg-[#F09A3E] w-1/2 ' icon={<ArrowRightOutlined />} >
                                        Visit
                                    </Button >
                                ]}
                            >
                                <Meta
                                    style={{ textAlign: 'justify' }}
                                    title={campaign.name}
                                    description={campaign.description}
                                />
                            </Card>
                        </div>
                    ))
                        : console.log("No Campaigns Launch Yet!")}
                </div>
            </div> */}
            <UserDetails />
        </>
    )
}

export default CampaignPage
