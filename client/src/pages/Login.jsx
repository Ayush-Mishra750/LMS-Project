//Bwt8Og3TuoiUljYF
//mongodb+srv://ayushmishra270306:Bwt8Og3TuoiUljYF@cluster0.tvqwvux.mongodb.net/
import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { useState } from "react";

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
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  const handleInputButton=(type)=>{
const inputData=type==="signup"?signupInput:loginInput;
console.log(inputData);
  }
  return (
    <div className="m-10 flex justify-center items-center ">
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
                    value={signupInput.value}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="username"
                    required="true"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.value}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="abc@gmail.com"
                    required="true"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.value}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="password"
                    required="true"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={()=>handleInputButton("signup")}>Signup</Button>
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
                    value={loginInput.value}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="abc@gmail.com"
                    required="true"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.value}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="password"
                    required="true"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={()=>handleInputButton("login")}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default Login;
