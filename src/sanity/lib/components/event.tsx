import { Card, CardHeader } from '@/components/ui/card';
import GoogleMapReact from 'google-map-react';

type EventType = {
	title: string;
	showMap: boolean;
};

const EventComponent = ({ value }: { value: EventType }) => {
	const { title, showMap } = value;

	const Marker = ({ title }: EventType) => {
		return <div>{title}</div>;
	}

	return (
		<Card className="flex flex-col w-full">
			{showMap && (
				<CardHeader>
					<GoogleMapReact bootstrapURLKeys={{ key: '' }}>
						{/* <Marker
							key={place.id}
							text={place.name}
							lat={place.geometry.location.lat}
							lng={place.geometry.location.lng}
						/> */}
					</GoogleMapReact>
				</CardHeader>
			)}
		</Card>
	);
};

export default EventComponent;
