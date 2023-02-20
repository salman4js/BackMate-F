import React, { useState, useEffect, useRef } from 'react'

const HeaderBtn = (props) => {

    // Calculate the height of the footer!
    const footerRef = useRef(null);

    // Send the footer button height back to the parent container!
    useEffect(() => {
        props.footerHeight(footerRef.current.offsetHeight);
    }, [])

    return (
        <div className="footer brew-footer" ref={footerRef}>
            <div className="title-footer-span footer-icon">
                <span className="icon-back" onClick={() => props.handleAction()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </span>
            </div>
        </div>
    )
}

export default HeaderBtn;