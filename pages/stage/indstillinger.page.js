import * as React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head'
import StageHeader from '../layout/stageheader';
import Priser from '../components/priser';
import axios from "axios";
import Link from 'next/link'
import cookie from 'js-cookie'
import Image from 'next/image'
import { getUser } from "../services/authService";
import Mastercard from '../img/mastercard.png';
import { useRouter } from 'next/router'
import Visa from '../img/visa.png';
 
function StageIndstillinger ({data}) {
    const router = useRouter()

    const [canModal, setCanModal] = useState(false);
    const [afbrydModal, setAfbrydModal] = useState(false);
    const [upgradeModal, setUpgradeModal] = useState(false);

    const [latestInv, setLatestInv] = useState(0);
    const [cardOnline, setCardOnline] = useState(false);
    const [fakturaLink, setFakturaLink] = useState("https://www.tipsspillet.dk/stage/indstillinger")
    const [last4, setLast4] = useState("xxxx");
    const [priceAmt, setPriceAmt] = useState(0);
    const [cardName, setCardName] = useState("Indlæser...");
    const [priceid, setPriceid] = useState("");
    const [abonnementType, setAbonnementType] = useState("");
    const [cardBrand, setCardBrand] = useState("");
    const [subId, setSubId] = useState("");
    const [afbrudt, setAfbrudt] = useState(false);

    const [loading0, setLoading0] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [priceInterval, setPriceInterval] = useState(3);
    const [ugAb, setUgAb] = useState("plus");
    const [plusPrice, setPlusPrice] = useState(29);
    const [premiumPrice, setPremiumPrice] = useState(39);
    const [abonnement, setAbonnement] = useState("none");
    const [rolleExp, setRolleExp] = useState(0);
    const [rolleIat, setRolleIat] = useState(0);
    const [customerId, setCustomerId] = useState("");

    useEffect(() => {
        if (customerId) {
            const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/retrievecard";
            const requestConfig2 = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
    
            const requestBody2 = {
                customer_id: customerId
            }
    
            axios.post(loginURL2, requestBody2, requestConfig2).then(response => {
                console.log("AWS - Retrieve card:", response);
                setLast4(response.data.payment.card.last4)
                setCardName(response.data.payment.billing_details.name)
                setCardBrand(response.data.payment.card.brand)
                setCardOnline(true);
                setSubId(response.data.subId)
                setPriceid(response.data.customer.subscriptions.data[0].items.data[0].plan.id);
                setPriceAmt(response.data.customer.subscriptions.data[0].items.data[0].price.unit_amount);
                setLatestInv(response.data.latest.created * 1000)
                setFakturaLink(response.data.latest.invoice_pdf)
                var PriceId = response.data.customer.subscriptions.data[0].items.data[0].plan.id;
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
                if (PriceId === test_plus1 || PriceId === live_plus1) {
                    setAbonnementType(" - Plus Abonnement (1 måned)")
                } else if (PriceId === test_plus3 || PriceId === live_plus3) {
                    setAbonnementType(" - Plus Abonnement (3 måneder)")
                } else if (PriceId === test_plus12 || PriceId === live_plus12) {
                    setAbonnementType(" - Plus Abonnement (12 måneder)")
                } else if (PriceId === test_premium1 || PriceId === live_premium1) {
                    setAbonnementType(" - Premium Abonnement (1 måned)")
                } else if (PriceId === test_premium3 || PriceId === live_premium3) {
                    setAbonnementType(" - Premium Abonnement (3 måneder)")
                } else if (PriceId === test_premium12 || PriceId === live_premium12) {
                    setAbonnementType(" - Premium Abonnement (12 måneder)")
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
            console.log("Ikke kunde")
        }
    }, [customerId])

    function cancelSub() {
        const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/cancelsub";
        const requestConfig2 = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        const requestBody2 = {
            sub_id: subId
        }

        axios.post(loginURL2, requestBody2, requestConfig2).then(response => {
            console.log("AWS - Retrieve card:", response);
            setCanModal(true);
            setAfbrydModal(false)
            setAfbrudt(true);
        }).catch(error => {
            console.log(error);
        })
    }

    const handlePlus = async e => {
        setUgAb("plus")
        setLoading1(true);
        if (getUser()) {
            if (abonnement === "none") {
                const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/subscribe";
                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
        
                const requestBody = {
                    email: getUser().email,
                    navn: getUser().username,
                    subscription: "plus" + priceInterval
                }

                axios.post(URL, requestBody, requestConfig).then(response => {
                    console.log(response);
                    router.push(response.data.session.url)
                }).catch(error => {
                    console.log("Fejl ved indhentning af data" + error)
                    setLoading1(false);
                })
            } else if (abonnement === "premium") {
                setUpgradeModal(true)
            } else {
                setLoading1(false);
                setNotiMessage("error", "Du har allerede abonnement", "Gå til indstillinger på din profil, og herunder abonnement, for at ændre dit nuværende abonnement. Se også https://www.tipsspillet.dk/stage/indstillinger");
            }
        } else {
            router.push("/login")
        }
    }

    function upgrade() {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/upgrade";
        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        const requestBody = {
            email: getUser().email,
            navn: getUser().username,
            subscription: ugAb + priceInterval,
            subid: subId
        }
        axios.post(URL, requestBody, requestConfig).then(response => {
            console.log(response);
            setAbonnement(response.data.body.Item.Attributes.rolle)
            setRolleExp(response.data.body.Item.Attributes.rolle_exp)
            setRolleIat(response.data.body.Item.Attributes.rolle_iat)
            setCustomerId(response.data.body.Item.Attributes.rolle_iat)
            setSubId(response.data.subscription2.id)
            setPriceid(response.data.subscription2.plan.id);
            var PriceId = response.data.subscription2.plan.id;
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
            if (PriceId === test_plus1 || PriceId === live_plus1) {
                setAbonnementType(" - Plus Abonnement (1 måned)")
            } else if (PriceId === test_plus3 || PriceId === live_plus3) {
                setAbonnementType(" - Plus Abonnement (3 måneder)")
            } else if (PriceId === test_plus12 || PriceId === live_plus12) {
                setAbonnementType(" - Plus Abonnement (12 måneder)")
            } else if (PriceId === test_premium1 || PriceId === live_premium1) {
                setAbonnementType(" - Premium Abonnement (1 måned)")
            } else if (PriceId === test_premium3 || PriceId === live_premium3) {
                setAbonnementType(" - Premium Abonnement (3 måneder)")
            } else if (PriceId === test_premium12 || PriceId === live_premium12) {
                setAbonnementType(" - Premium Abonnement (12 måneder)")
            }
            setProgress(parseInt(((new Date().getTime() - (response.data.body.Item.Attributes.rolle_iat * 1000))/((response.data.body.Item.Attributes.rolle_exp*1000) - (response.data.body.Item.Attributes.rolle_iat*1000)))*100));
            setDayProgress(parseInt(((response.data.body.Item.Attributes.rolle_exp*1000)-new Date().getTime())/1000/60/60/24))
            setLoading0(false);
            setLoading1(false);
            setLoading2(false);
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
            setLoading0(false);
            setLoading1(false);
            setLoading2(false);
        })
    }

    const handlePremium = async e => {
        setUgAb("premium")
        setLoading2(true);
        if (getUser()) {
            if (abonnement === "none") {
                const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/subscribe";
                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
        
                const requestBody = {
                    email: getUser().email,
                    navn: getUser().username,
                    subscription: "premium" + priceInterval
                }
                axios.post(URL, requestBody, requestConfig).then(response => {
                    console.log(response);
                    router.push(response.data.session.url)
                }).catch(error => {
                    console.log("Fejl ved indhentning af data" + error)
                    setLoading2(false);
                })
            } else if (abonnement === "plus") {
                setUpgradeModal(true)
            } else {
                setLoading2(false);
                setNotiMessage("error", "Du har allerede abonnement", "Gå til indstillinger på din profil, og herunder abonnement, for at ændre dit nuværende abonnement. Se også https://www.tipsspillet.dk/stage/indstillinger");
            }
        } else {
            router.push("/login")
        }
    }

    const [ogusernameField, setogUsernameField] = useState("Indlæser...");
    const [ogemailField, setogEmailField] = useState("Indlæser...");
    const [ognavn, setogNavn] = useState("Indlæser...")

    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState("");
    const [usernameField, setUsernameField] = useState("Indlæser...");
    const [emailField, setEmailField] = useState("Indlæser...");
    const [oprettelseText, setOprettelseText] = useState("Indlæser...");
    const [navn, setNavn] = useState("Indlæser...")
    const [facebook, setFacebook] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [handlinger, setHandlinger] = useState([]);
    const [progress, setProgress] = useState(0);
    const [dayProgress, setDayProgress] = useState(0);

    const [nav, setNav] = useState("generelt");

    useEffect(() => {
        console.log("AWS - Get User", data)
        setUser(JSON.stringify(data));
        setUsernameField(data["username"]);
        setEmailField(data["email"]);
        setNavn(data["navn"]);
        setogEmailField(data["email"]);
        setogNavn(data["navn"]);
        setogUsernameField(data["username"]);
        setHandlinger(data["handlinger"]);
        setNotiDyst(data.notifikationer.dyst);
        setNotiInvi(data.notifikationer.invi);
        setNotiKupon(data.notifikationer.kupon);
        setNotiDystOG(data.notifikationer.dyst);
        setNotiInviOG(data.notifikationer.invi);
        setNotiKuponOG(data.notifikationer.kupon);
        setRolleExp(data.rolle_exp * 1000);
        setRolleIat(data.rolle_iat * 1000);
        setCustomerId(data.customer_id)
        setAbonnement(data.rolle);
        setProgress(parseInt(((new Date().getTime() - (data.rolle_iat * 1000))/((data.rolle_exp*1000) - (data.rolle_iat*1000)))*100));
        setDayProgress(parseInt(((data.rolle_exp*1000)-new Date().getTime())/1000/60/60/24))
        if (data.type === "facebook") {
            setFacebook(true);
        }
        const year = new Date(data["oprettelse"]).getFullYear();
        const month = new Date(data["oprettelse"]).getMonth();
        const day = new Date(data["oprettelse"]).getDate();
        setOprettelseText(day + "/" + month + "/" + year);
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.get("abonnement")) {
            setNav("abonnement")
        }
    }, [])

    const fbResponse = (event) => {
        console.log(event);
        // cookie.set("fbLogin", JSON.stringify(event), {expires: 7})

        // const requestConfig = {
        //     headers: {
        //         "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
        //     }
        // }

        // const requestBody = {
        //     email: event.email,
        //     type: "facebook"
        // }

        // axios.post(loginURL, requestBody, requestConfig).then(response => {
        //     console.log("AWS - Login:", response);
        //     setUserSession(response.data.user, response.data.token);
        //     if (response.data.user.type === "facebook") {
        //         if (!response.data.user.fb_logo_id) {
        //             const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/user";
        //             const requestConfig2 = {
        //                 headers: {
        //                     "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
        //                 }
        //             }
            
        //             const requestBody2 = {
        //                 fb_logo_id: event.id,
        //                 name: event.name,
        //                 email: event.email
        //             }
            
        //             axios.patch(loginURL2, requestBody2, requestConfig2).then(response => {
        //                 console.log("AWS - Update user:", response);
        //             }).catch(error => {
        //                 console.log(error);
        //             })
        //         }
        //     }
        //     window.open("/stage", "_self");
        // }).catch(error => {
        //     console.log(error);
        // })
    }

    function sendEmail() {
        const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/sendemail";
        const requestConfig2 = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        const requestBody2 = {
            email: [getUser().email],
            template: "anbefalet"
        }

        axios.post(loginURL2, requestBody2, requestConfig2).then(response => {
            console.log("AWS - Send email:", response);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        if ((usernameField !== ogusernameField) || (emailField !== ogemailField) || (navn !== ognavn)) {
            setEdited(true)
        } else {
            setEdited(false)
        }
    }, [usernameField, emailField, navn])

    const [edited, setEdited] = useState(false);

    function updateProfile() {
        setLoading(true);
        if (handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7) < 0) {
            const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updateuser";
            const requestConfig2 = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
    
            const requestBody2 = {
                name: navn,
                email: getUser().email,
                username: usernameField,
                handlinger: handlinger
            }
    
            axios.patch(loginURL2, requestBody2, requestConfig2).then(response => {
                console.log("AWS - Update user:", response);
                setLoading(false);
                setogNavn(navn);
                setogUsernameField(usernameField);
                setMessage("Profiloplysninger opdateret!");
                setModal(true);
                setHandlinger(response.data.Item.Attributes.handlinger);
            }).catch(error => {
                console.log(error);
                setMessage("Der skete en fejl. Prøv igen senere, eller kontakt os");
                setLoading(false);
            })
        } else {
            setLoading(false);
            setMessage("Det er mindre end 7 dage siden du sidst opdaterede dine oplysninger. Vent til " + new Date(handlinger[handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7)].iat + 1000 * 60 * 60 * 24 * 7).getDate() + "/" + (new Date(handlinger[handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7)].iat + 1000 * 60 * 60 * 24 * 7).getMonth() + 1) + "/" + new Date(handlinger[handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7)].iat + 1000 * 60 * 60 * 24 * 7).getFullYear() + " før du prøver igen.")
        }
    }

    const [editedNoti, setEditedNoti] = useState(false);

    const [notiDystOG, setNotiDystOG] = useState(false);
    const [notiKuponOG, setNotiKuponOG] = useState(false);
    const [notiInviOG, setNotiInviOG] = useState(false);
    const [notiDyst, setNotiDyst] = useState(false);
    const [notiKupon, setNotiKupon] = useState(false);
    const [notiInvi, setNotiInvi] = useState(false);

    useEffect(() => {
        if (notiDyst !== notiDystOG || notiKuponOG !== notiKupon || notiInviOG !== notiInvi) {
            setEditedNoti(true);
        } else {
            setEditedNoti(false);
        }
    }, [notiDyst, notiKupon, notiInvi])

    function updateNotifikationer() {
        setLoading(true);
        if (editedNoti) {
            const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/notifikationer";
            const requestConfig2 = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
    
            const requestBody2 = {
                email: getUser().email,
                notifikationer: {
                    "invi": notiInvi,
                    "kupon": notiKupon,
                    "dyst": notiDyst
                }
            }
    
            axios.patch(loginURL2, requestBody2, requestConfig2).then(response => {
                console.log("AWS - Update indstillinger:", response);
                setLoading(false);
                setNotiDystOG(notiDyst);
                setNotiInviOG(notiInvi);
                setNotiKuponOG(notiKupon);
                setMessage("Indstillinger opdateret!");
                setModal(true);
            }).catch(error => {
                console.log(error);
                setMessage("Der skete en fejl. Prøv igen senere, eller kontakt os");
                setLoading(false);
            })
        }
    }

    const [messageType, setMessageType] = useState("error-con-error");

    function setNotiMessage(type, heading, message) {
        window.scrollBy(0, -400);
        if (type === "error") {
            setMessageType("error-con-error");
        } else if (type === "success") {
            setMessageType("error-con-success");
        }
        document.getElementById("errorCon").classList.add("display");
        document.getElementById("errorConH").innerHTML = heading;
        document.getElementById("errorConP").innerHTML = message;
    }

    useEffect(() => {
        if (nav === "abonnement" && !afbrudt && !cardOnline && abonnement === "none") {
            router.push("/stage/opgrader");
        }
    }, [nav])

    return (
        <>
            <Head>
                <title>Indstillinger - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            {modal && <div className="modal-test">
                <div className="modal-con">
                    <p className="con-modal-p">Dine indstillinger blev opdateret</p>
                    <div className="modal-wrapper">
                        <button className="con-modal-btn" onClick={() => setModal(false)}>Okay</button>
                    </div>
                </div>
            </div>}
            {afbrydModal && <div className="modal-test">
                <div className="modal-con">
                    <p className="con-modal-p">Er du sikker på, at du vil opsige dit abonnement? Du vil stadig have dit abonnements fordele indtil enden af din betalingsperiode.</p>
                    <div className="modal-wrapper">
                        <button className="con-modal-btn" onClick={() => cancelSub()}>Opsig abonnement</button>
                        <button className="con-modal-afbryd" onClick={() => setAfbrydModal(false)}>Gå tilbage</button>
                    </div>
                </div>
            </div>}
            {canModal && <div className="modal-test">
                <div className="modal-con">
                    <p className="con-modal-p">Dit abonnement er blevet afbrudt. Du vil stadig have dit abonnements fordele indtil enden af din betalingsperiode.</p>
                    <div className="modal-wrapper">
                        <button className="con-modal-btn" onClick={() => setCanModal(false)}>Okay</button>
                    </div>
                </div>
            </div>}
            {upgradeModal && <div className="modal-test">
                <div className="modal-con">
                    <p className="con-modal-p">Er du sikker på, at du vil opgradere? Denne handling kan ikke fortrydes.</p>
                    <br />
                    <p className="con-modal-p">Dit nye abonnement træder i kræft indenfor få minutter, og tiden du har tilbage i dit nuværende abonnement vil blive trukket fra den nye pris.</p>
                    <div className="modal-wrapper">
                        <button className="con-modal-btn" onClick={() => {setUpgradeModal(false);upgrade()}}>Opgrader</button>
                        <button className="con-modal-afbryd" onClick={() => {setUpgradeModal(false);setLoading0(false);setLoading1(false);setLoading2(false);}}>Annuller</button>
                    </div>
                </div>
            </div>}
            <div className="op-container">
                <div className="is-top">
                    {nav === "generelt" && <><p className="is-top-p-active">Generelt</p>
                    <p className="is-top-p" onClick={() => setNav("notifikationer")}>Notifikationer</p>
                    <p className="is-top-p" onClick={() => setNav("abonnement")}>Abonnement</p></>}
                    {nav === "notifikationer" && <><p className="is-top-p" onClick={() => setNav("generelt")}>Generelt</p>
                    <p className="is-top-p-active">Notifikationer</p>
                    <p className="is-top-p" onClick={() => setNav("abonnement")}>Abonnement</p></>}
                    {nav === "abonnement" && <><p className="is-top-p" onClick={() => setNav("generelt")}>Generelt</p>
                    <p className="is-top-p" onClick={() => setNav("notifikationer")}>Notifikationer</p>
                    <p className="is-top-p-active">Abonnement</p></>}
                </div>
                <div className={messageType} id="errorCon">
                    <div className="error-text">
                        <div className="error-inline">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop: "-3px"}} width="16" height="16" fill="var(--red)" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <p className="error-container-h1" id="errorConH">Test fejl</p>
                        </div>
                        <p className="error-container-p" id="errorConP">Test besked</p>
                    </div>
                </div>
                {nav === "generelt" && <><div className="op-content">
                    <p className="op-h1">Generelt</p>
                    <p className="op-h2">Generelle brugerindstillinger</p>
                    <div className="op-form">
                        <div className="op-form-element">
                            <p className="op-form-p">Fulde navn</p>
                            <input type="text" value={navn} onChange={event => setNavn(event.target.value)} className="op-input" />
                        </div>
                        <div className="op-form-element">
                            <p className="op-form-p">Brugernavn</p>
                            <input type="text" value={usernameField} onChange={event => setUsernameField(event.target.value)} className="op-input" />
                        </div>
                        <div className="op-form-element">
                            <p className="op-form-p">Email</p>
                            <input type="text" value={emailField} onChange={event => setEmailField(event.target.value)} className="op-input" />
                        </div>
                    </div>
                </div>
                {message !== "" && <p className="og-msg">{message}</p>}
                {edited && <button className="wc-btn" onClick={() => updateProfile()}>{loading && <div className="loader"></div>}{!loading && <>Opdater profil</>}</button>}
                {!edited && <button className="wc-btn-off">Opdater profil</button>}
                </>}
                {nav === "notifikationer" && <><div className="op-content">
                    <p className="op-h1">Notifikationer</p>
                    <p className="op-h2">Indstillinger for notifikationer</p>
                    <div className="op-form">
                        {notiDyst && <div className="op-form-tick" onClick={() => setNotiDyst(false)}>
                            <div className="form-flex">
                                <p className="op-form-p">Præmiedyster</p>
                                <p className="op-form-by">Få besked hver gang vi offentliggør en ny præmiedyst</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                        {!notiDyst && <div className="op-form-tick-off" onClick={() => setNotiDyst(true)}>
                            <div className="form-flex">
                                <p className="op-form-p">Præmiedyster</p>
                                <p className="op-form-by">Få besked hver gang vi offentliggør en ny præmiedyst</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                        {notiKupon && <div className="op-form-tick" onClick={() => setNotiKupon(false)}>
                            <div className="form-flex">
                                <p className="op-form-p">Kuponer</p>
                                <p className="op-form-by">Ved placering af kuponer, vundet og tabte kuponer</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                        {!notiKupon && <div className="op-form-tick-off" onClick={() => setNotiKupon(true)}>
                            <div className="form-flex">
                                <p className="op-form-p">Kuponer</p>
                                <p className="op-form-by">Ved placering af kuponer, vundet og tabte kuponer</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                        {notiInvi && <div className="op-form-tick" onClick={() => setNotiInvi(false)}>
                            <div className="form-flex">
                                <p className="op-form-p">Invitationer</p>
                                <p className="op-form-by">Få besked om invitationer fra venner</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                        {!notiInvi && <div className="op-form-tick-off" onClick={() => setNotiInvi(true)}>
                            <div className="form-flex">
                                <p className="op-form-p">Invitationer</p>
                                <p className="op-form-by">Få besked om invitationer fra venner</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                    </div>
                </div>
                {message !== "" && <p className="og-msg">{message}</p>}
                {editedNoti && <button className="wc-btn" style={{marginTop: "30px"}} onClick={() => updateNotifikationer()}>{loading && <div className="loader"></div>}{!loading && <>Opdater indstillinger</>}</button>}
                {!editedNoti && <button className="wc-btn-off" style={{marginTop: "30px"}}>Opdater indstillinger</button>}
                {/* <button className="gruppespil-cta-btn" onClick={() => sendEmail()}>Send email</button> */}
                </>}
                {nav === "abonnement" && <><div className="op-content" style={{maxWidth: "1100px", minHeight: "750px"}}>
                    <p className="op-h1">Abonnement</p>
                    <p className="op-h2">Indstillinger for abonnement</p>
                    <div className="op-form">
                        {afbrudt && <>
                            <p className="is-h1">Betalingsoversigt</p>
                            <p className="is-h2">{dayProgress} dage tilbage af dit abonnement</p>
                            <div className="plan-progress">
                                <div className="plan-user" style={{width: progress + "%"}}></div>
                            </div>
                            <div className="plan-progress-id">
                                <p className="is-p">{new Date(rolleIat).getDate().toString().padStart(2, '0') + "/" + (new Date(rolleIat).getMonth() + 1).toString().padStart(2, '0')}</p>
                                <p className="is-p">{new Date(rolleExp).getDate().toString().padStart(2, '0') + "/" + (new Date(rolleExp).getMonth() + 1).toString().padStart(2, '0')}</p>
                            </div>
                        </>}
                        {!afbrudt && <>
                            <div className="op-cards">
                            {cardOnline && <>
                                <div className="sub-data">
                                <p className="is-h1">Betalingsoversigt</p>
                                <p className="is-h2">{dayProgress} dage til næste betaling</p>
                                <div className="plan-progress">
                                    <div className="plan-user" style={{width: progress + "%"}}></div>
                                </div>
                                <div className="plan-progress-id">
                                    <p className="is-p">{new Date(rolleIat).getDate().toString().padStart(2, '0') + "/" + (new Date(rolleIat).getMonth() + 1).toString().padStart(2, '0')}</p>
                                    <p className="is-p">{new Date(rolleExp).getDate().toString().padStart(2, '0') + "/" + (new Date(rolleExp).getMonth() + 1).toString().padStart(2, '0')}</p>
                                </div>
                                <div className="sub-card">
                                    <div className="sub-span">
                                        <div className="sub-status"></div>
                                        <p className="sub-status-p">Aktiv {abonnementType}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="sub-icon" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                                    </svg>
                                    <p className="sub-card-p">{cardName}</p>
                                    <div className="sub-span">
                                        <p className="sub-card-p">•••• •••• ••••</p>
                                        <p className="sub-card-p">{last4}</p>
                                    </div>
                                    <div className="sub-span">
                                        <div className="sub-span">
                                            <p className="sub-card-p" style={{opacity: "0.75"}}>EXP</p>
                                            <p className="sub-card-p">••/••</p>
                                        </div>
                                        <div className="sub-span" style={{paddingLeft: "8px"}}>
                                            <p className="sub-card-p" style={{opacity: "0.75"}}>CVC</p>
                                            <p className="sub-card-p">•••</p>
                                        </div>
                                    </div>
                                    <div className="sub-img">
                                        {cardBrand === "visa" && <Image src={Visa} />}
                                        {cardBrand === "mastercard" && <Image src={Mastercard} />}
                                    </div>
                                </div>
                                <div className="card-cta">
                                    <button className="card-cta-btn-active" onClick={() => setAfbrydModal(true)}>Opsig abonnement</button>
                                    <button className="card-cta-btn">Opgrader</button>
                                    <button className="card-cta-btn" onClick={() => {window.open("/abonnement", "_blank")}}>Læs mere</button>
                                </div>
                                </div>
                                <div className="sub-data">
                                    <p className="is-h1">Fakturering</p>
                                    <p className="is-h2">Næste betaling d. {new Date(rolleExp).getDate().toString().padStart(2, '0') + "." + (new Date(rolleExp).getMonth() + 1).toString().padStart(2, '0') + "." + new Date(rolleExp).getFullYear().toString().padStart(2, '0')}</p>
                                    <p className="is-h3">{priceAmt / 100},00 kr.</p>
                                    <p className="is-h2" style={{paddingTop: "15px"}}>Faktureringshistorik</p>
                                    <p className="is-h4">Sidst betalt d. {new Date(latestInv).getDate().toString().padStart(2, '0') + "." + (new Date(latestInv).getMonth() + 1).toString().padStart(2, '0') + "." + new Date(latestInv).getFullYear().toString().padStart(2, '0')}</p>
                                    <p className="is-a" style={{paddingTop: "15px"}} onClick={() => window.open(fakturaLink, "_BLANK")}>Download faktura</p>
                                </div>
                                {/* <div className="sub-data">
                                    <p className="is-h1">Fakturering</p>
                                    <p className="is-h2">Næste betaling d. {new Date(rolleExp).getDate().toString().padStart(2, '0') + "." + (new Date(rolleExp).getMonth() + 1).toString().padStart(2, '0') + "." + new Date(rolleExp).getFullYear().toString().padStart(2, '0')}</p>
                                    <p className="is-h3">{priceAmt / 100},00 kr.</p>
                                    <p className="is-h2" style={{paddingTop: "15px"}}>Faktureringshistorik</p>
                                    <p className="is-h4">Sidst betalt d. {new Date(rolleIat).getDate().toString().padStart(2, '0') + "." + (new Date(rolleIat).getMonth() + 1).toString().padStart(2, '0') + "." + new Date(rolleIat).getFullYear().toString().padStart(2, '0')}</p>
                                </div> */}
                            </>}
                            {!cardOnline && <>
                                {abonnement !== "none" && <>
                                    <div className="sub-data">
                                        <p className="is-h1">Betalingsoversigt</p>
                                        <p className="is-h2">{dayProgress} dage tilbage af dit abonnement</p>
                                        <div className="plan-progress">
                                            <div className="plan-user" style={{width: progress + "%"}}></div>
                                        </div>
                                        <div className="plan-progress-id">
                                            <p className="is-p">{new Date(rolleIat).getDate().toString().padStart(2, '0') + "/" + (new Date(rolleIat).getMonth() + 1).toString().padStart(2, '0')}</p>
                                            <p className="is-p">{new Date(rolleExp).getDate().toString().padStart(2, '0') + "/" + (new Date(rolleExp).getMonth() + 1).toString().padStart(2, '0')}</p>
                                        </div>
                                        <div className="card-cta">
                                            <button className="card-cta-btn-active">Forny abonnement</button>
                                            <button className="card-cta-btn" onClick={() => {window.open("/abonnement", "_blank")}}>Læs mere</button>
                                        </div>
                                    </div>
                                </>}
                            </>}
                            </div>
                        </>}
                    </div>
                </div>
                </>}
            </div>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const sendRedirectLocation = (location) => {
        res.writeHead(302, {
            Location: location,
        });
        res.end();
        return { props: {} };
    };
    if (!req.cookies.auth) {
        sendRedirectLocation('/signup')
    }
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const requestConfig = {
        headers: {
            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
        }
    }
    var resp;
    var data = {};
    if (req.cookies.email) {
        resp = await axios.get("https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/user?user=" + req.cookies.email, requestConfig);
        var data = resp.data;
    }
    if (!data) {
        return {
          notFound: true,
        }
    }
    return {
        props: { data },
    }
}
 
export default StageIndstillinger;