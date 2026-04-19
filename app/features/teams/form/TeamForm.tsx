import { useState } from 'react';

export default function TeamForm({
    onAdd
}: {
    onAdd: (teamMember: {email: string, role: string}) => void;
}) {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<string>('team_member');

    const validateAndAddTeam = () => {
        if (!email) return;
        onAdd({ email, role });
        setEmail('');
    };
    
    return (
        <div className="flex gap-2 mb-6">
            <input
                type="email"
                placeholder="Search or enter new email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm"
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border rounded px-2 py-2 text-sm"
            >
                <option value="project_manager">Project Manager</option>
                <option value="team_member">Team Member</option>
                <option value="viewer">Viewer</option>
            </select>

            <button
                onClick={() => {
                    validateAndAddTeam();
                }}
                disabled={!email}
                className="bg-[var(--primary)] text-[var(--primary-text)] px-4 rounded text-sm"
            >
                Add
            </button>
        </div>
    );
}
