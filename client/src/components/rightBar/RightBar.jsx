import "./rightBar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    false
  );

   useEffect(() => {
    setFollowed( currentUser.followings.includes(user?._id))
   },[currentUser, user])


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + currentUser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

    const HomeRightbar = ()=>{
        // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
       
        return (
            <>
             <div className="birthdayContainer">
                    <img src="/assets/gift.png" alt="" className="birthdayImg"/>
                    <span className="birthdayText"> Vika and 2 other friends having a birthday today</span>
                </div>
                <img src="/assets/post/2.jpeg" className="rightbarAd" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                   {friends.map((u)=> (
                       <Online key={u.id} user={u}/>
                   ))}
                </ul>
            </>
        )
    }
    const ProfileRightBar =()=>{
      
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed? "Unfollow": "Follow" }
                    {followed? <Remove/>: <Add/> }
                </button>
            )}
            <h4 className="rightbarTitle">User Information </h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City: </span>
                    <span className="rightbarInfoValue">{user.city} </span>
                </div>
                 <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From: </span>
                    <span className="rightbarInfoValue">{user.from} </span>
                </div>
                 <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship: </span>
                    <span className="rightbarInfoValue">{user.relationship ===1?"Single":user.relationship===2? "Married": "-" } </span>
                </div>
            </div>
             <h4 className="rightbarTitle">User friends </h4>
             <div className="rightbarFollowings">
                 {friends.map(friend =>(
                     <Link className="link" to={"/profile/"+friend.username}>
                      <div className="rightbarFollowing">
                     <img src={ friend.profilePicture ? PF + friend.profilePicture : PF + "/person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                     <span className="followingName">{friend.username}</span>
                 </div>
                 </Link>

                 ))}
                
             </div>
            </>
        );
    }
    return (
        <div className="rightBar">
            <div className="rightbarWrapper">
              {user? <ProfileRightBar/> : <HomeRightbar/>}
            </div>
        </div>
    )
}
