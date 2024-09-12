"use client";  // クライアントコンポーネントとして明示

import SigninButton from "@/components/SigninButton";
import { auth } from "../firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import UserInfo from "@/components/UserInfo";
import SignOutButton from "@/components/SignoutButton";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {
	const [user] = useAuthState(auth);
  const router =useRouter();

  useEffect(()=>{
    if(user){
      router.push("/top");
    }
  },[user,router])

	return (
		<>
			<main style={{padding:"24px"}}>
				<section>
          <div>
          <h1 className="">
            <Image src="/images/topLogo.webp" width={480} height={480} alt="BOXロゴ"/>
          </h1>
          </div>
					<div>
						{user ? (
							<>
								<UserInfo />
								<SignOutButton />
							</>
						) : (

							<SigninButton />
						)}
					</div>
				</section>
			</main>
		</>
	);
}
