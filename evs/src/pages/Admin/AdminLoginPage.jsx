import LoginForm from "../../components/LoginForm/LoginForm"

const AdminSignupPage = () => {
    return (
        <>
            <div className='flex justify-center min-h-screen items-center'>
                <LoginForm prop='w-1/3 h-1/2' path="/admin" />
            </div>
        </>
    )
}

export default AdminSignupPage
