"use client";
import { RefObject, useEffect, useState } from "react";

export function useResizeObserver(
	elementRef: RefObject<Element>,
): ResizeObserverEntry | undefined {
	const [record, setRecord] = useState<ResizeObserverEntry | undefined>(
		undefined,
	);

	function handleResize([entries]: ResizeObserverEntry[]): void {
		setRecord(entries);
	}

	useEffect(() => {
		const node = elementRef?.current;
		if (!node) return;

		const observer = new ResizeObserver(handleResize);
		observer.observe(node);

		return () => observer.disconnect();
	}, [elementRef]);

	return record;
}
