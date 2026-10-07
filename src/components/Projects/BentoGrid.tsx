import BentoTile from './BentoTile';
import { bentoSpans } from './bentoLayout';
import type { Project } from '@/types/content';

type Props = {
    projects: Project[];
    numberFor: (project: Project) => string;
};

export default function BentoGrid({ projects, numberFor }: Props) {
    const spans = bentoSpans(projects.length);

    return (
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-6">
            {projects.map((project, index) => (
                <BentoTile
                    key={project.id}
                    project={project}
                    number={numberFor(project)}
                    span={spans[index] ?? { col: 6 }}
                />
            ))}
        </div>
    );
}
