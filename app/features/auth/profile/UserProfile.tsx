import useAuth from '@/hooks/useAuth';

export default function UserProfile() {
    const { user } = useAuth();

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                {/* <img
          src={user.avatarUrl || '/default-avatar.png'}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
        /> */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {user!.email || 'No Name'}
                    </h2>
                    <p className="text-gray-600 capitalize">{user!.role}</p>
                </div>
            </div>

            {/* Contact Info */}
            {/* <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-gray-700">Email</h3>
          <p className="text-gray-600">{user!.email}</p>
        </div>
        {user.phone && (
          <div>
            <h3 className="font-semibold text-gray-700">Phone</h3>
            <p className="text-gray-600">{user!.phone}</p>
          </div>
        )}
        {user.department && (
          <div>
            <h3 className="font-semibold text-gray-700">Department</h3>
            <p className="text-gray-600">{user!.department}</p>
          </div>
        )}
      </div> */}

            {/* Bio */}
            {/* {user.bio && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Bio</h3>
          <p className="text-gray-600">{user.bio}</p>
        </div>
      )} */}

            {/* Preferences */}
            {/* {user.preferences && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Preferences</h3>
          <div className="flex space-x-4">
            <div>
              <span className="font-medium text-gray-600">Theme:</span>{' '}
              <span className="text-gray-800">{user.preferences.theme}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Notifications:</span>{' '}
              <span className="text-gray-800">
                {user.preferences.notifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      )} */}

            {/* Team Members */}
            {user!.teamMembers && user!.teamMembers.length > 0 && (
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                        Team Members
                    </h3>
                    <div className="flex -space-x-3">
                        {user!.teamMembers.map((member, idx) => (
                            <p key={idx}>{member}</p>
                            //   <img
                            //     key={idx}
                            //     src={member.avatarUrl || '/default-avatar.png'}
                            //     alt={member.name}
                            //     title={member.name}
                            //     className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                            //   />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
