const MESSAGES = [
  "Free shipping on every order",
  "Easy returns & refunds",
  "Delivery in 4–8 working days",
  "New arrivals every week",
];

export default function Marquee() {
  const track = [...MESSAGES, ...MESSAGES];
  return (
    <div className="w-full overflow-hidden bg-navy text-cream text-xs tracking-wide py-2">
      <div className="flex w-max animate-marquee gap-10">
        {track.map((msg, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            {msg}
            <span className="text-gold">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
