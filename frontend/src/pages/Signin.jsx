import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"


export const Signin = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return <div className=" bg-slate-300 h-screen flex justify-center ">
        <div className=" flex flex-col justify-center ">
            <div className=" rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Login"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                
                {/* Username */}
                <InputBox onChange={e => {
                    setUserName(e.target.value);
                }} label={"email"} placeholder={'madhav@gmail.com'} />
                
                {/* Password */}
                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} label={"password"} placeholder={'password'} />

                <div className=" pt-4 ">
                    <Button label={'Signin'} onClick={async () => {
                        const response = await axios.post('https://paytm-e228.onrender.com/api/v1/user/login', {
                            username,
                            password
                        });
                        localStorage.setItem('token', response.data.token);
                    }} />
                </div>
                <BottomWarning label={"Don't have an account?"} to={"/Signup"} buttonText={"Sign Up"} />
            </div>
        </div>
    </div>    
}