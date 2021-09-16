import { Email } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react"
import "./chatonline.css"
export default function Chatonline({onlineUsers,currentId, setCurrentChat}) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(()=>{
        const getFriends= async()=>{
       try {
        const res = await axios.get("/users/friends/"+currentId);
         setFriends(res.data);
       } catch (error) {
           console.log(error)
       }
        }
        getFriends();
    },[currentId]);

      useEffect(()=>{
          setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)));
      },[onlineUsers, friends]);

       const handleClick = async(user)=>{
                    try {
                        let res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
                      if(res.data){
                        setCurrentChat(res.data)
                      }else{
                        try {
                        
                            res = await axios.post("/conversations",{senderId: currentId, receiverId: user._id});
                            setCurrentChat(res.data)
                          
                        } catch (error) {
                            console.log(error);
                        }
                      }
                    } catch (error) {
                        console.log(error)
                    }
                }
    return (
        <div className="chatOnline">
            {friends.map((f)=>{
               
           return <div className="chatOnlineFriend" onClick={()=> handleClick(f)}>
                <div className="chatOnlineImgContainer">
                    <img src={f.profilePicture? PF + f.profilePicture : PF +"/person/noAvatar.png"} alt=""className="chatOnlineImg" />
                    <div className="chatOnlineBadge" ><Email className="chatOnlineEmail"/>?</div>
                </div>
                <div className="chatOnlineName">{f.username}</div>
            </div>
            })}
           
            
        </div>
    )
}
