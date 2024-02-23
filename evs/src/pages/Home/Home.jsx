import { Row, Col, Button } from 'antd'
import SignupForm from "../../components/SignupForm/SignupForm"
import LoginForm from '../../components/LoginForm/LoginForm'
import { useState } from "react"


const Home = () => {
    const [show, setShow] = useState(false)

    const showModal = () => setShow(true)
    const closeModal = () => setShow(false)

    return (
        <>
            <div className="min-h-screen mt-12 ">
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