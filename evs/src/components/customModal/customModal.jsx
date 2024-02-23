import { useState } from "react";
import { Button, Modal, Space, Card } from 'antd'

const CustomModal = () => {


    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };


    return (
        <>
            <Space>
                <Button type="primary" className='outline-black bg-red-500' onClick={showModal}>
                    Open Modal
                </Button>
            </Space>
            <Modal
                open={open}
                title="Candidate For National Assembly"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <div >

                    <Card key={1} className='' actions={[
                    ]}
                        hoverable={true}
                    >
                        <div className='bg-gray-300 flex justify-center items-center flex-col p-8 rounded'>
                            <img src={'ok'} alt='User' className='rounded-full flex justify-center items-center' />,
                            <div className='font-bold  font-serif '>
                                Ali
                            </div>
                            <div className='font-bold  font-serif '>
                                NA - 162
                            </div>
                        </div>
                    </Card>

                </div >

            </Modal>
        </>
    );
};

export default CustomModal;