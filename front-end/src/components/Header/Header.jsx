import React from 'react'
// * ----- Components ----- *
import SECRET from '../secret/secret'

const Header = () => {
    // Style
    const redImportant = {
        color: "red"
    }

    return (
        <header className="container">
            <h1 style={{ textAlign: "center" }}>Print server - Daniele's Home</h1>
            <article className="description">
                <p>
                    Bienvenue dans le serveur d'impression Daniele's home.
                    Vous pouvez télécharger les fichiers joins envoyé sur
                    l'adresse mail:
                <b style={redImportant}>
                        {
                            SECRET.mail
                                ? SECRET.mail
                                : "Pas d'adresse mail définie dans la variable d'environnement $MAIL_ADDRESS"
                        }
                    </b>.
            </p>
                <p>
                    Vous pouvez également imprimer et supprimer les piéces jointes dans la
                    liste suivante:
            </p>
            </article>

        </header >
    )
}

export default Header