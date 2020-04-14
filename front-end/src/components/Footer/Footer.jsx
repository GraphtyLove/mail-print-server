import React from 'react'

// * ----- Style: ----- *
const styleFooter = {
    marginTop: "auto",
    background: "#fff",
    width: "100%",
    textAlign: "center",
    boxShadow: "0px 0px 9px 1px rgba(0, 0, 0, 0.2)"
}

const Footer = () => {
    return (
        <footer style={styleFooter}>
            <p>
                Print server made with <span role="img" aria-label="heart">❤️</span> by Maxim Berge.
                Code open-source on:
                <a href="https://github.com/GraphtyLove/mail-print-server">Github</a>
            </p>
        </footer>
    )
}

export default Footer