export default function Hero({ partnerOne, partnerTwo, dateLabel, message }) {
  return (
    <header className="hero">
      <p className="eyebrow">Save the date</p>
      <h1 className="names">
        {partnerOne} <span className="amp">&amp;</span> {partnerTwo}
      </h1>
      <p className="date">{dateLabel}</p>
      <p className="message">{message}</p>
    </header>
  )
}
