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
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/Firebase/FireBaseConfig";
import { UserDataContext } from "@/context/useContext";

function LoginForm({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const { userData, handleSetUserData } = useContext(UserDataContext);
  // console.log("userData", userData);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      // console.log("locla storeag eget");
      handleSetUserData(JSON.parse(localStorage.getItem("userData")));

      router.push("/allTasks");
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();

    console.log("loginnn");
    try {
      const userFirebaseData = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("USER", userFirebaseData.user);
      handleSetUserData(userFirebaseData.user);
      // setEmail("");
      // setPassword("");

      if (userFirebaseData?.user) {
        console.log("go to all task");
        router.push("/allTasks");
      }
    } catch (error) {
      console.log(error);
      setError("!!check your email or password");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const emailValue = document.getElementById("email").value;
  //   const passwordValue = document.getElementById("password").value;

  //   const loginUser = {
  //     email: emailValue,
  //     password: passwordValue,
  //   };

  //   // localStorage.setItem("loginUser", JSON.stringify(loginUser));

  //   router.push("/allTasks");
  // };

  return (
    <div className="flex items-center h-screen justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="grid gap-4">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <Button
                type="submit"
                className="w-full hover:bg-green-600"
                onClick={login}
              >
                Login
              </Button>
              {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link href="/signUp" className="underline hover:text-green-800">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
