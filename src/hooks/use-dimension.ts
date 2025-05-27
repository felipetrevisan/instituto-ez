import { useEffect, useRef } from 'react';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const useDimensions = (ref: React.MutableRefObject<any>) => {
	const dimensions = useRef({ width: 0, height: 0 });

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		dimensions.current.width = ref.current.offsetWidth;
		dimensions.current.height = ref.current.offsetHeight;
	}, []);

	return dimensions.current;
};
