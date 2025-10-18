import { useProjects } from "@/hooks/useProjects";

export default function ProjectHeader() {
    const { selectedProject } = useProjects();
    
    return (
        <div>Project header</div>
    )
}