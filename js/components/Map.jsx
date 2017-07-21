import React from 'react';
import GoogleMapReact from 'google-map-react';


export class Map extends React.Component {

    render() {
        // Show this if data is fetching...
        if (this.props.showStats === false) {
            return null;
        }
        return (
            <div style={{width: '100%', height: '100vh'}}>
                <GoogleMapReact
                    defaultCenter={{
                        lat: this.props.chosenCountry[0].latlng[0],
                        lng: this.props.chosenCountry[0].latlng[1],
                    }}
                    defaultZoom={6}
                >
                </GoogleMapReact>
            </div>
        )
    }
}
