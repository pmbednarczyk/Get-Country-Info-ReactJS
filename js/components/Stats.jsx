import React from 'react';

export class Stats extends React.Component {

    //Fetching random word
    // componentDidMount() {
    //     fetch(`https://restcountries.eu/rest/v2/name/{name}`)
    //         .then(r => r.json())
    //         .then(data => {
    //             const lettersArray = [...data.word].map((letter) => {
    //                 return {
    //                     value: letter,
    //                     validation: null,
    //                 }
    //             });
    //             this.setState({
    //                 answer: data.word,
    //                 letters: lettersArray,
    //             });
    //         });
    // }

    render() {
        // Show this if data is fetching...
        // if (!this.state.answer) {
        //     return <span className="loading">Loading...</span>;
        // }
        return (
            <div>
                <h2>Tu będą statystyki</h2>
            </div>
        )
    }
}