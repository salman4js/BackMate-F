import React from 'react';
import './Pagination.css'

const Pagination = () => {

    const options = ['Headers', 'Authorization', 'Params', 'Body'] // Import it from the server later!

    // Handle Click!
    const handleClick = (item) => {
        console.log(item);
    }

    return (
        <div class="pagination">
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