import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { db, initFirebase } from "../firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { addDoc, collection } from "@firebase/firestore";
import { useState } from "react";
import Head from "next/head";

export default function Login() {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState<string>();
  const router = useRouter();

  enum RoleEnum {
    user = "user",
    admin = "admin",
  }

  interface IFormInput {
    firstName: String;
    Role: RoleEnum;
  }

  const authCollectionRef = collection(db, "role");

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    addDoc(authCollectionRef, data);
    setRole(data.Role);
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    if (data.Role == "user") {
      router.push("/User");
    }
    if (data.Role == "admin") {
      router.push("/listedProducts");
    }
  };

  const handleClick = async () => {
    // const result = await signInWithPopup(auth, provider);
    // console.log(result.user);
  };

  if (loading) {
    return <div> Loading... </div>;
  }

  // if (role == "user") {
  //   router.push("/user");
  // } else {
  //   router.push("/listedProducts");
  // }
  // if(user) {
  //   router.push("/user")
  //   }

  return (
    <>
      <Head>
        <title>NFT project | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border-[#16194F] border-solid border-2 md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-gray">
            <h1 className="text-xl text-[#16194f] font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login in to your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label className="block mb-2 text-sm font-medium pt-10 text-[#16194f] ">
                  Name
                </label>
                <input
                  className="bg-gray-50 border border-[#16194f]  sm:text-sm rounded-lg text-[#16194f] focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Jim Carry"
                  {...register("firstName")}
                />
                <label className="block mb-2 text-sm font-medium pt-10 text-[#16194f]">
                  Login As :
                </label>
                <select
                  className="bg-gray-50 border border-[#16194f]  text-sm rounded-lg  text-[#16194f] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("Role")}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="flex w-full justify-center py-10">
                  <input
                    className="w-full text-white bg-[#16194F] cursor-pointer border-[#16194F] border-solid border hover:drop-shadow-2xl hover:bg-[#CAC7FF] hover:text-[#16194F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                    onClick={handleClick}
                  />
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-black-800"
                  >
                    Create a Google Account
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
