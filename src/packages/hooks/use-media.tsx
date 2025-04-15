"use client";

import { useEffect, useState } from "react";

const MEDIA_BREAKPOINT = 769;

export function useMediaQuery() {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	function onChange() {
		setIsMobile(window.innerWidth < MEDIA_BREAKPOINT);
	}

	const mql = window.matchMedia(`(max-width: ${MEDIA_BREAKPOINT - 1}px)`);
	mql.addEventListener("resize", onChange);

	useEffect(() => {
		return () => window.removeEventListener("resize", onChange);
	}, []);

	return { isMobile };
}
