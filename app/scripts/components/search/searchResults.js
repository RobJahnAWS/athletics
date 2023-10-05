import React, {useState, useEffect, useRef} from 'react';
import LoadingBackdrop from '../loadingBackdrop/loadingBackdrop';
import Athletes from '../athletes/Athletes';

const SearchResults = (props) => {
    const [results, setResults] = useState([]);
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
            fetchResults(ref.current.searchTerm);
        }

        ref.current.scrollTop = scrollTop
    };

    useEffect(() => {
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onSearch = (e) => {
        const searchTerm = e?.target?.value;
        ref.current.searchTerm = searchTerm;

        if(searchTerm.length > 2) {
            fetchResults(searchTerm);
        }
    }

    const fetchResults = (searchTerm) => {
        setLoading(true);
        
        fetch(`http://localhost:3035?filter=${searchTerm}&limit=${ref.current.limit}`).then(response=>response.json())
            .then(response=>{
                setResults(response);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false)
        );
    }

    return(
        <div className={(props.showingSearch ? "showing " : "") + "search-container"}>
            <input type="text" onChange={(e) => {
                ref.current.limit = 6;
                onSearch(e);
            }} />
            <a href="#" onClick={(e) => showSearchContainer(e)}>
                <i className="material-icons close">close</i>
            </a>
            <LoadingBackdrop open={loading} />
            {props.showingSearch && results?.length ? <Athletes athletes={results} /> : "No Results"}
        </div>
    )
}

export default SearchResults