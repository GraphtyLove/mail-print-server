import React from 'react'

// * ----- Style: ----- *
const styleFooter = {
    marginTop: "auto",
    background: "#fff",
    width: "100vw",
    textAlign: "center"
}

const Footer = () => {
    return (
        <footer style={styleFooter}>
            <p>
                Print server made with ❤️ by Maxim Berge.
                Code open-source on:
                <a href="https://github.com/GraphtyLove/mail-print-server">Github</a>
            </p>
        </footer>
    )
}

export default Footer