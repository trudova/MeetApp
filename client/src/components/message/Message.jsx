import "./message.css"
import {format} from "timeago.js"
export default function Message({message, own}) {
    return (
        <div className={ own ? "message own": "message"}>
            <div className="messageTop">
                <img src="https://images.unsplash.com/photo-1512626120412-faf41adb4874?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoYXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" alt=""  className="messageImg"/>
                <p className="messageText"> {message.text}</p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    )
}
