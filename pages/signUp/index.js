import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth } from "@/Firebase/FireBaseConfig";
import { UserDataContext } from "@/context/useContext";
import { useRouter } from "next/router";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let router = useRouter();

  const { handleSetUserData } = useContext(UserDataContext);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      handleSetUserData(user);
      router.push("/allTasks");
    }
  }, []);

  const signUp = async () => {
    if (email === "" || password === "") {
      alert("please fill all fields");
    }
    try {
      const userFirebaseData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      handleSetUserData(userFirebaseData.user);
      router.push("/allTasks");
    } catch (error) {
      console.log("errrorrr", error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/* <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div> */}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              onClick={signUp}
              type="submit"
              className="w-full hover:bg-green-600"
            >
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-green-600">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default SignUpForm;
