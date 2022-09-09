import * as React from 'react';
import Link from 'next/link'
 
function Faq () {

    const questions = [
        {
            "id": "q1",
            "name": "Hvordan opretter man gruppespil?",
            "paragraphs": [
                {
                    "text": "For at oprette et gruppespil, kræver det, at du har et Premium abonnement, eller har købt en adgangsbillet. Adgangsbilletter er engangsbilletter til at oprette et gruppespil"
                },
                {
                    "text": "Du kan købe Premium abonnement og lave dine egne gruppespil, deltage i præmiedyster, få udvidet statistikker og meget mere, ved at navigere til 'Priser'."
                }
            ]
        },
        {
            "id": "q2",
            "name": "Hvorfor kan jeg ikke se min kamp på listen?",
            "paragraphs": [
                {
                    "text": "Af og til kan det forekomme, at en kamp ikke bliver vist under 'Mest spillede' eller 'Dagens kampe'. Hvis dette er tilfældet, kan du forsøge at finde holdet eller ligaen i søgefeltet, og skulle derefter gerne se kampe under 'Kommende kamoe'."
                },
                {
                    "text": "Er dette ikke tilfældet, bedes du kontakte os på mail: madskaiser@tipsspillet.dk, eller via vores fejlregistrerings-system på forsiden efter du er logget ind."
                }
            ]
        },
        {
            "id": "q3",
            "name": "Hvordan tilmelder jeg mig præmiedyster?",
            "paragraphs": [
                {
                    "text": "Præmiedysterne er udelukkende for Premium medlemmer, eller brugere der har købt en adgangsbillet til en præmiedyst. Hvis du har dette, kan du tilmelde dig på selve præmiedysten."
                },
                {
                    "text": "Du kan købe abonnement og adgangsbilletter under siden 'Priser'."
                }
            ]
        },
        {
            "id": "q4",
            "name": "Hvornår får jeg min udbetaling?",
            "paragraphs": [
                {
                    "text": "Dine kuponer bliver først beregnet når alle kampe i din kupon er spillet færdig. Dette betyder din udbetaling først vil komme efter alle kampe er spillede, og der står 'Alle afgjort' i hjørnet af din kupon."
                }
            ]
        },
        {
            "id": "q5",
            "name": "Hvordan inviterer jeg folk til mit gruppespil?",
            "paragraphs": [
                {
                    "text": "I bunden af dit gruppespil finder du et invite-link, som du kan sende til dine venner, hvor de har mulighed for at tilmelde sig dit gruppespil."
                }
            ]
        },
        {
            "id": "q6",
            "name": "Hvordan rapporterer jeg en fejl?",
            "paragraphs": [
                {
                    "text": "Hvis du finder en fejl, bedes du henvende dig via. mail: madskaiser@tipsspillet.dk, eller via vores fejlregistrerings-system på forsiden efter du er logget ind."
                }
            ]
        }
    ]

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
            <div className="faq-fix">
                <div className="faq-input-con">
                    <div className="faq-input">
                        <svg xmlns="http://www.w3.org/2000/svg" className="faq-input-icon" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        <input type="text" placeholder="Få svar på dine spørgsmål" className="faq-field" />
                    </div>
                </div>
                <ul className="faq-container">
                    {questions.map(question => {
                        return (
                            <li key={question.id} className="faq-element" onClick={() => {showQuestion(question.id)}}>
                                <div className="faq-question">
                                    <p className="faq-q">{question.name}</p>
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
                                        return (
                                            <li key={para.text} className="faq-a-p">{para.text}</li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                    <li key={"help"} className="faq-help">
                        <div className="faq-question">
                            <p className="faq-q">Kan du ikke finde din spørgsmål?</p>
                            <br /><Link href="/kontakt"><a className="faq-btn">Skriv til os</a></Link>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}
 
export default Faq;