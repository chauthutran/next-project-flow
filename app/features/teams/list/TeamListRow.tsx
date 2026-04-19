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
        <div className="grid grid-cols-3 items-center p-3 border-b pr-10 gap-4">
            <span className="text-sm">{member.email}</span>

            <select
                value={member.role}
                onChange={(e) => onRoleChange({email: member.email, role: e.target.value})}
                className="border rounded px-2 py-1 text-sm"
            >
                <option value="project_manager">Project Manager</option>
                <option value="team_member">Team Member</option>
                <option value="viewer">Viewer</option>
            </select>

            <AccentButton
                onClick={() => onRemove(member.email)}
                title="Remove"
                className='w-fit'
            />
        </div>
    );
}
