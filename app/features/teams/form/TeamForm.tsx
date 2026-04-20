import PrimaryButton from '@/app/components/buttons/PrimaryButton';
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
                className="flex-1 border rounded px-3 py-2 text-sm bg-[var(--input-bg)] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]"
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border rounded px-2 py-2 text-sm bg-[var(--select-menu-bg)]"
            >
                <option value="project_manager" className="bg-[var(--select-option-bg)] text-[var(--select-option-text)] hover:bg-[var(--select-option-hover-bg)] hover:text-[var(--select-option-hover-text)]">
                    Project Manager
                </option>
                <option value="team_member" className="bg-[var(--select-option-bg)] text-[var(--select-option-text)] hover:bg-[var(--select-option-hover-bg)] hover:text-[var(--select-option-hover-text)]">
                    Team Member
                </option>
                <option value="viewer" className="bg-[var(--select-option-bg)] text-[var(--select-option-text)] hover:bg-[var(--select-option-hover-bg)] hover:text-[var(--select-option-hover-text)]">
                    Viewer
                </option>
            </select>

            <PrimaryButton
                onClick={() => {
                    validateAndAddTeam();
                }}
                disabled={!email}
                title="Add"
                className='disabled:bg-[var(--btn-disabled-bg)] disabled:border-[var(--btn-disabled-border)]'
            />
        </div>
    );
}
