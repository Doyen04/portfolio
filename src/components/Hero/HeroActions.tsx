export default function HeroActions({ cvUrl }: { cvUrl: string }) {
    return (
        <>
            <a href="#work" className="btn-fill w-full sm:w-auto justify-center text-center">
                View My Work
                <span>→</span>
            </a>
            <a href={cvUrl || '/ademola%20oluwasola%20resume.pdf'} target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto justify-center text-center">
                Download CV
            </a>
        </>
    );
}
