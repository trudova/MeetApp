import "./profile.css"
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightBar/RightBar'
import Sidebar from '../../components/sidebar/Sidebar'
import TopBar from '../../components/topBar/TopBar'
import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router"
export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const {username} = useParams();

    useEffect(()=>{
        const fetchUser = async()=>{
               const res= await axios.get(`/users?username=${username}`);
              setUser(res.data);
        };
        fetchUser();
    }, [username]);
    return (
         <>
            <TopBar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                        <img src={user.coverPicture? PF + user.coverPicture : PF +"person/noCover.jpeg"}alt="" className="profileCoverImg"/>
                        <img src={ user.profilePicture ? PF + user.profilePicture : PF + "/person/noAvatar.png"} alt="" className="profileUserImg" />
                        </div>

                        <div className="profileInfo">
                            <h4 className="profileInfoName"> {user.username}</h4>
                            <p className="profileInfoDesc">{user.desc}</p>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                     <Feed username={username}/>
                     <RightBar user={user}/>
                    </div>
                   
                </div>
               
            </div>
        </>
    )
}
