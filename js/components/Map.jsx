import React from 'react';

export class Map extends React.Component {

    //Fetching random word
    // componentDidMount() {
    //     fetch(`http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=8&maxLength=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`)
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
                <h2>Tu będzie mapa</h2>
            </div>
        )
    }
}
