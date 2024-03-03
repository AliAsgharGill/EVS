import { Card, Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
const CustomCard = ({ image, title, description, path }) => {
    const { Meta } = Card;
    const navigate = useNavigate()
    return (
        <>
            <Card
                style={{ width: 300, }}
                className='outline outline-gray-100 outline-1 '
                hoverable


                cover={
                    <img
                        style={{
                            height: 200
                        }}
                        alt="example"
                        src={image}
                    />
                }
                actions={[
                    <Button onClick={() => navigate(path)} type="primary" key="button" className='bg-[#F09A3E] w-1/2 ' icon={<ArrowRightOutlined />} >
                        Visit
                    </Button >
                ]}
            >
                <Meta

                    style={{ textAlign: 'justify', height: '120px' }}
                    title={title}
                    description={description}
                />
            </Card>
        </>
    )
}

export default CustomCard
