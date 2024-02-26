import { Row, Col, Button } from 'antd'
import SignupForm from "../../components/SignupForm/SignupForm"
import LoginForm from '../../components/LoginForm/LoginForm'
import { useState } from "react"
import { HomePageHero } from '../../components/HomePageHero.jsx/HomePageHero'
import { HomePageSection } from '../../components/HomePageSection/HomePageSection'
import { HomePageFAQ } from '../../components/HomePageFAQ/HomePageFAQ'


const Home = () => {
    const [show, setShow] = useState(false)

    const showModal = () => setShow(true)
    const closeModal = () => setShow(false)

    return (
        <>
            <div className='mt-14'>
                <HomePageHero />
            </div>
            <HomePageSection />
            <HomePageFAQ />
            <div className=" mt-12 ">
                {/* <Link to="/candidates">Candidates</Link> */}
                <Row justify="center" style={{ marginTop: 100 }}>
                    <Col span={8}>

                    </Col>
                    <Col span={8}>

                    </Col>
                </Row>
            </div >
        </>
    )
}

export default Home

const Modal = ({ show, children }) => {
    if (!show) return null
    return (
        <div>
            {children}

        </div>
    )
}