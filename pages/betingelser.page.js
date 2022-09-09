import * as React from 'react';
import { useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Header from './layout/header';
 
function Betingelser () {

    return (
        <>
            <Head>
                <title>Betingelser - Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/betingelser" />
                <meta name="description" content="Følgende vilkår og rettigheder er gældende i forbindelse med anvendelsen af internetsiden. Ved at gå ind på denne internetside anerkender og tiltræder du følgende vilkår og rettigheder. Såfremt du ikke kan acceptere disse vilkår og rettigheder, skal du ikke benytte denne internetside" />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet betingelser,betingelser,terms of service,tos,faq,privatliv" />
                <meta itemProp="name" content="Tipsspillet Betingelser" />
                <meta itemProp="description" content="Følgende vilkår og rettigheder er gældende i forbindelse med anvendelsen af internetsiden. Ved at gå ind på denne internetside anerkender og tiltræder du følgende vilkår og rettigheder. Såfremt du ikke kan acceptere disse vilkår og rettigheder, skal du ikke benytte denne internetside" />
                <meta property="og:title" content="Betingelser - Tipsspillet" />
                <meta property="og:description" content="Følgende vilkår og rettigheder er gældende i forbindelse med anvendelsen af internetsiden. Ved at gå ind på denne internetside anerkender og tiltræder du følgende vilkår og rettigheder. Såfremt du ikke kan acceptere disse vilkår og rettigheder, skal du ikke benytte denne internetside" />
            </Head>
            <Header />
            <div className="stage-main-container">
                <div className="betingelser-container">
                <h1 className="betingelser-h1">Tipsspillet Betingelser</h1>
                <p className="betingelser-h2">Sidst opdateret 24. maj, 2022</p>
                <h2 className="betingelser-p">Velkommen til Tipsspillet</h2>
                <h3 className="betingelser-p">Følgende vilkår og rettigheder er gældende i forbindelse med anvendelsen af internetsiden. Ved at gå ind på denne internetside anerkender og tiltræder du følgende vilkår og rettigheder. Såfremt du ikke kan acceptere disse vilkår og rettigheder, skal du ikke benytte denne internetside</h3>
                <div className="betingelser-section">
                    <p className="betingelser-h3">Sektion A - Om Tipsspillet</p>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">1 - Hvem er vi?</p>
                        <p className="betingelser-p">Tipsspillet er en dansk-ejet enkeltmandsvirksomhed, som er drevet af Mads Kaiser. Vi lader folk konkurrere med venner og familie i Oddset verdenen, uden nogen økonomisk risiko. Vi giver derved også individer under 18-år mulighed for at prøve kræfter af med Odds helt gratis. <br /><br />
                        Tipsspillet tilbyder sjove konkurrencer for familie og venner, og lader folk oprette gruppespil, for at sætte deres Oddset-evner på prøve. Opret gruppespil, deltag i offentlige og private gruppespil, eller prøv kræfter med præmiedyster, hvis du føler dig selvsikker</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">2 - Hvad er vores formål?</p>
                        <p className="betingelser-p">Tipsspillet har til formål at tilbyde folk at få afprøvet deres Oddset evner uden økonomisk risiko. Vi stræber på, at kunden får den sjoveste oplevelse på platformen, og kan have en fed konkurrence med venner og familie.</p>
                    </div>
                </div>
                <div className="betingelser-section">
                    <p className="betingelser-h3">Sektion B - Generelle betingelser</p>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">1 - Ansvarsfraskrivelse</p>
                        <p className="betingelser-p">Vi, Tipsspillet, er ikke ansvarlig for indhold offentliggjort i chat rooms og debatsider samt andre fælles områder. Tipsspillet kan ikke gøres ansvarlig såfremt offentliggjort brugerindhold strider mod nogen tredjeparts rettigheder. Alt sådant indhold uanset om det er ytret som meninger, erklæringer eller anbefalinger er brugernes ytrede synspunkter og ikke Tipsspillets.<br /><br />
                        Dataen, som bliver benyttet på hjemmesiden til at udregne odds, sandsynligheder osv., kommer ikke fra Tipsspillet selv, og der kan derfor forekomme upræcishedder eller manglende data. Derved vil Tipsspillet så vidt muligt forsøge at opretholde hjemmesidens kampe som kan bettes på, men tager sin ret til at fjerne en kamp fra åbne kampe, således kampen ikke kan spilles på.<br /><br />
                        Tipsspillet kan være forbundet med andre internetsider, og fraskriver sig derved ansvar for disse, da Tipsspillet ikke har indflydelse på oplysninger, produkter eller ydelser disse tilbyder.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">2 - Rettigheder til sidens indhold</p>
                        <p className="betingelser-p">Alt materiale, værker eller lignende på hjemmeside er ejet af Tipsspillet, og er beskyttet af love om ophavsret og varemærke. Der må derfor ikke kopieres, udstedes, vidersælges, vidergives, ændre eller lignende i vores materiale, kode, værker eller blogopslag.<br /><br />
                        Hjemmesiden sikrer sig, at du som bruger kun har adgang til at benytte siden, men ikke distribuere den af nogen af ovenstående måder.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">3 - Privatlivspolitik</p>
                        <p className="betingelser-p">Ved brug af Tipsspillet accepterer du privatlivspolikken, og dens bestræbelser. <Link href="/privat">Se privatlivspolitik</Link></p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">4 - Tekniske problemer mm.</p>
                        <p className="betingelser-p">Der kan på hjemmesiden forekomme tekniske problemer, som i visse tilfælde omfatter modtagelse af forkert eller manglende data, som kan medføre forkert behandling af dine væddemål. Forekommer dette, bedes du kontakte på vores kontaktside.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">5 - Lovvalg og værneting</p>
                        <p className="betingelser-p">Disse vilkår og rettigheder reguleres af dansk ret og skal fortolkes i henhold hertil. Hvis det af en domstol med den rette kompetence statueres, at en eller flere af vilkårenes bestemmelser er ugyldige eller uden retskraft, skal den/de fortolkes så tæt på den oprindelige ordlyd som mulig med henblik på at afspejle Tipsspillet intentioner samtidig med, at de øvrige bestemmelser herover bevarer fuld, uændret gyldighed.<br /><br />
                        Hvis Tipsspillet undlader at gøre rettigheder eller bestemmelser i vilkårene gældende, medfører dette ikke et afkald på en sådan rettighed eller bestemmelse, medmindre Tipsspillet har givet skriftlig samtykke hertil.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">6 - Yderligere hjælp</p>
                        <p className="betingelser-p">Mangler du yderligere hjælp, eller skal have svar på et spørgsmål, kan du læse vores FAQ, eller kontakte os direkte på vores kontakt side.</p>
                    </div>
                </div>
                <div className="betingelser-section">
                    <p className="betingelser-h3">Sektion C - Benyttelse af siden</p>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">1 - Konto</p>
                        <p className="betingelser-p">...</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">2 - Tredjepartsoplysninger</p>
                        <p className="betingelser-p">...</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">3 - Præmieturneringer</p>
                        <p className="betingelser-p">...</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">4 - Fejl på data</p>
                        <p className="betingelser-p">...</p>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
 
export default Betingelser;