import { Link } from "react-router-dom"
import { Row, Col, Button } from 'antd'
import SignupForm from "../components/SignupForm/SignupForm"
import LoginForm from "../components/LoginForm/LoginForm"
import { useState } from "react"


const Home = () => {
    const [show, setShow] = useState(false)

    const showModal = () => setShow(true)
    const closeModal = () => setShow(false)

    return (
        <>
            <Link to="about">About Us</Link>
            <Link to="candidates">Candidates</Link>
            <Row justify="center" style={{ marginTop: 100 }}>
                <Col span={8}>
                    <Button onClick={showModal} >Open</Button>
                    <Modal show={show}  >
                        <div>                            
                            <SignupForm  onClose={closeModal} />
                        </div>
                    </Modal>
                </Col>
                {/* <Col span={8}>
                    <h1>Login</h1>
                    <LoginForm />
                </Col> */}


            </Row>
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