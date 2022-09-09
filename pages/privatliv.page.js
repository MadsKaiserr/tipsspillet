import * as React from 'react';
import { useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Header from './layout/header';
 
function Privat () {

    return (
        <>
            <Head>
                <title>Privatlivspolitik - Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/privatliv" />
                <meta name="description" content="Følgende politik er gældende i forbindelse med anvendelsen af internetsiden. Ved at gå ind på denne internetside anerkender og tiltræder du følgende privatlivspolitik. Såfremt du ikke kan acceptere disse vilkår, skal du ikke benytte denne internetside" />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet privatliv,privatlivspolitik,privatlivsbetingelser,privatlivs betingelser,privatlivs politik,betingelser" />
                <meta itemProp="name" content="Tipsspillet Privatlivspolitik" />
                <meta itemProp="description" content="Følgende politik er gældende i forbindelse med anvendelsen af internetsiden. Ved at gå ind på denne internetside anerkender og tiltræder du følgende privatlivspolitik. Såfremt du ikke kan acceptere disse vilkår, skal du ikke benytte denne internetside" />
                <meta property="og:title" content="Privatlivspolitik - Tipsspillet" />
                <meta property="og:description" content="Følgende politik er gældende i forbindelse med anvendelsen af internetsiden. Ved at gå ind på denne internetside anerkender og tiltræder du følgende privatlivspolitik. Såfremt du ikke kan acceptere disse vilkår, skal du ikke benytte denne internetside" />
            </Head>
            <Header />
            <div className="stage-main-container">
                <div className="betingelser-container">
                <h1 className="betingelser-h1">Tipsspillet Privatlivspolitik</h1>
                <p className="betingelser-h2">Sidst opdateret 24. maj, 2022</p>
                <p className="betingelser-p">Velkommen til Tipsspillet</p>
                <p className="betingelser-p">Følgende politik er gældende i forbindelse med anvendelsen af internetsiden. Ved at gå ind på denne internetside anerkender og tiltræder du følgende privatlivspolitik. Såfremt du ikke kan acceptere disse vilkår, skal du ikke benytte denne internetside</p>
                <div className="betingelser-section">
                    <p className="betingelser-h3">Sektion A - Cookie og privatliv</p>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">1 - Introduktion</p>
                        <p className="betingelser-p">Når du besøger vores website indsamles der oplysninger om dig, som bruges til at tilpasse og forbedre vores indhold og til at øge værdien af de annoncer, der vises på siden. Hvis du ikke ønsker, at der indsamles oplysninger, bør du slette dine cookies (se vejledning) og undlade videre brug af websitet. Nedenfor har vi uddybet, hvilke informationer der indsamles, deres formål og hvilke tredjeparter, der har adgang til dem.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">2 - Cookies</p>
                        <p className="betingelser-p">Websitet anvender &quot;cookies&quot;, der er en tekstfil, som gemmes på din computer, mobil el. tilsvarende med det formål at genkende den, huske indstillinger, udføre statistik og målrette annoncer. Cookies kan ikke indeholde skadelig kode som f.eks. virus.<br /><br />
                        Det er muligt at slette eller blokere for cookies. Se vejledning: http://minecookies.org/cookiehandtering<br /><br />
                        Hvis du sletter eller blokerer cookies vil annoncer kunne blive mindre relevante for dig og optræde hyppigere. Du kan desuden risikere at websitet ikke fungerer optimalt samt at der er indhold, du ikke kan få adgang til.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">3 - Generelt</p>
                        <p className="betingelser-p">Personoplysninger er alle slags informationer, der i et eller andet omfang kan henføres til dig. Når du benytter vores website indsamler og behandler vi en række sådanne informationer. Det sker f.eks. ved alm. tilgang af indhold, hvis du tilmelder dig vores nyhedsbrev, deltager i konkurrencer eller undersøgelser, registrerer dig som bruger eller abonnent, øvrig brug af services eller foretager køb via websitet.<br /><br />
Vi indsamler og behandler typisk følgende typer af oplysninger: Et unikt ID og tekniske oplysninger om din computer, tablet eller mobiltelefon, dit IP-nummer, geografisk placering, samt hvilke sider du klikker på (interesser). I det omfang du selv giver eksplicit samtykke hertil og selv indtaster informationerne behandles desuden: Navn, telefonnummer, e-mail, adresse og betalingsoplysninger. Det vil typisk være i forbindelse med oprettelse af login eller ved køb.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">4 - Sikkerhed</p>
                        <p className="betingelser-p">Vi behandler dine personoplysninger sikkert og fortroligt i overensstemmelse med gældende lovgivning, herunder persondataforordningen og databeskyttelsesloven.<br /><br />
Dine oplysninger vil alene blive anvendt til det formål, de er indsamlet til, og vil blive slettet, når dette formål er opfyldt eller ikke længere relevant.<br /><br />
Vi har truffet tekniske og organisatoriske foranstaltninger mod, at dine oplysninger hændeligt eller ulovligt bliver slettet, offentliggjort, fortabt, forringet eller kommer til uvedkommendes kendskab, misbruges eller i øvrigt behandles i strid med lovgivningen.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">5 - Formål</p>
                        <p className="betingelser-p">Oplysningerne bruges til at identificere dig som bruger og vise dig de annoncer, som vil have størst sandsynlighed for at være relevante for dig, at registrere dine køb og betalinger, samt at kunne levere de services, du har efterspurgt, som f.eks. at fremsende et nyhedsbrev. Herudover anvender vi oplysningerne til at optimere vores services og indhold.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">6 - Periode for opbevaring</p>
                        <p className="betingelser-p">Oplysningerne opbevares i det tidsrum, der er tilladt i henhold til lovgivningen, og vi sletter dem, når de ikke længere er nødvendige. Perioden afhænger af karakteren af oplysningen og baggrunden for opbevaring. Det er derfor ikke muligt at angive en generel tidsramme for, hvornår informationer slettes.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">7 - Vidergivelse af oplysninger</p>
                        <p className="betingelser-p">Data om din brug af websitet, hvilke annoncer, du modtager og evt. klikker på, geografisk placering, køn og alderssegment m.v. videregives til tredjeparter i det omfang disse oplysninger er kendt. Du kan se hvilke tredjeparter, der er tale om, i afsnittet om &quot;Cookies&quot; ovenfor. Oplysningerne anvendes til målretning af annoncering.<br /><br />
Vi benytter herudover en række tredjeparter til opbevaring og behandling af data. Disse behandler udelukkende oplysninger på vores vegne og må ikke anvende dem til egne formål.<br /><br />
Videregivelse af personoplysninger som navn og e-mail m.v. vil kun ske, hvis du giver samtykke til det. Vi anvender kun databehandlere i EU eller i lande, der kan give dine oplysninger en tilstrækkelig beskyttelse.</p>
                    </div>
                    <div className="betingelser-element">
                        <p className="betingelser-h4">8 - Indsigt og klager</p>
                        <p className="betingelser-p">Du har ret til at få oplyst, hvilke personoplysninger, vi behandler om dig i et almindeligt format (dataportabilitet). Du kan desuden til enhver tid gøre indsigelse mod, at oplysninger anvendes. Du kan også tilbagekalde dit samtykke til, at der bliver behandlet oplysninger om dig. Hvis de oplysninger, der behandles om dig, er forkerte har du ret til at de bliver rettet eller slettet. Henvendelse herom kan ske til: madskaiser@tipsspillet.dk. Hvis du vil klage over vores behandling af dine personoplysninger, har du også mulighed for at tage kontakt til Datatilsynet.<br /><br />
Ønsker du ikke længere, at vi skal behandle dine personoplysninger, eller at vi skal begrænse behandlingen af dine personoplysninger, kan du også sende os en anmodning herom til ovennævnte e-mailadresse.</p>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
 
export default Privat;