import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import axios from "axios";
import PriserComp from '../components/priser';
 
function Priser () {

    useEffect(() => {
        if (document.getElementById("loader1")) {
            document.getElementById("loader1").classList.add("display-not");
        }
        if (document.getElementById("loader2")) {
            document.getElementById("loader2").classList.add("display-not");
        }
    }, [])

    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [plusPrice, setPlusPrice] = useState(29);
    const [premiumPrice, setPremiumPrice] = useState(39);

    const handlePlus = async e => {
        if (localStorage.getItem("auth")) {
            if (plusPrice === 39) {
                setLoading1(true);
                const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/payment";
        
                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
        
                const requestBody = {
                    "items": [
                        { 
                            "id": 4, 
                            "quantity": 1
                        }
                    ]
                }
        
                axios.post(URL, requestBody, requestConfig).then(response => {
                    console.log(response);
                    window.open(response.data.url, "_SELF");
                }).catch(error => {
                    console.log("Fejl ved indhentning af data" + error)
                })
            } else if (plusPrice === 29) {
                setLoading1(true);
                const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/payment";
    
                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
    
                const requestBody = {
                    "items": [
                        { 
                            "id": 5, 
                            "quantity": 1
                        }
                    ]
                }
    
                axios.post(URL, requestBody, requestConfig).then(response => {
                    console.log(response);
                    window.open(response.data.url, "_SELF");
                }).catch(error => {
                    console.log("Fejl ved indhentning af data" + error)
                })
            } else if (plusPrice === 19) {
                setLoading1(true);
                const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/payment";
    
                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
    
                const requestBody = {
                    "items": [
                        { 
                            "id": 6, 
                            "quantity": 1
                        }
                    ]
                }
    
                axios.post(URL, requestBody, requestConfig).then(response => {
                    console.log(response);
                    window.open(response.data.url, "_SELF");
                }).catch(error => {
                    console.log("Fejl ved indhentning af data" + error)
                })
            }
        } else {
            window.open("/signup", "_SELF")
        }
    }

    const handlePremium = async e => {
        if (localStorage.getItem("auth")) {
            if (premiumPrice === 59) {
                setLoading2(true);
                const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/payment";
        
                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
        
                const requestBody = {
                    "items": [
                        { 
                            "id": 1, 
                            "quantity": 1
                        }
                    ]
                }
        
                axios.post(URL, requestBody, requestConfig).then(response => {
                    console.log(response);
                    window.open(response.data.url, "_SELF");
                }).catch(error => {
                    console.log("Fejl ved indhentning af data" + error)
                })
            } else if (premiumPrice === 39) {
                setLoading2(true);
                const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/payment";
    
                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
    
                const requestBody = {
                    "items": [
                        { 
                            "id": 2, 
                            "quantity": 1
                        }
                    ]
                }
    
                axios.post(URL, requestBody, requestConfig).then(response => {
                    console.log(response);
                    window.open(response.data.url, "_SELF");
                }).catch(error => {
                    console.log("Fejl ved indhentning af data" + error)
                })
            } else if (premiumPrice === 29) {
                setLoading2(true);
                const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/payment";
    
                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
    
                const requestBody = {
                    "items": [
                        { 
                            "id": 3, 
                            "quantity": 1
                        }
                    ]
                }
    
                axios.post(URL, requestBody, requestConfig).then(response => {
                    console.log(response);
                    window.open(response.data.url, "_SELF");
                }).catch(error => {
                    console.log("Fejl ved indhentning af data" + error)
                })
            }
        } else {
            window.open("/signup", "_SELF")
        }
    }

    function setType(type) {
        if (type === "quarter") {
            document.getElementById("quarter").className = "price-input-element-active";
            document.getElementById("month").className = "price-input-element";
            document.getElementById("year").className = "price-input-element";
            setPlusPrice(29);
            setPremiumPrice(39);
        } else if (type === "month") {
            document.getElementById("month").className = "price-input-element-active";
            document.getElementById("quarter").className = "price-input-element";
            document.getElementById("year").className = "price-input-element";
            setPlusPrice(39);
            setPremiumPrice(59);
        } else if (type === "year") {
            document.getElementById("year").className = "price-input-element-active";
            document.getElementById("quarter").className = "price-input-element";
            document.getElementById("month").className = "price-input-element";
            setPlusPrice(19);
            setPremiumPrice(29);
        }
    }

    return (
        <>
            <Head>
                <title>Priser - Køb Abonnement | Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/priser" />
                <meta name="description" content="Premium: 79kr - Opret egne gruppespil, deltag i præmiedyster, få udvidet statistikker, gratis betting tips og meget mere. Eller køb adgangsbillet til præmiedyster for 9 kr. - Eller gruppespilsbillet, som giver adgang til at oprette eget gruppespil til 37 kr." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet priser, tipsspillet abonnement, abonnement, priser, betting abonnement, odds abonnement" />
                <meta itemProp="name" content="Tipsspillet Priser og Abonnement" />
                <meta itemProp="description" content="Premium: 79kr - Opret egne gruppespil, deltag i præmiedyster, få udvidet statistikker, gratis betting tips og meget mere. Eller køb adgangsbillet til præmiedyster for 9 kr. - Eller gruppespilsbillet, som giver adgang til at oprette eget gruppespil til 37 kr." />
                <meta property="og:title" content="Priser - Abonnement - Tipsspillet" />
                <meta property="og:description" content="Premium: 79kr - Opret egne gruppespil, deltag i præmiedyster, få udvidet statistikker, gratis betting tips og meget mere. Eller køb adgangsbillet til præmiedyster for 9 kr. - Eller gruppespilsbillet, som giver adgang til at oprette eget gruppespil til 37 kr." />
            </Head>
            <div className="signup-abonnement">
                <div className="main-container" style={{transform: "scale(0.8)", marginTop: "-30px", }}>
                    <div className="hero-text">
                        <p className="main-component-p animation-fadeleft">Vælg et abonnement</p>
                        <h1 className="main-component-h1 main-gradient animation-fadeleft animation-delay-200">Vælg et abonnement</h1>
                        <h2 className="main-component-h3 animation-fadetop animation-delay-300">Opret gratis konto, eller opgrader til <span className="color-primary font-weight-500">Plus</span> eller <span className="color-primary font-weight-500">Premium</span>.</h2>
                    </div>
                </div>
                <div className="signup-abonnement-prices">
                    <div className="priser-container">
                        <div className="section-price">
                            <div className="set-center">
                                <div className="price-input animation-fadeleft animation-delay-400">
                                    <div className="price-input-element" id="month" onClick={() => setType("month")}>Månedligt</div>
                                    <div className="price-input-element-active" id="quarter" onClick={() => setType("quarter")}>Kvartalvis</div>
                                    <div className="price-input-element" id="year" onClick={() => setType("year")}>Årligt</div>
                                </div>
                            </div>
                            <div className="plans-container">
                                <div className="plans-con">
                                    <div className="plan-element animation-fadetop animation-delay-400">
                                        <div className="plan-element-top">
                                            <div className="plan-prices">
                                                <p className="plan-element-prisp">kr</p>
                                                <p className="plan-element-pris">0</p>
                                                <p className="plan-element-prisp" style={{fontSize: "15px", width: "100%", opacity: "0.9", marginTop: "auto", marginBottom: "10px"}}>/ for evigt</p>
                                            </div>
                                            <h5 className="plan-element-identifier">Basic version</h5>
                                            <p className="plan-element-binding">Prøv dig ad med Basic abonnement helt gratis.</p>
                                        </div>
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
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Opret gruppespil i alle ligaer</p>
                                            </div>
                                            <div className="plan-element-perk-off">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Deltag i præmieturneringer</p>
                                            </div>
                                            <div className="plan-element-perk-off">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Udvidet statistikker</p>
                                            </div>
                                            <div className="plan-element-perk-off">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Gratis betting tips</p>
                                            </div>
                                            <div className="plan-element-perk-off">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Ingen reklamer</p>
                                            </div>
                                        </div>
                                        <Link href="/stage/setup">
                                            <button className="square-btn-outline plan-btn">Opret Gratis Konto</button>
                                        </Link>
                                    </div>
                                    <div className="plan-element animation-fadetop animation-delay-600">
                                        <div className="plan-element-top">
                                            <div className="plan-prices">
                                                <p className="plan-element-prisp">kr</p>
                                                <p className="plan-element-pris">{plusPrice}</p>
                                                {plusPrice === 29 && <div className="plan-spar">Spar 25%</div>}
                                                {plusPrice === 19 && <div className="plan-spar">Spar 50%</div>}
                                                <p className="plan-element-prisp" style={{fontSize: "15px", width: "100%", opacity: "0.9", marginTop: "auto", marginBottom: "10px"}}>/ måned</p>
                                            </div>
                                            <h5 className="plan-element-identifier">Plus version</h5>
                                            <p className="plan-element-binding">Til fodboldentusiaster og administratorere af gruppespil.</p>
                                        </div>
                                        <div className="plan-element-perks">
                                            <div className="plan-element-perk">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Deltag i 5 spil</p>
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
                                                <p className="plan-element-perk-desc">Opret private gruppespil</p>
                                            </div>
                                            <div className="plan-element-perk">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Deltag i præmieturneringer*</p>
                                            </div>
                                            <div className="plan-element-perk">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Plus abonnement statistikker</p>
                                            </div>
                                            <div className="plan-element-perk-off">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Gratis betting tips</p>
                                            </div>
                                            <div className="plan-element-perk-off">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Ingen reklamer</p>
                                            </div>
                                        </div>
                                        <button className="square-btn-default plan-btn" onClick={handlePlus}>{loading1 && <div className="loader" id="loader1"></div>}{!loading1 && <>Køb abonnement</>}</button>
                                    </div>
                                    <div className="plan-element animation-fadetop animation-delay-800">
                                        <div className="plan-element-top">
                                            <div className="plan-prices">
                                                <p className="plan-element-prisp">kr</p>
                                                <p className="plan-element-pris">{premiumPrice}</p>
                                                {premiumPrice === 39 && <div className="plan-spar">Spar 34%</div>}
                                                {premiumPrice === 29 && <div className="plan-spar">Spar 50%</div>}
                                                <p className="plan-element-prisp" style={{fontSize: "15px", width: "100%", opacity: "0.9", marginTop: "auto", marginBottom: "10px"}}>/ måned</p>
                                            </div>
                                            <h5 className="plan-element-identifier">Premium version</h5>
                                            <p className="plan-element-binding">Til bettingeksperter, dedikerede spillere og administratorere.</p>
                                        </div>
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
                                                <p className="plan-element-perk-desc">Opret offentlige og private gruppespil</p>
                                            </div>
                                            <div className="plan-element-perk">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Deltag i <i>alle</i> præmieturneringer</p>
                                            </div>
                                            <div className="plan-element-perk">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                </svg>
                                                <p className="plan-element-perk-desc">Alle udvidet statistikker</p>
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
                                                <p className="plan-element-perk-desc">Ingen reklamer</p>
                                            </div>
                                        </div>
                                        <button className="square-btn-default plan-btn" onClick={handlePremium}>{loading2 && <div className="loader" id="loader2"></div>}{!loading2 && <>Køb abonnement</>}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Priser;