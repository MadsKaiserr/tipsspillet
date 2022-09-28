import * as React from 'react';
import {useEffect} from 'react';
import FaqSite from '../components/faq';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../layout/stageheader'
import Height from '../components/height';
import { getQuestions } from "../components/faqQ.js"; 

function StageFaq () {

    var questions = getQuestions();
    
    useEffect(() => {
        window.addEventListener("scroll", function(){
            if (document.getElementById("designer-hero")) {
                document.getElementById("designer-hero").classList.toggle("designer-relative", window.scrollY > 340);
            }
        })
    }, [])

    function showQuestion(id) {
        let q_a = document.getElementById(id+"-a");
        let q_i = document.getElementById(id+"-i");
        let q_i2 = document.getElementById(id+"-i2");
        q_a.classList.toggle("display");
        q_i.classList.toggle("display");
        q_i2.classList.toggle("display");
    }

    return (
        <>
            <Head>
                <title>FAQ - Spørgsmål og svar - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <div className="stage-main-container" id="faqside">
                <div className="faq-wrapper">
                    <div className="faq-fix">
                        <h2 className="faq-head-h2">Ofte stillede spørgsmål</h2>
                        <h3 className="faq-head-h3">Kan du ikke finde dit spørgsmål? <Link href="/kontakt"><span className="main-gradient font-weight-500 cursor-pointer">Kontakt vores support</span></Link></h3>
                        <ul className="faq-container" style={{maxHeight: "100%"}}>
                            {questions.map(question => {
                                return (
                                    <li key={question.id} className="faq-element" onClick={() => {showQuestion(question.id)}}>
                                        <div className="faq-question">
                                            <h3 className="faq-q">{question.name}</h3>
                                            <svg xmlns="http://www.w3.org/2000/svg" id={question.id + "-i"} className="faq-chevron display" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" id={question.id + "-i2"} className="faq-chevron" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                            </svg>
                                        </div>
                                        <ul className="faq-answer" id={question.id + "-a"}>
                                            {question.paragraphs.map(para => {
                                                if (para.type === "text") {
                                                    return (
                                                        <li key={para.text} className="faq-a-p">{para.text}</li>
                                                    );
                                                } else if (para.type === "link") {
                                                    return (
                                                        <li key={para.text} className="faq-a"><Link href={para.to}><a className="faq-a">{para.text}</a></Link></li>
                                                    );
                                                } else if (para.type === "br") {
                                                    return (
                                                        <><br /><br /></>
                                                    );
                                                }
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="faq-help">
                            <div className="faq-question">
                                <p className="faq-q">Kan du ikke finde dit spørgsmål?</p>
                                <br /><Link href="/kontakt"><a className="faq-btn" style={{minWidth: "110px"}}>Skriv til os</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ res, req }) {
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
    return {
        props: { },
    }
}
 
export default StageFaq;