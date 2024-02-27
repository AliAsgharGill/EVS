import { Row, Col, Button } from 'antd'
import { HomePageHero } from '../../components/HomePageHero.jsx/HomePageHero'
import { HomePageSection } from '../../components/HomePageSection/HomePageSection'
import { HomePageFAQ } from '../../components/HomePageFAQ/HomePageFAQ'
import Vote from '../Vote/Vote'


const Home = () => {

    return (
        <>
            <div className='mt-14'>
                <HomePageHero />
            </div>
            <HomePageSection />
            <HomePageFAQ />
        </>
    )
}

export default Home
