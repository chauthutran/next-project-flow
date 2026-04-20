import useAuth from '@/app/hooks/useAuth';
import { IUserDTO } from '@/app/types/user';
import TeamList from './list/TeamList';
import PageTitle from '@/app/components/PageTitle';
import { useState } from 'react';
import { GiTeamIdea } from 'react-icons/gi';
import TeamForm from './form/TeamForm';
import PrimaryButton from '@/app/components/buttons/PrimaryButton';

export default function TeamPage() {
    const { user, updateTeamMembers } = useAuth();
    const [teamMembers, setTeamMembers] = useState<IUserDTO[]>(
        user?.teamMembers || []
    );
    const [isDirty, setIsDirty] = useState(false);

    const handleOnAddMember = (newMember: { email: string; role: string }) => {
        const _teamMembers = [...teamMembers];
        _teamMembers.push({ ...newMember, teamMembers: [] });
        setTeamMembers(_teamMembers);
        setIsDirty(true);
    };

    const itemRoleOnChange = (teamMember: { email: string; role: string }) => {
        setTeamMembers((prev) =>
            prev.map((member) =>
                member.email === teamMember.email
                    ? { ...member, role: teamMember.role }
                    : member
            )
        );
        setIsDirty(true);
    };

    const itemOnRemove = (email: string) => {
        setTeamMembers((prev) => prev.filter((m) => m.email !== email));
        setIsDirty(true);
    };

    const updateList = () => {
        console.log('Updating team members with:', teamMembers);
        updateTeamMembers(teamMembers);
        setIsDirty(false);
    };

    return (
        <div className="p-6">
            <PageTitle
                title="Team Management"
                subtitle="Manage your team members, assign roles, and control access to your projects."
                icon={<GiTeamIdea />}
            />
            <div className="flex flex-col gap-4 bg-[var(--card)] p-4 border border-[var(--card-border)]">
                <TeamForm onAdd={handleOnAddMember} />

                <TeamList
                    teamMembers={teamMembers}
                    itemRoleOnChange={itemRoleOnChange}
                    itemOnRemove={itemOnRemove}
                />

                <PrimaryButton
                    disabled={!isDirty}
                    title="Save Changes"
                    onClick={updateList}
                    className="width-fit self-baseline"
                />
            </div>
        </div>
    );
}
