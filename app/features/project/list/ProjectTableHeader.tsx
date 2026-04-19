export default function ProjectTableHeader() {
    return (
        <thead className="sticky top-0 z-10 bg-[var(--table-header-bg)] text-[var(--table-header-text)] border-b border-[var(--table-header-border)]">
            <tr className="whitespace-nowrap">
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Project Name</th>
                <th className="px-4 py-2 text-left font-semibold">Team</th>
                <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
        </thead>
    );
}
