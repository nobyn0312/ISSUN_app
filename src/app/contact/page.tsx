"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import Header from "@/components/Header";
import { ContentsAreaOrange } from "@/components/ContentsArea";
import {SecondaryButton } from "@/components/Button";



const contact: React.FC = () => {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("api/email",){
        method:"POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify({email,name,message})
      }
    }

    await fetch("/api/email", {
      method: "POST",
      body:JSON.stringify({email , name , message}),
    })
  }
	return (
		<>
			<Header />
			<Container>
				これはコンタクト
				<ContentsAreaOrange style={{ paddingBottom: "24px" }}>
					<div>
						<p>これはコンタクト</p>

						<form onSubmit={handleSubmit}>
							<p>名前</p>
							<input
								type='text'
								style={{ width: "100%" }}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<p>メールアドレス</p>
							<input
								type='text'
								style={{ width: "100%" }}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<p>お問い合わせ内容</p>
							<textarea
								style={{ width: "100%" }}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							></textarea>
							<SecondaryButton>送信</SecondaryButton>
						</form>
					</div>
				</ContentsAreaOrange>
			</Container>
		</>
	);
};
export default contact;
