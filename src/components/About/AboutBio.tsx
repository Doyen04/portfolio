export default function AboutBio({ bio }: { bio: string[] }) {
    return (
        <>
            {bio.map((paragraph, i) => (
                <p key={i} className="text-[15px] font-light leading-[1.85] text-(--muted)" style={{ fontFamily: 'var(--sans)' }}>
                    {paragraph}
                </p>
            ))}
        </>
    );
}