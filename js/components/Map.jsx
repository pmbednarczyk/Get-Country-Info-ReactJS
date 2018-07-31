import React from 'react';
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
};

export class Map extends React.Component {
	render() {
		const { showStats, chosenCountry = {} } = this.props;

		if (!showStats || typeof chosenCountry === 'undefined' || !chosenCountry) {
			return null;
		}

		const defaultCenter = {
			lat: chosenCountry.latlng && chosenCountry.latlng[0],
			lng: chosenCountry.latlng && chosenCountry.latlng[1],
		};

		return (
      <div className="map-container">
          <h2 className="map-container__title">See the country on the map:</h2>
          <div className="map-container__map">
              <GoogleMapReact
                key={chosenCountry.latlng[0] + chosenCountry.latlng[1]}
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
