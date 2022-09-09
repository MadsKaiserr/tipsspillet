import * as React from 'react';
import { useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from './layout/header';
 
function Priser () {

    const handlePremium = async e => {
        document.getElementById("main-modal").classList.add("display-flex")
    }

    return (
        <>
            <Head>
                <title>Priser - Abonnement - Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/priser" />
                <meta name="description" content="Premium: 79kr - Opret egne gruppespil, deltag i præmiedyster, få udvidet statistikker, gratis betting tips og meget mere. Eller køb adgangsbillet til præmiedyster for 9 kr. - Eller gruppespilsbillet, som giver adgang til at oprette eget gruppespil til 37 kr." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet priser, tipsspillet abonnement, abonnement, priser, betting abonnement, odds abonnement" />
                <meta itemProp="name" content="Tipsspillet Priser og Abonnement" />
                <meta itemProp="description" content="Premium: 79kr - Opret egne gruppespil, deltag i præmiedyster, få udvidet statistikker, gratis betting tips og meget mere. Eller køb adgangsbillet til præmiedyster for 9 kr. - Eller gruppespilsbillet, som giver adgang til at oprette eget gruppespil til 37 kr." />
                <meta property="og:title" content="Priser - Abonnement - Tipsspillet" />
                <meta property="og:description" content="Premium: 79kr - Opret egne gruppespil, deltag i præmiedyster, få udvidet statistikker, gratis betting tips og meget mere. Eller køb adgangsbillet til præmiedyster for 9 kr. - Eller gruppespilsbillet, som giver adgang til at oprette eget gruppespil til 37 kr." />
            </Head>
            <Header />
            <div className="main-modal" id="main-modal">
                <div className="modal-box">
                    <p className="main-modal-h1">Abonnement ikke tilgængeligt</p>
                    <p className="main-modal-h2">Abonnement er på nuværende tidspunkt ikke tilgængeligt for køb. Prøv igen senere...</p>
                    <div className="modal-touch">
                        <button className="nav-btn-default" onClick={() => {document.getElementById("main-modal").classList.remove("display-flex")}}>Tilbage</button>
                    </div>
                </div>
            </div>
            <div className="pages-top" style={{paddingBottom: "150px"}}>
                <div className="pages-where">
                    <h3 className="pages-where-h1">Priser</h3>
                    <div className="pages-where-splitter"></div>
                    <p className="pages-where-h2">Abonnement</p>
                </div>
                <h1 className="pages-h1">Køb abonnement eller<br />adgangsbilletter.</h1>
                <h2 className="pages-p">Ingen binding - Betaling pr. sæson uden ekstra betalinger.<br />Start ud med gratis konto. Hurtig, nem opgradering.</h2>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="pages-parent"><path className="pages-wave" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,133.3C672,139,768,149,864,181.3C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <div className="priser-container">
                <div className="section-price">
                    <div className="plans-container">
                        <div className="plans-con">
                            <div className="plan-element standard">
                                <div className="plan-element-top">
                                    <h5 className="plan-element-identifier">Basic</h5>
                                    <h4 className="plan-element-pris">GRATIS</h4>
                                    <p className="plan-element-binding">For evigt</p>
                                </div>
                                <div className="plan-element-divider"></div>
                                <div className="plan-element-perks">
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i 2 spil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i venners gruppespil</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Opret gruppespil i alle ligaer</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i præmieturneringer</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Gratis betting tips</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Udvidet statistikker</p>
                                    </div>
                                </div>
                                <Link href="/signup">
                                    <button className="square-btn-outline plan-btn">Opret Gratis Konto</button>
                                </Link>
                            </div>
                            <div className="plan-element standard">
                                <div className="plan-element-top">
                                    <h5 className="plan-element-identifier">Premium</h5>
                                    <h4 className="plan-element-pris">79 kr.</h4>
                                    <p className="plan-element-binding">Per sæson</p>
                                </div>
                                <div className="plan-element-divider"></div>
                                <div className="plan-element-perks">
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i uendelige spil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i venners gruppespil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Opret gruppespil i alle ligaer</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i præmieturneringer</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Gratis betting tips</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Udvidet statistikker</p>
                                    </div>
                                </div>
                                <button className="square-btn-default plan-btn" onClick={handlePremium}>Køb abonnement</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="priser-black-section">
                    <div className="forside-text">
                        <div className="forside-black-top">
                            <div className="forside-black-divider"></div>
                            <p className="forside-black-h3">Engangsbilletter<div className="stage-live-pulse"></div></p>
                        </div>
                        <p className="forside-black-h1" style={{minWidth: "600px"}}>Er et abonnement ikke<br />- noget for dig?</p>
                        <p className="forside-black-p">Engangsbetaling - Ingen binding, nemt, hurtigt og billigt.</p>
                        <Link href="/priser" id="pbs-btn" className="nav-btn-default"><p className="nav-btn-default" style={{margin: "20px 0px", textAlign: "center", maxWidth: "120px", justifyContent: "center"}}>Se priser</p></Link>
                    </div>
                    <div className="plans-container">
                        <div className="plans-con">
                            <div className="billet-element">
                                <div className="plan-element-top">
                                    <h4 className="plan-element-pris">Præmiedyst</h4>
                                    <h5 className="plan-element-desc">Få adgang til en valgfri præmieturnering, og vind præmier af værdi på op til 5.000 kr.</h5>
                                </div>
                                <div className="billet-pris-con">
                                    <p className="billet-element-pris">kr 9</p>
                                    <p className="billet-element-per">/DYST</p>
                                </div>
                                <p className="billet-desc">*Inkl. alt</p>
                                <button className="nav-btn-default" style={{marginLeft: "0px", width: "100%", justifyContent: "center"}} onClick={handlePremium}>Køb adgang</button>
                            </div>
                            <div className="billet-element">
                                <div className="plan-element-top">
                                    <h4 className="plan-element-pris">Gruppespil</h4>
                                    <h5 className="plan-element-desc">Opret dit eget private eller offentlige gruppespil, og dyst mod venner eller familie.</h5>
                                </div>
                                <div className="billet-pris-con">
                                    <p className="billet-element-pris">kr 34</p>
                                    <p className="billet-element-per">/DYST</p>
                                </div>
                                <p className="billet-desc">*Inkl. alt</p>
                                <button className="nav-btn-default" style={{marginLeft: "0px", width: "100%", justifyContent: "center"}} onClick={handlePremium}>Køb adgang</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Priser;