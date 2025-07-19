//Bwt8Og3TuoiUljYF
//mongodb+srv://ayushmishra270306:Bwt8Og3TuoiUljYF@cluster0.tvqwvux.mongodb.net/
import {  Loader2 } from "lucide-react";
import {useRegisterUserMutation} from "../features/api/authApi.js"
import {useLoginUserMutation} from "../features/api/authApi.js"



import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [registerUser,{
    data:registerData,
    error:registerError,
    isLoading:registerIsLoading,
    isSuccess:registerIsSuccess,
  }]=useRegisterUserMutation();

  const [loginUser,{
    data:loginData,
    error:loginError,
    isLoading:loginIsLoading,
    isSuccess:loginIsSuccess}]=useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  const handleInputButton=async(type)=>{
const inputData=type==="signup"?signupInput:loginInput;
const action =type==="signup"?registerUser:loginUser;
await action(inputData);
  };


useEffect(() => {
  if (registerIsSuccess && registerData) {
    console.log("REGISTER SUCCESS");
    toast.success(registerData?.name || "SignUp Successfully");
   setSignupInput({ name: "", email: "", password: "" });
  }

  if (registerError) {
    console.log("REGISTER ERROR");
    const errMsg = registerError?.data?.message || "SignUp Failed";
    toast.error(errMsg);
  }

  if (loginIsSuccess && loginData) {
    console.log("LOGIN SUCCESS");
    toast.success(loginData?.message || "Login Successfully");
  setLoginInput({ email: " ", password: "" }); 
  }

  if (loginError) {
    console.log("LOGIN ERROR");
    const errMsg = loginError?.data?.message || "Login Failed";
    toast.error(errMsg);
  }
}, [registerIsSuccess, registerError, registerData, loginIsSuccess, loginError, loginData]);


  return (
    <div className="m-20 flex justify-center items-center ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="signup">
          <TabsList className="flex justify-center items-center pl-5">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="username"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="abc@gmail.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="password"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button  disabled={registerIsLoading}onClick={()=>handleInputButton("signup")}>
                  {
                    registerIsLoading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>please wait
                    </>
                    ):"Signup"
                  }
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login your password here.After signup you'll logged in.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.name}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="abc@gmail.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="password"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={loginIsLoading} onClick={()=>handleInputButton("login")}>
                  {
                    loginIsLoading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>please wait
                    </>
                    ):"Login"
                  }
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default Login;
