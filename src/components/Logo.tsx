export default function Logo({ size = 38, light = false }: { size?: number; light?: boolean }) {
  const stroke = light ? '#FAF7F2' : '#1B4332';
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="4.5" stroke={stroke} strokeWidth="1.5" />
      <path d="M20 10 L27.5 29 H24.4 L20 16.8 L15.6 29 H12.5 Z" fill={stroke} />
      <path d="M15.4 24.4 H24.6" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" />
      <path d="M10 29.6 C13 25.6 15.8 24 20 24 C24.2 24 27 25.6 30 29.6" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}
