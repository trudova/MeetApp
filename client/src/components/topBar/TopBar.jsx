import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons"
import {Link} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
export default function TopBar() {
    const {user,dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
     const handleLogout =() =>{
        dispatch({type: "LOGOUT"})
     }
    return (
        <div className="topbarContainer">
           <div className="topbarLeft">
              <Link to="/" className="link">
               <span className="logo">Meet App</span>
               </Link>
           </div>
           <div className="topbarCenter">
               <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input type="text" placeholder="search for friends!!!" className="searchInput" />
               </div>
               </div>
           <div className="topbarRight">
               <div className="topbarLinks">
                   <Link to="/" className="link">
                   <span className="topbarLink" style={{ color: "white" }}>Home </span>
                   </Link>
                   {/* <span className="topbarLink">Timeline</span> */}
                   <span className="topbarLink" onClick={handleLogout}>{user && "Logout"}</span>
               </div>
               <div className="topbarIcons">
                   <div className="topbarIconItem">
                        <Person className="topbarIcomSingle"/>
                        <span className="topbarIconBadge">?</span>
                   </div>
                <Link to="/messenger" className="link" style={{ color: "white" }}> 
                   <div className="topbarIconItem">
                        <Chat className="topbarIcomSingle link"/>
                        <span className="topbarIconBadge">?</span>
                   </div>
                </Link>
                   <div className="topbarIconItem">
                        <Notifications className="topbarIcomSingle"/>
                        <span className="topbarIconBadge">0</span>
                   </div>
               </div>
               <Link to={`/profile/${user.username}`}>
                <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
               </Link>
           </div>
        </div>
    )
}
