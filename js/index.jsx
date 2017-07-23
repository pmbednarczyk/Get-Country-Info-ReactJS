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

            };
        }

        componentDidMount() {
            fetch(`https://restcountries.eu/rest/v2/all`)
                .then(r => r.json())
                .then(data => {
                    const allCountries = data.map((e) => {
                        return {
                            country: [
                                {
                                    name: e.name,
                                    capital: e.capital,
                                    population: e.population,
                                    area: e.area,
                                    currencies: e.currencies,
                                    flag: e.flag,
                                    latlng: e.latlng,
                                }
                            ]
                        }
                    });
                    this.setState({
                        allCountries: allCountries
                    });
                });
        }


        // Searching country while typing
        handleSearchChange = event => {
            const searchValue = event.target.value;
            const allCountries = this.state.allCountries.slice();

            const potentialCountries = allCountries.filter((e) => {
                return e.country[0].name.toLowerCase().includes(searchValue.toLowerCase());
            }).map(function (e) {
                return e.country[0].name
            });

            this.setState({
                searchValue: searchValue,
                potentialCountries: potentialCountries,
                showPotentialCountries: true,
            });
        };

        // Searching country while typing
        getCountryPropositions = () => {
            if (this.state.searchValue.length >= 3 && this.state.potentialCountries.length > 0) {
                const countryPropositions = this.state.potentialCountries.map((country, i, array) => {
                    return <li
                        className="input-container__list-item"
                        onClick={event => this.handleCountryClick(country, i)}
                        key={country + i}>
                        {country}
                    </li>;
                });
                return countryPropositions
            } else if (this.state.searchValue.length >= 3 && this.state.potentialCountries.length < 1) {
                console.log("Nie ma takiego kraju.");
                const noCountry = (
                    <li
                        className="input-container__list-item input-container__list-item--not-found">
                        Cannot find such country. Try another name! ;)
                    </li>
                );
                return noCountry
            }
        };

        // Generating country stats
        handleCountryClick = (country) => {
            const allCountries = this.state.allCountries.slice();

            const chosenCountry = allCountries.filter((e) => {
                return e.country[0].name.includes(country);
            }).map(function (e) {
                return {
                    name: e.country[0].name,
                    capital: e.country[0].capital,
                    population: e.country[0].population,
                    area: e.country[0].area,
                    currencies: e.country[0].currencies,
                    flag: e.country[0].flag,
                    latlng: e.country[0].latlng,
                }
            });

            this.setState({
                showStats: true,
                chosenCountry: chosenCountry,
                showPotentialCountries: false,
            });

        };

        render() {
            return (
                <div className="container">
                    <Search
                        handleSearchChange={event => this.handleSearchChange(event)}
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
