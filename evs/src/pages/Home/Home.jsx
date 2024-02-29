import { useEffect } from 'react'
import { HomePageHero } from '../../components/HomePageHero.jsx/HomePageHero'
import { HomePageSection } from '../../components/HomePageSection/HomePageSection'
import { HomePageFAQ } from '../../components/HomePageFAQ/HomePageFAQ'
import { useDispatch } from 'react-redux'
import { fetchCandidates } from '../../slices/canidateSlice/canidateSlice'


const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCandidates())
    }, [dispatch])

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
