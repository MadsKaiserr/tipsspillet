import * as React from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from './layout/header';
import Spacer from './components/spacer';
 
function Abonnement () {
    return (
        <>
            <Head>
                <title>Abonnement - Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/abonnement" />
                <meta name="description" content="Læs om vores abonnement service på Tipsspillet, og udforsk de mange fordele ved at abonnere." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet abonnement,abonnement,tipsspillet membership,membership,tipsspillet køb,køb abonnement tipsspillet" />
                <meta itemProp="name" content="Tipsspillet Abonnement" />
                <meta itemProp="description" content="Læs om vores abonnement service på Tipsspillet, og udforsk de mange fordele ved at abonnere." />
                <meta property="og:title" content="Abonnement - Tipsspillet" />
                <meta property="og:url" content="https://www.tipsspillet.dk/abonnement" />
                <meta property="og:description" content="Læs om vores abonnement service på Tipsspillet, og udforsk de mange fordele ved at abonnere." />
            </Head>
            <Header />
            <Spacer />
            <div className="law-main-container">
                <div className="betingelser-container">
                    <h1 className="betingelser-h1">Tipsspillet Abonnement</h1>
                    <p className="betingelser-h2">Sidst opdateret 12. nov, 2022</p>
                    <p className="betingelser-p">Velkommen til Tipsspillet Abonnement</p>
                    <h2 className="betingelser-p">Følgende vilkår og rettigheder er gældende i forbindelse med anvendelsen af internetsiden. Ved at gå ind på denne internetside anerkender og tiltræder du følgende vilkår og rettigheder. Såfremt du ikke kan acceptere disse vilkår og rettigheder, skal du ikke benytte denne internetside</h2>
                    <div className="betingelser-section">
                        <h2 className="betingelser-h3">Sektion A - Om Abonnement</h2>
                        <div className="betingelser-element">
                            <h3 className="betingelser-h4">1 - Hvad kan du forvente?</h3>
                            <p className="betingelser-p">...</p>
                        </div>
                        <div className="betingelser-element">
                            <h3 className="betingelser-h4">2 - Hvordan kan jeg betale?</h3>
                            <p className="betingelser-p">...</p>
                        </div>
                    </div>
                    <div className="betingelser-section">
                        <h2 className="betingelser-h3">Sektion B - Juridisk</h2>
                        <div className="betingelser-element">
                            <h3 className="betingelser-h4">1 - 1?</h3>
                            <p className="betingelser-p">...</p>
                        </div>
                        <div className="betingelser-element">
                            <h3 className="betingelser-h4">2 - 2?</h3>
                            <p className="betingelser-p">...</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Abonnement;