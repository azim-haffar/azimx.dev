import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.intro}>
        <p>Software engineering · Mersin, Türkiye</p>
        <h1 id="hero-title">Azim Haffar</h1>
        <h2>Backend systems and applied AI.</h2>
        <p>I built a coupon tracker at Trendyol and a Python study tool for Kvote.
          I’m looking for a 4–12 month internship starting 17 January 2027.</p>
        <nav aria-label="Explore my work"><Link href="#projects">Selected work ↓</Link>
          <a href="/Azim_Haffar_CV.pdf">View résumé ↗</a></nav>
      </div>
      <Link href="/projects/seatledger" className={styles.feature}>
        <Image src="/images/reservation-flow.png" alt="A temporary reservation hold can be confirmed or expire." width={800} height={520} priority />
        <span>SeatLedger · Who gets the last seat? ↗</span>
      </Link>
    </section>
  );
}
