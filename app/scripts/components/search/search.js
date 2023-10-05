import React, {useState, useEffect, useRef} from 'react';
import LoadingBackdrop from '../loadingBackdrop/loadingBackdrop';
import Athletes from '../athletes/Athletes';

const Search = (props) => {
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);
    const [typingTimer, setTypingTimer] = useState(null);
    const ref = useRef({limit: 6, searchTerm: '', searchBlock: false, scrollTop: 0, totalRecordsSize: 0});

    useEffect(() => {
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const search = (searchTerm) => {
        if (typingTimer !== null) {
          clearTimeout(typingTimer);
        }
        setTypingTimer(
            setTimeout(() => {
                fetchResults(searchTerm)
                setTypingTimer(null);
            }, props.keystrokeDelay));
      };
    
    const bottomVisible = () =>
        document.documentElement.clientHeight + window.scrollY >=
        (document.documentElement.scrollHeight ||
            document.documentElement.clientHeight);

    const onType = (e) => {
        const searchTerm = e?.target?.value;
        ref.current.searchTerm = searchTerm;

        if(searchTerm.length > 2) {
            ref.current.limit = 6;
            search(searchTerm);
        }
    }

    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop;

        if(bottomVisible() && 
            !ref.current.searchBlock && 
            ref.current.scrollTop <= scrollTop && 
            ref.current.searchTerm.length > props.minimumSearchLength &&
            ref.current.limit < ref.current.totalRecordsSize
        ) {
            ref.current.searchBlock = true;
            setTimeout(() => ref.current.searchBlock = false, 300);
            ref.current.limit+=2;
            fetchResults(ref.current.searchTerm);
        }

        ref.current.scrollTop = scrollTop
    };

    const fetchResults = (searchTerm) => {
        setLoading(true);
        
        fetch(`http://localhost:3035?filter=${searchTerm}&limit=${ref.current.limit}`).then(response=>response.json())
            .then(response=> {
                setResults(response);
                ref.current.totalRecordsSize = response.size;
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false)
        );
    }

    return(
        <div className={(props.showingSearch ? "showing " : "") + "search-container"}>
            <input type="text" onChange={(e) => onType(e)}/>
            <a href="#" onClick={(e) => props.showSearchContainer(e)}>
                <i className="material-icons close">close</i>
            </a>
            <LoadingBackdrop open={loading} />
            {props.showingSearch && results?.results?.length ? <Athletes athletes={results.results} /> : "No Results"}
        </div>
    )
}

export default Search