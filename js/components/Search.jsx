import React from 'react';

export class Search extends React.Component {



    render() {
        // Show this if data is fetching...
        if (this.props.allCountries.length <= 1) {
            return <span className="loading">Loading...</span>;
        }

        return (
            <div>
                <h1>Wyszukiwarka</h1>
                Wpisz państwo, o którym chcesz się czegoś dowiedzieć.
                <div>
                    <input type="text"
                           onChange={this.props.handleSearchChange}
                           value={this.props.searchValue}
                           placeholder="Ex: Poland, Germany, France..."
                    />
                    <ul>
                        {this.props.getCountryPropositions()}
                    </ul>
                </div>
            </div>
        )
    }
}
