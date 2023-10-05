import React, {useState, useEffect, useRef} from 'react';
import Athletes from './athletes/Athletes';

const Menu = () => {

    const [showingSearch, setShowingSearch] = useState(false);
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(false);
    const ref = useRef({limit: 6, searchTerm: '', searchBlock: false, scrollTop: 0});

    const bottomVisible = () =>
        document.documentElement.clientHeight + window.scrollY >=
        (document.documentElement.scrollHeight ||
            document.documentElement.clientHeight);

    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop;

        if(bottomVisible() && !ref.current.searchBlock && ref.current.scrollTop <= scrollTop && ref.current.searchTerm.length > 2) {
            ref.current.searchBlock = true;
            setTimeout(() => ref.current.searchBlock = false, 300);
            ref.current.limit+=2;
            fetchAthletes(ref.current.searchTerm);
        }

        ref.current.scrollTop = scrollTop
    };

    useEffect(() => {
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const showSearchContainer = (e) => {
        e.preventDefault();
        setShowingSearch(!showingSearch);
    }

    const onSearch = (e) => {
        const searchTerm = e?.target?.value;
        ref.current.searchTerm = searchTerm;
        console.log(searchTerm)
        if(searchTerm.length > 2) {
            fetchAthletes(searchTerm);
        }
    }

    const fetchAthletes = (searchTerm) => {
        setLoading(true);
        
        fetch(`http://localhost:3035?filter=${searchTerm}&limit=${ref.current.limit}`).then(response=>response.json())
            .then(response=>{
                setAthletes(response);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false)
        );
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
            <div className={(showingSearch ? "showing " : "") + "search-container"}>
                <input type="text" onChange={(e) => onSearch(e)} />
                <a href="#" onClick={(e) => showSearchContainer(e)}>
                    <i className="material-icons close">close</i>
                </a>
                {loading && "Athletes Loading..."}
                {showingSearch && athletes?.length ? <Athletes athletes={athletes} /> : "No Results"}
            </div>
        </header>
    );
};

export default Menu;