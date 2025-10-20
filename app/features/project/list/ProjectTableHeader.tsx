export default function ProjectTableHeader() {
    return (
        <thead className="sticky top-0 z-10 bg-[var(--primary)] text-[var(--primary-text)]">
            <tr className="whitespace-nowrap">
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Project Name</th>
                <th className="px-4 py-2 text-left">Team</th>
                <th className="px-4 py-2 text-left">Actions</th>
            </tr>
        </thead>
    );
}
