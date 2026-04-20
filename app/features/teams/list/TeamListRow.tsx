import AccentButton from '@/app/components/buttons/AccentButton';
import { IUserDTO } from '@/app/types/user';

export default function TeamListRow({
    member,
    onRoleChange,
    onRemove
}: {
    member: IUserDTO;
    onRoleChange: (teamMember: {email: string, role: string}) => void;
    onRemove: (email: string) => void;
}) {
    return (
        <div className="grid grid-cols-3 items-center p-3 border-b pr-10 gap-4 border-[var(--table-row-border)] text-[var(--table-text)]">
            <span className="text-sm">{member.email}</span>

            <select
                value={member.role}
                onChange={(e) => onRoleChange({email: member.email, role: e.target.value})}
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

            <AccentButton
                onClick={() => onRemove(member.email)}
                title="Remove"
                className='w-fit'
            />
        </div>
    );
}
