"use client";

import { MainNavProvider } from "@/packages/ui/layout/main-nav";
import { Sidebar } from "@/packages/ui/sidebar";

type MessageSchema = {
	messages: string[] | string
}

export default function InboxName() {


	return (
		<MainNavProvider sidebar={<Sidebar />}>
			<div className="flex flex-col items-center justify-center w-full h-full p-4">
				<h1 className="text-2xl font-bold">Inbox</h1>
				<p className="text-lg">Welcome to your inbox</p>
				{/* <div className="flex flex-col items-center justify-center w-full h-full p-4">
					{messages?.map((message: MessageSchema) => (
						<div key={message.id} className="p-4 m-2 bg-gray-100 rounded-lg shadow-md">
							<p>{message.messages}</p>
						</div>
					))}
				</div> */}
			</div>
		</MainNavProvider>
	)
}
