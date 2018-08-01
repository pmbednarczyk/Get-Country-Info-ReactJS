import React from 'react';
import ReactDOM from 'react-dom';
import {Search} from './components/Search.jsx';
import {Stats} from './components/Stats.jsx';
import {Map} from './components/Map.jsx';

document.addEventListener('DOMContentLoaded', () => {
	class App extends React.Component {
		constructor() {
			super(...arguments);
			this.state = {
				potentialCountries: [],
				showPotentialCountries: false,
				searchValue: '',
				allCountries: [],
				showStats: false,
				chosenCountry: null,
				loaded: false,
			};
		}

		componentDidMount() {
			fetch(`https://restcountries.eu/rest/v2/all`)
			.then(r => r.json())
			.then(data => {
				const allCountries = data.map(e => (
					{
						country: {
							name: e.name,
							capital: e.capital,
							population: e.population,
							area: e.area,
							currencies: e.currencies,
							flag: e.flag,
							latlng: e.latlng,
						}
					}));
				this.setState({
					allCountries,
					loaded: true,
				});
			});
		}

		// Searching country while typing
		handleSearchChange = event => {
			const searchValue = event.target.value;

			if (searchValue.length < 2) {
				return this.setState({
					searchValue
				})
			}

			const allCountries = [...this.state.allCountries];
			const checkIfCountryMatch = name => name.toLowerCase().includes(searchValue.toLowerCase());
			const potentialCountries = allCountries.filter(e => (
				checkIfCountryMatch(e.country.name)
			)).map(e => e.country.name);

			this.setState({
				searchValue,
				potentialCountries,
				showPotentialCountries: true,
			});
		};

		// Searching country while typing
		getCountryPropositions = () => {
			const { searchValue, potentialCountries } = this.state;

			if (searchValue.length <= 2) {
				return null;
			}

			if (potentialCountries.length) {
				return this.state.potentialCountries.map((country, i) => (
						<li
							className="input-container__list-item"
							onClick={event => this.handleCountryClick(country, i)}
							key={country + i}
						>
							{country}
						</li>
					)
				);
			}

			return (
				<li className="input-container__list-item input-container__list-item--not-found">
					Cannot find such country. Try another name! ;)
				</li>
			);
		};

		// Generating country stats
		handleCountryClick = country => {
			const allCountries = this.state.allCountries.slice();
			const chosenCountry = allCountries.find(e => (
				 e.country.name.includes(country)
			));

			this.setState({
				showStats: true,
				chosenCountry: chosenCountry.country,
				showPotentialCountries: false,
			});
		};

		render() {
			return (
				<div className="container">
					<Search
						handleSearchChange={this.handleSearchChange}
						getCountryPropositions={this.getCountryPropositions}
						handleCountryClick={this.handleCountryClick}
						allCountries={this.state.allCountries}
						searchValue={this.state.searchValue}
						showPotentialCountries={this.state.showPotentialCountries}
					/>
					<Stats
						showStats={this.state.showStats}
						chosenCountry={this.state.chosenCountry}
					/>
					<Map
						showStats={this.state.showStats}
						chosenCountry={this.state.chosenCountry}
					/>
				</div>
			)
		}
	}

	ReactDOM.render(
		<App/>,
		document.querySelector('#app')
	);
});
