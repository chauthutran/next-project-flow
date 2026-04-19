import useAuth from '@/app/hooks/useAuth';
import { getAvatarColor } from '@/app/lib/utils/colorUtil';
import { RiTeamLine } from 'react-icons/ri';

export default function UserProfile() {
    const { user } = useAuth();
    
    return (
        <div className="max-w-3xl mx-auto bg-[var(--bg)] shadow-lg rounded-2xl p-6 space-y-6 mt-5">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-[var(--primary-text)] flex items-center justify-center font-semibold cursor-pointer">
                    {user!.email.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-[var(--feature-info-text)]">
                        {user!.email || 'No Name'}
                    </h2>
                    <p className="text-[var(--feature-info-text)] capitalize">{user!.role.replace('_', ' ')}</p>
                </div>
            </div>
			
            {/* Team Members */}
            {user!.teamMembers && user!.teamMembers.length > 0 && (
                <div>
                    <h3 className="flex items-center space-x-2 font-semibold text-[var(--feature-info-text)] mb-2">
                        <RiTeamLine />
                        <span>Team Members</span>
                    </h3>
                    <div className="flex flex-col space-y-2">
                        {user!.teamMembers.map((member, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 rounded-xl border border-[var(--table-row-border)] hover:bg-[var(--table-row-bg)] transition"
                            >
                                {/* Left: Avatar + Info */}
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center text-sm font-medium"
                                        style={{ backgroundColor: getAvatarColor(member.email).bg, color: getAvatarColor(member.email).text }}
                                    >
                                        {member.email.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-[var(--feature-info-text)]">
                                            {member.email}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Role */}
                                <span className="text-xs px-2 py-1 rounded-md bg-[var(--primary)] text-[var(--primary-text)] capitalize">
                                    {member.role.replace('_', ' ')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
