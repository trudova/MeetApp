import "./home.css"
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightBar/RightBar'
import Sidebar from '../../components/sidebar/Sidebar'
import TopBar from '../../components/topBar/TopBar'
export default function Home() {
    return (
        <>
            <TopBar/>
            <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <RightBar/>
            </div>
        </>
    )
}
