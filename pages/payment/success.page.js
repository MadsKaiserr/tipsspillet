import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from '../layout/header';
import FaqComponent from '../components/faq';
import axios from "axios";
import { getUser } from "../services/authService";
import cookie from 'js-cookie'

function Success () {

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (getUser()) {
            const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/retrieve";
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const session_id = urlParams.get('session_id');

            const requestConfig = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }

            const requestBody = {
                "session_key": session_id,
                "email": getUser().email
            }

            axios.post(URL, requestBody, requestConfig).then(response => {
                console.log(response);
                const URLRet = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/retrievesubscription";

                const requestConfigRet = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }

                const requestBodyRet = {
                    "subscription": response.data.session.subscription,
                    "email": getUser().email
                }

                axios.post(URLRet, requestBodyRet, requestConfigRet).then(result => {
                    console.log(result);
                    const URLUpdate = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updateabonnement";
                    const requestConfigUpdate = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }

                    const requestBodyUpdate = {
                        "customerId": result.data.customer,
                        "priceId": result.data.plan.id,
                        "rolle_exp": result.data.current_period_end,
                        "rolle_iat": result.data.current_period_start,
                        "email": getUser().email
                    }

                    axios.post(URLUpdate, requestBodyUpdate, requestConfigUpdate).then(res => {
                        console.log("AWS - Update abonnement", res);
                        setSuccess(true);
                        const test_plus1 = "price_1LuMW1DgBSgfAmE2l7k2TnCH";
                        const test_plus3 = "price_1LuMW1DgBSgfAmE2hNfySZQn";
                        const test_plus12 = "price_1LuMW1DgBSgfAmE2yportvM9";
                        const test_premium1 = "price_1LuMVMDgBSgfAmE2bMMEoBKC";
                        const test_premium3 = "price_1LuMVMDgBSgfAmE24WJZ75vz";
                        const test_premium12 = "price_1LuMVMDgBSgfAmE2jnAUOR2m";
                        var rolle = "";
                        if (body.priceId === test_plus1) {
                            rolle = "plus";
                        } else if (body.priceId === test_plus3) {
                            rolle = "plus";
                        } else if (body.priceId === test_plus12) {
                            rolle = "plus";
                        } else if (body.priceId === test_premium1) {
                            rolle = "premium";
                        } else if (body.priceId === test_premium3) {
                            rolle = "premium";
                        } else if (body.priceId === test_premium12) {
                            rolle = "premium";
                        }
                        var cookieAuth = JSON.parse(cookie.get("auth"));
                        cookieAuth.rolle = rolle;
                        cookieAuth.rolle_exp = result.data.current_period_end;
                        cookie.set("auth", JSON.stringify(cookieAuth), {expires: 7});
                    }).catch(error => {
                        console.log("Fejl ved indhentning af data" + error)
                    })
                }).catch(error => {
                    console.log("Fejl ved indhentning af data" + error)
                })
            }).catch(error => {
                console.log("Fejl ved indhentning af data" + error)
            })
        } else {
            console.log("NO USER")
        }
        console.log("EFFECT RUN")
    }, [])

    return (
        <>
            <Head>
                <title>Køb gennemført - Køb Abonnement | Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Header />
            {success && <div className="main-block-container">
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">Gennemført køb</p>
                    <h1 className="main-component-h1 main-gradient animation-fadeleft animation-delay-200">Tak for dit køb!</h1>
                    <h2 className="main-component-h3 animation-fadetop animation-delay-300">Dit abonnement vil blive aktiveret indenfor få timer. Oplever du problemer, bedes du kontakte os.</h2>
                </div>
                <Link href="/stage"><a className="faq-btn">Begynd at bette</a></Link>
            </div>}
            {!success && <div className="main-block-container">
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">Ups... der skete en fejl</p>
                    <h1 className="main-component-h1 red-gradient animation-fadeleft animation-delay-200">Det ser ud til, at der skete en fejl</h1>
                    <h2 className="main-component-h3 animation-fadetop animation-delay-300">Kontakt os nedenfor, for at få mere information.</h2>
                </div>
                <Link href="/kontakt"><a className="faq-btn">Kontakt os</a></Link>
            </div>}
            <FaqComponent />
        </>
    )
}
 
export default Success;