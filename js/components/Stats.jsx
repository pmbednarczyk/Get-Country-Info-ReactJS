import React from 'react';
const NumberFormat = require('react-number-format');

export class Stats extends React.Component {

    render() {
        // Show this if data is fetching...
        if (this.props.showStats === false) {
            return null;
        }

        const chosenCountry = this.props.chosenCountry.slice();
        const population = <NumberFormat value={chosenCountry[0].population} displayType={'text'} thousandSeparator={true}/>;
        const area = <NumberFormat value={chosenCountry[0].area} displayType={'text'} thousandSeparator={true}/>;
        return (
            <div className="stats-container">
                <h1 className="stats-container__title">{chosenCountry[0].name}</h1>
                <ul className="stats-container__list">
                    <li className="stats-container__item"
                        key={chosenCountry[0].capital}>
                        Capital city: {chosenCountry[0].capital}
                    </li>
                    <li className="stats-container__item"
                        key={chosenCountry[0].population}>
                        Population: {population} citizens
                    </li>
                    <li className="stats-container__item"
                        key={chosenCountry[0].area}>
                        Area: {area} square kilometers
                    </li>
                    <li className="stats-container__item"
                        key={chosenCountry[0].currencies}>
                        Currency name: {chosenCountry[0].currencies[0].name}
                    </li>
                </ul>
                <img className="stats-container__img"
                     src={chosenCountry[0].flag}
                />
            </div>
        )
    }
}