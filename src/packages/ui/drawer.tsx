"use client";

import { ReactNode } from "react";
import { Drawer } from "vaul";

export default function VaulDrawer({
	trigger,
	children,
}: { trigger: string; children: ReactNode }) {
	return (
		<Drawer.Root>
			<Drawer.Trigger>{trigger}</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40" />
				<Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none">
					<div className="p-4 bg-white">{children}</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
