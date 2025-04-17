"use client";

import { createContext } from "react";

export const KeyboardSgortcutContext = createContext<{
	listeners: KeyboardEvent[];
	setListeners: (listeners: KeyboardEvent[]) => void;
}>({
	listeners: [],
	setListeners: () => {},
});
