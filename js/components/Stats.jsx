import React from 'react';

export class Stats extends React.Component {


    render() {
        // Show this if data is fetching...
        if (this.props.showStats === false) {
            return null;
        }

        const chosenCountry = this.props.chosenCountry.slice();
        return (
            <div>
                <h2>Tu będą statystyki</h2>
                <ul>
                <li key={chosenCountry[0].name}>Nazwa pańswa: {chosenCountry[0].name}</li>
                <li key={chosenCountry[0].capital}>Nazwa stolicy: {chosenCountry[0].capital}</li>
                <li key={chosenCountry[0].population}>Populacja: {chosenCountry[0].population}</li>
                <li key={chosenCountry[0].area}>Powierzchnia: {chosenCountry[0].area}</li>
                <li key={chosenCountry[0].currencies}>Waluta: {chosenCountry[0].currencies[0].name}</li>
                </ul>
            </div>
        )
    }
}