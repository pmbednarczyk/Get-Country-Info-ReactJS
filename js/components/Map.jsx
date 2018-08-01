import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';

function createMapOptions() {
	return {
		panControl: false,
		mapTypeControl: false,
		scrollwheel: false,
		styles: [
			{
				stylers: [
					{'saturation': -100},
					{'gamma': 0.8},
					{'lightness': 4},
					{'visibility': 'on'}
				]
			}
		]
	}
}

export class Map extends PureComponent {
	render() {
		const { showStats, chosenCountry = {} } = this.props;

		if (!showStats || !chosenCountry) {
			return null;
		}

		const { latlng = [] } = chosenCountry;
		const defaultCenter = {
			lat: latlng && latlng[0],
			lng: latlng && latlng[1],
		};

		return (
			<div className="map-container">
				<h2 className="map-container__title">See the country on the map:</h2>
				<div className="map-container__map">
					<GoogleMapReact
						key={defaultCenter.lat + defaultCenter.lng}
						defaultCenter={defaultCenter}
						apiKey={`AIzaSyDy3Yu9UF39Vii-T9q3SraPeOwqtYlBhrM`}
						defaultZoom={6}
						options={createMapOptions}
					>
					</GoogleMapReact>
				</div>
			</div>
		)
	}
}
