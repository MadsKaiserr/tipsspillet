import * as React from 'react';
import Link from 'next/link'
import { getQuestions } from "./faqQ.js";
 
function Faq () {

    var questions = getQuestions();

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
            <div className="faq-wrapper">
                <div className="faq-fix">
                    <h2 className="faq-head-h2">Ofte stillede spørgsmål</h2>
                    <h3 className="faq-head-h3">Kan du ikke finde dit spørgsmål? <Link href="/kontakt"><span className="main-gradient font-weight-500 cursor-pointer">Kontakt vores support</span></Link></h3>
                    <ul className="faq-container">
                        <div className="faq-fade"></div>
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
                    <Link href="/faq"><a className="faq-btn" style={{margin: "10px 0px", marginTop: "25px"}}>Se alle spørgsmål</a></Link>
                    <div className="faq-help">
                        <div className="faq-question">
                            <p className="faq-q">Kan du ikke finde dit spørgsmål?</p>
                            <br /><Link href="/kontakt"><a className="faq-btn" style={{minWidth: "110px"}}>Skriv til os</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Faq;