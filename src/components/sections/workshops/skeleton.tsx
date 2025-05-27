import { Skeleton as BaseSkeleton } from '@/components/ui/skeleton';

export function Skeleton() {
	return (
		<>
			<BaseSkeleton className="w-80 h-96" />
			<BaseSkeleton className="w-80 h-96" />
			<BaseSkeleton className="w-80 h-96" />
		</>
	);
}
