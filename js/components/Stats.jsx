import React, { PureComponent } from 'react';
const NumberFormat = require('react-number-format');

export class Stats extends PureComponent {
	render() {
		const { showStats, chosenCountry = {} } = this.props;

		if (!showStats || typeof chosenCountry === 'undefined' || !chosenCountry) {
			return null;
		}

		const { capital, population, area, currencies = [], flag, name } = chosenCountry;
		const renderFormattedValue = value => (
      <NumberFormat value={value} displayType={'text'} thousandSeparator={true} />
    );

		return (
      <div className="stats-container">
          <h1 className="stats-container__title">{name}</h1>
          <ul className="stats-container__list">
              <li className="stats-container__item"
                  key={capital}>
                  Capital city: {capital}
              </li>
              <li className="stats-container__item"
                  key={population}>
                  Population: {renderFormattedValue(population)} citizens
              </li>
              <li className="stats-container__item"
                  key={area}>
                  Area: {renderFormattedValue(area)} square kilometers
              </li>
              <li className="stats-container__item"
                  key={currencies}>
                  Currency name: {currencies[0].name}
              </li>
          </ul>
          <img className="stats-container__img"
               src={flag}
          />
      </div>
		)
	}
}