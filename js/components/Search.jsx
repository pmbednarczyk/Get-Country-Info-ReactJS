import React from 'react';

export class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            potentialCountries: [],
            searchValue: '',
            allCountries: []
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
                                currencies: [
                                    {
                                        code: e.currencies[0],
                                        name: e.currencies[1],
                                    }
                                ],
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

        // const potentialCountries = allCountries.map((e) => {
        //     if (e.country[0].name.includes(searchValue) && searchValue.length >= 3) {
        //         return e.country[0].name;
        //     }
        // });


        const potentialCountries = allCountries.filter((e) => {
            return e.country[0].name.includes(searchValue);
        }).map(function( e ) {
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
                    onClick={this.handleCountryClick}
                    key={country + i}>
                    {country}
                </li>;

            });
            return countryPropositions
        }
    };


    // Generating country stats
    handleCountryClick = () => {
        console.log(`Test`);
    };


    render() {
        // Show this if data is fetching...
        if (this.state.allCountries.length <= 1) {
            return <span className="loading">Loading...</span>;
        }

        return (
            <div>
                <h1>Wyszukiwarka</h1>
                Wpisz państwo, o którym chcesz się czegoś dowiedzieć.
                <div>
                    <input type="text"
                           onChange={this.handleSearchChange}
                           value={this.state.searchValue}
                           placeholder="Ex: Poland, Germany, France..."
                    />
                    <ul>
                        {this.getCountryPropositions()}
                    </ul>
                </div>
            </div>
        )
    }
}
