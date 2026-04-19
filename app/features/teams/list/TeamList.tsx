import useAuth from '@/app/hooks/useAuth';
import { IUserDTO } from '@/app/types/user';
import TeamListRow from './TeamListRow';

export default function TeamList({
    teamMembers,
    itemRoleOnChange,
    itemOnRemove
}: {
    teamMembers: IUserDTO[];
    itemRoleOnChange: (teamMember: { email: string; role: string }) => void;
    itemOnRemove: (email: string) => void;
}) {
    return (
        <>
            {teamMembers.length === 0 && (
                <p className="text-[var(--feature-info-sub-text)]">You have no team members yet.</p>
            )}

            {teamMembers.length > 0 && (
                <div className="border rounded">
                    <div className="grid grid-cols-3 font-medium text-sm bg-gray-50 px-3 py-2">
                        <span>Email</span>
                        <span>Role</span>
                        <span>Actions</span>
                    </div>

                    {teamMembers.map((member) => (
                        <TeamListRow
                            key={member.email}
                            member={member}
                            onRoleChange={itemRoleOnChange}
                            onRemove={itemOnRemove}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
