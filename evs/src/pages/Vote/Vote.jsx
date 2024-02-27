import { useSelector } from 'react-redux'
import { Space, Select } from 'antd'

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const Vote = () => {
    const candidates = useSelector(state => state.candidates)
    console.log(candidates);

    return (
        <>
            <div className="min-h-screen mt-12">
                <h1 className='my-5' >Select Candidates For Voting</h1>
                <Space
                    style={{
                        width: '100%',
                    }}
                    direction="vertical"
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '30%',
                        }}
                        placeholder="Please select"
                        defaultValue={['a10', 'c12']}
                        onChange={handleChange}
                        options={options}
                    />
                </Space>
            </div >
        </>
    )
}

export default Vote 
