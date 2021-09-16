import { useContext, useRef } from "react";
import "./login.css"
import {loginCall} from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core";
import { Link } from "react-router-dom";
export default function Login() {
 const email = useRef();
 const password = useRef();
 const {user, isFetching, dispatch} = useContext(AuthContext)
    const handleClick = (e)=>{
        e.preventDefault();
        loginCall({email:email.current.value, password:password.current.value}, dispatch )
    }
    console.log(user)
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Meet App</h3>
                    <span className="loginDesc">Find new friends on MeetApp today</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" required ref={email} />
                        <input placeholder="Password" type="password" className="loginInput" required minLength="6" ref={password} />
                        <button className="loginButton" disabled={isFetching}>{isFetching? <CircularProgress color="white"/> : "Login"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register" className="link loginRegisterButton">
                        <button className="loginRegisterButton">{isFetching? <CircularProgress color="white"/> : "Create a new account"}</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
