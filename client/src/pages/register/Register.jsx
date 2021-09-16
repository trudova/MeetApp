import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";
import "./register.css"
import { Link } from "react-router-dom";
export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

       const handleClick = async(e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords do not mutch!")
        }else{
            const user ={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
               await axios.post("/auth/register", user);
                history.push("/login")
            } catch (error) {
                console.log(error)
            }   
        }
       }

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Meet App</h3>
                    <span className="registerDesc">Find new friends on MeetApp today</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input placeholder="Username" type="text" className="registerInput" required ref={username}/>
                        <input placeholder="Email" required type="email" className="registerInput" ref={email}/>
                        <input placeholder="Password" required type="password" className="registerInput" minLength="6" ref={password}/>
                        <input placeholder="Repeat password" type="password" minLength="6" className="registerInput" required ref={passwordAgain} />
                        <button className="registerButton" type="submit">Register</button>
                        <span className="haveAccount">Already registered? </span>
                        <Link to="/login" className="registerLoginButton link" >
                        <button className="registerLoginButton">Log into account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
