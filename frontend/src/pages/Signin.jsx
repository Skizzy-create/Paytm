import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"


export const Signin = () => {
    return <div className=" bg-slate-300 h-screen flex justify-center ">
        <div className=" flex flex-col justify-center ">
            <div className=" rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Login"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox label={"email"} placeholder={'madhav@gmail.com'} />
                <InputBox label={"password"} placeholder={'password'} />
                <div className=" pt-4 ">
                    <Button label={'Signin'} />
                </div>
                <BottomWarning label={"Don't have an account?"} to={"/Signup"} buttonText={"Sign Up"} />
            </div>
        </div>
    </div>    
}