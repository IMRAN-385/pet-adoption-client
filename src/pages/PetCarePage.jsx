const NutritionIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);
const ExerciseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const VaccineIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/>
  </svg>
);
const GroomingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>
  </svg>
);
const DentalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5.5c-1.5-2-4-2.5-5.5-1C4 6 4 9 6 11l6 8 6-8c2-2 2-5-.5-6.5-1.5-1-4-.5-5.5 1z"/>
  </svg>
);
const MentalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z"/>
  </svg>
);
const VetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);
const MicrochipIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 14H7a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2h2"/><path d="M15 10h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2"/><path d="M10 9V7a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v2"/><path d="M14 15v2a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v-2"/><path d="M3 9h2"/><path d="M3 15h2"/><path d="M19 9h2"/><path d="M19 15h2"/><path d="M9 3v2"/><path d="M15 3v2"/><path d="M9 19v2"/><path d="M15 19v2"/>
  </svg>
);

const tips = [
  { Icon: NutritionIcon, title: 'Balanced nutrition',   text: 'Feed your pet a vet-approved diet appropriate for their species, age, and health. Fresh water should always be available.' },
  { Icon: ExerciseIcon,  title: 'Regular exercise',     text: 'Dogs need daily walks and playtime. Cats benefit from interactive toys. Exercise prevents obesity and behavioral issues.' },
  { Icon: VaccineIcon,   title: 'Vaccination schedule', text: 'Keep vaccinations up to date to protect against preventable diseases. Schedule annual vet check-ups regularly.' },
  { Icon: GroomingIcon,  title: 'Grooming',             text: 'Regular brushing, nail trimming, and bathing keep your pet healthy and comfortable. Long-haired breeds need more frequent grooming.' },
  { Icon: DentalIcon,    title: 'Dental care',          text: "Brush your pet's teeth regularly or provide dental chews. Dental disease affects over 80% of pets by age 3." },
  { Icon: MentalIcon,    title: 'Mental stimulation',   text: 'Provide toys, puzzles, and social interaction. A mentally stimulated pet is a happy, well-behaved pet.' },
  { Icon: VetIcon,       title: 'Regular vet visits',   text: "Don't wait until your pet is sick. Preventive care catches issues early and saves money in the long run." },
  { Icon: MicrochipIcon, title: 'Microchip & ID tags',  text: 'Microchip your pet and keep ID tags updated. This dramatically increases reunion chances if they get lost.' },
];

import { useState } from 'react';

const TipCard = ({ Icon, title, text, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`animate-fadeInUp delay-${(index % 6) + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--primary)' : 'var(--surface)',
        borderRadius: 12,
        border: `1px solid ${hovered ? 'var(--primary)' : 'var(--border)'}`,
        padding: 24,
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 32px rgba(232,97,42,0.25)' : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: hovered ? 'rgba(255,255,255,0.2)' : 'var(--primary-light)',
        color: hovered ? '#fff' : 'var(--primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16,
        transition: 'all 0.25s ease',
      }}>
        <Icon />
      </div>
      <h4 style={{
        fontSize: 15, fontWeight: 700,
        color: hovered ? '#fff' : 'var(--text)',
        marginBottom: 8,
        transition: 'color 0.25s ease',
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: 13,
        color: hovered ? 'rgba(255,255,255,0.85)' : 'var(--text2)',
        lineHeight: 1.7,
        transition: 'color 0.25s ease',
      }}>
        {text}
      </p>
    </div>
  );
};

const PetCarePage = () => (
  <div className="page-enter" style={{ padding: '56px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
    <div style={{ marginBottom: 48 }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: 10, textTransform: 'uppercase' }}>
        Guide
      </p>
      <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginBottom: 12 }}>
        Pet care tips
      </h2>
      <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 480 }}>
        Expert advice to help your companion thrive in their forever home.
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
      {tips.map(({ Icon, title, text }, i) => (
        <TipCard key={title} Icon={Icon} title={title} text={text} index={i} />
      ))}
    </div>
  </div>
);

export default PetCarePage;