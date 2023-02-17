import React, { useEffect, useRef } from 'react'

const HeaderBtn = (props) => {

    // Calculate the height of the footer!
    const footerRef = useRef(null);

    // Send the footer button height back to the parent container!
    useEffect(() => {
        //props.footerElem(footerRef.current.offsetHeight);
    }, [])

    return (
        <div className="footer brew-footer" ref={footerRef}>
            <span className="title-footer-span" onClick={() => props.handleAction()}>
                {props.workName}
            </span>
        </div>
    )
}

export default HeaderBtn;