import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios';

export const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
        return <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Signup"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    
                    {/* First Name */}
                    <InputBox onChange={e => {
                        setFirstName(e.target.value);
                    }} label={'First Name'} placeholder={'Madhav'} />

                    {/* Last Name */}
                    <InputBox onChange={e => {
                        setLastName(e.target.value);
                    }} label={'Last Name'} placeholder={'parth-sarthi'} />

                    {/* Email */}
                    <InputBox onChange={e => {
                        setUserName(e.target.value);
                    }} label={'Email'} placeholder={'example@gmail.com'} />

                    {/* password */}
                    <InputBox onChange={e => {
                        setPassword(e.target.value);
                    }} label={'Password'} placeholder={'123456'}  />
                    
                    <div className=" pt-4 ">
                        <Button onClick={async () => {
                            const response = await axios.post('https://paytm-e228.onrender.com/api/v1/user/signup', {
                                username,
                                firstName,
                                lastName,
                                password
                            });
                            localStorage.setItem('token', response.data.token);
                        }} label={'SignUp'} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
                </div>
            </div>
        </div>
}

