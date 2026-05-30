type Props = {
    number: string;
    label: string;
};

export default function SectionTag({ number, label }: Props) {
    return (
        <div className="section-tag">
            <span className="section-tag__number">{number}</span>
            <span className="section-tag__label">{label}</span>
        </div>
    );
}
