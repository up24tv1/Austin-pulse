export default function Page() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem", lineHeight: 1.5 }}>
      <h1>Turn missed HVAC calls into booked jobs.</h1>
      <p>
        CallForge helps owner-led HVAC teams recover missed and after-hours calls with fast voice intake,
        text-back follow-up, and immediate owner alerts.
      </p>

      <section>
        <h2>How it works</h2>
        <ol>
          <li>Caller reaches your line or fallback workflow.</li>
          <li>CallForge captures name, issue, zip, and urgency.</li>
          <li>Your team receives an instant lead summary and can call back quickly.</li>
        </ol>
      </section>

      <section>
        <h2>14-day pilot</h2>
        <p>$350 pilot • voice intake • missed-call text-back • owner alerts • lead log</p>
        <a href="mailto:hello@callforge.ai?subject=CallForge%20Pilot">Book a pilot demo</a>
      </section>
    </main>
  );
}
