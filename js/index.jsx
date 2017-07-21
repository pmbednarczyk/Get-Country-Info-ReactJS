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
                searchValue: '',
                allCountries: [],
                showStats: false,
                showMap: false,
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
                return e.country[0].name.includes(searchValue);
            }).map(function (e) {
                return e.country[0].name
            });

            this.setState({
                searchValue: searchValue,
                potentialCountries: potentialCountries,
            });

            console.log(`Search value: ${searchValue}`);
        };

        // Searching country while typing
        getCountryPropositions = () => {
            if (this.state.searchValue.length >= 3) {
                const countryPropositions = this.state.potentialCountries.map((country, i) => {
                    console.log(`Search value: ${country}`);
                    return <li
                        onClick={event => this.handleCountryClick(country, i)}
                        key={country + i}>
                        {country}
                    </li>;

                });
                return countryPropositions
            }
        };


        // Generating country stats
        handleCountryClick = (country, i) => {
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
                }
            });

            console.log(`Państwo: ${country}, numer: ${i}, wiecej info: ${chosenCountry[0].capital} `);

            this.setState({
                showStats: true,
                chosenCountry: chosenCountry
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
                    />
                    <Stats
                        showStats={this.state.showStats}
                        chosenCountry={this.state.chosenCountry}
                    />
                    <Map
                        showStats={this.state.showStats}
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
