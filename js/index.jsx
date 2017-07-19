import React from 'react';
import ReactDOM from 'react-dom';
import {Search} from './components/Search.jsx';
import {Stats} from './components/Stats.jsx';
import {Map} from './components/Map.jsx';

document.addEventListener('DOMContentLoaded', () => {
    class App extends React.Component {

        render() {


            return (
                <div className="container">
                    <Search/>
                    <Stats/>
                    <Map/>
                </div>
            )
        }
    }

    ReactDOM.render(
        <App/>,
        document.querySelector('#app')
    );
});
