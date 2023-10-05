import React from 'react';
import { createRoot } from 'react-dom/client';

import Menu from './components/menu';
import Home from './components/home';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Menu />
                <Home />
            </div>
        );
    }

}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
