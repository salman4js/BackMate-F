import React, {useRef, useEffect} from 'react';
import './Pagination.css'

const Pagination = (props) => {

    const options = ['Headers', 'Authorization', 'Params', 'Body'] // Import it from the server later!

    // Height of the element calculation!
    const paginationRef = useRef(null);

    // Constructor!
    useEffect(() => {
        props.pagination(paginationRef.current.offsetHeight);
    }, [])

    // Handle Click!
    const handleClick = (item) => {
        props.catch(item);
    }

    return (
        <div class="pagination" ref = {paginationRef}>
            <div class="pagination-left">
                {
                    options.map((item,key) => {
                        return(
                            <a className = "brew-pagination-title" onClick={() => handleClick(item)}>{item}</a>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Pagination;