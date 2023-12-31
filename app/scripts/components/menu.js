import React, {useState} from 'react';
import Search from './search/search';

const Menu = () => {

    const [showingSearch, setShowingSearch] = useState(false);

    const showSearchContainer = (e) => {
        e.preventDefault();
        setShowingSearch(!showingSearch);
    }

    return (
        <header className="menu">
            <div className="menu-container">
                <div className="menu-holder">
                    <h1>Athletes</h1>
                    <nav>
                        <a href="#" className="nav-item">Basketball</a>
                        <a href="#" className="nav-item">Football</a>
                        <a href="#" className="nav-item">Baseball</a>
                        <a href="#" className="nav-item">Bodybuilding</a>

                        <a href="#" onClick={(e) => showSearchContainer(e)}>
                            <i className="material-icons search">search</i>
                        </a>
                    </nav>
                </div>
            </div>
            <Search 
                showingSearch={showingSearch} 
                showSearchContainer={showSearchContainer} 
                keystrokeDelay={500}
                minimumSearchLength={2}
            />
        </header>
    );
};

export default Menu;