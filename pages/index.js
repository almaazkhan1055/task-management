import Link from "next/link";

const Home = () => {
  return (
    <div>
      {/* <LoginForm /> */}
      <h1>Welcome to Task-Management App!</h1>
      <Link href="/login">Login</Link>
      <Link href="/signUp">Sign Up</Link>
    </div>
  );
};

export default Home;
