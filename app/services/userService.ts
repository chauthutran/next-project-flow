import { IUser } from './../models/User';
import { JSONObject } from '../lib/definations';
import connectToDatabase from '../lib/dbService/db';
import * as Encrypt from '../lib/dbService/encryptPassword';
import User from '@/app/models/User';
import { setAuthCookie } from '@/app/lib/utils/authUtils';
import { ValidationError } from 'yup';
import { NotFoundError } from './errors';
import { handleError } from './errorUtils';
import { IUserDTO } from '../types/user';

export const DEFAULT_PASSWORD = '1234';

export async function login(
    { email, password }: JSONObject,
    isSetCookie = true
) {
    if (!email || !password) {
        throw new ValidationError('Email/password is missing');
    }

    try {
        await connectToDatabase();
        const user = await User.findOne({ email }).populate(
            'teamMembers',
            '_id email role'
        );
        if (!user) {
            throw new NotFoundError('Invalid email or password');
        }

        // Compare password securely
        const isMatch = await Encrypt.comparePassword(password, user.password);
        if (!isMatch) {
            throw new NotFoundError('Invalid email or password');
        }
        // const teamMembers = await User.find({
        //     email: { $in: user.teamMembers }
        // })
        // .select('_id email role')
        // .lean();
        const userDTO = {
            _id: user._id,
            email: user.email,
            role: user.role,
            teamMembers: user.teamMembers || []
        };

        // Generate token on login
        if (isSetCookie) {
            await setAuthCookie({
                id: userDTO._id!.toString(),
                email: userDTO.email,
                role: userDTO.role
            });
        }

        // user.toJSON() ==> need to do it so that I can avoid the issue "Warning: Only plain objects can be passed to Client Components from Server Components"
        return userDTO;
    } catch (error: any) {
        handleError(error);
    }
}

export async function register(userData: JSONObject) {
    try {
        await connectToDatabase();

        const password = userData.password;
        userData.password = await Encrypt.hashPassword(password);

        const newUser = await User.create(userData);
        return newUser.toJSON();
    } catch (error: any) {
        handleError(error);
        throw error; // re-throw the error after handling it, so that the caller can also catch it if needed
    }
}
export async function changePassword({
    email,
    oldPassword,
    newPassword
}: {
    email: string;
    oldPassword: string;
    newPassword: string;
}) {
    try {
        // Check the username and oldPassword
        await login({ email, password: oldPassword }, false); // validate old password
        
        // If valid, hash the new password and update in DB
        await connectToDatabase();
        const hashedPassword = await Encrypt.hashPassword(newPassword);
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { password: hashedPassword } },
            { new: true }
        );
        return updatedUser;
    } catch (error: any) {
        handleError(error);
        throw error;
    }
}

export async function updateTeamMember({
    teamMembers,
    managerEmail
}: {
    teamMembers: { email: string; role: string }[];
    managerEmail: string;
}) {
    // 1. Ensure all users exist + roles updated
    for (let member of teamMembers) {
        let existingUser = await User.findOne({ email: member.email });

        if (!existingUser) {
            const userData: IUserDTO = {
                ...member,
                password: DEFAULT_PASSWORD,
                teamMembers: []
            };

            const newUser = await register(userData);
            existingUser = newUser; // use created user
        } else if (existingUser.role !== member.role) {
            existingUser = await updateUserRole({
                email: member.email,
                role: member.role
            });
        }
    }

    // 2. Get ALL team member IDs
    const users = await User.find({
        email: { $in: teamMembers.map((m) => m.email) }
    }).select('_id email');

    const memberIds = users
        .filter((u) => u.email !== managerEmail)
        .map((u) => u._id);

    // 3. Update manager with ObjectIds (NOT emails)
    const updatedManager = await User.findOneAndUpdate(
        { email: managerEmail },
        {
            $set: {
                teamMembers: memberIds
            }
        },
        { new: true }
    )
        .populate('teamMembers', 'email role') // 👈 now this will work
        .select('-password')
        .lean();

    return updatedManager;
}

const updateUserRole = async ({
    email,
    role
}: {
    email: string;
    role: string;
}) => {
    return await User.findOneAndUpdate(
        { email },
        { $set: { role } },
        { new: true }
    );
};
