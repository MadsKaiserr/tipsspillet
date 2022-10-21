import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from '../layout/header';
import FaqComponent from '../components/faq';
import axios from "axios";
import { getUser } from "../services/authService";
import cookie from 'js-cookie'

function Success ({data}) {

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    useEffect(() => {
        console.log(data);
        if (getUser()) {
            var emailFix = getUser().email;
            const URLRet = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/retrievesubscription";

            const requestConfigRet = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }

            const requestBodyRet = {
                "subscription": data.session.subscription,
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
                    const live_plus1 = "price_1LuM3mDgBSgfAmE2pTouEwTQ";
                    const live_plus3 = "price_1LuM3mDgBSgfAmE2JP3pvK5i";
                    const live_plus12 = "price_1LuM3mDgBSgfAmE2Y56zoWBb";
                    const live_premium1 = "price_1LuM2rDgBSgfAmE2o19l1bGB";
                    const live_premium3 = "price_1LuM2rDgBSgfAmE2NL5u2jJF";
                    const live_premium12 = "price_1LuM2rDgBSgfAmE2BxUW5Eyj";
                    var rolle = "";
                    if (result.data.plan.id === live_plus1) {
                        rolle = "plus";
                    } else if (result.data.plan.id === live_plus3) {
                        rolle = "plus";
                    } else if (result.data.plan.id === live_plus12) {
                        rolle = "plus";
                    } else if (result.data.plan.id === live_premium1) {
                        rolle = "premium";
                    } else if (result.data.plan.id === live_premium3) {
                        rolle = "premium";
                    } else if (result.data.plan.id === live_premium12) {
                        rolle = "premium";
                    }
                    var cookieAuth = JSON.parse(cookie.get("auth"));
                    cookieAuth.rolle = rolle;
                    cookieAuth.rolle_exp = result.data.current_period_end;
                    cookieAuth.customer_id = result.data.customer;
                    cookie.set("auth", JSON.stringify(cookieAuth), {expires: 7});
                }).catch(error => {
                    console.log("Fejl ved indhentning af data" + error)
                    setFail(true);
                })
            }).catch(error => {
                console.log("Fejl ved indhentning af data" + error)
                setFail(true);
            })
        } else {
            setFail(true);
        } 
    }, [])

    return (
        <>
            <Head>
                <title>Køb gennemført - Køb Abonnement | Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Header />
            {!success && <>
                {!fail && <div className="match-loader display" style={{marginTop: "250px"}}></div>}
            </>}
            {success && <div className="main-block-container">
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">Gennemført køb</p>
                    <h1 className="main-component-h1 main-gradient animation-fadeleft animation-delay-200">Tak for dit køb!</h1>
                    <h2 className="main-component-h3 animation-fadetop animation-delay-300">Dit abonnement vil blive aktiveret indenfor få timer. Oplever du problemer, bedes du kontakte os.</h2>
                </div>
                <Link href="/stage"><a className="faq-btn">Begynd at bette</a></Link>
            </div>}
            {fail && <div className="main-block-container">
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

export async function getServerSideProps({ req, res, query }) {
    const requestConfig = {
        headers: {
            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
        }
    }
    const requestBody = {
        "session_key": query.session_id
    }
    var resp = await axios.post("https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/retrieve", requestBody, requestConfig);
    var data = resp.data;
    if (!data) {
        return {
          notFound: true,
        }
    }
    return {
        props: { data },
    }
}
export default Success;