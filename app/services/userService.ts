import { JSONObject } from '../lib/definations';
import connectToDatabase from '../lib/dbService/db';
import * as Encrypt from '../lib/dbService/encryptPassword';
import User from '@/app/models/User';
import { setAuthCookie } from '@/app/lib/utils/authUtils';
import { ValidationError } from 'yup';
import { NotFoundError } from './errors';
import { handleError } from './errorUtils';

export async function login({ email, password }: JSONObject) {
    if (!email || !password) {
        throw new ValidationError('Email/password is missing');
    }

    try {
        await connectToDatabase();
        const user = await User.findOne({ email });
        if (!user) {
            throw new NotFoundError('Invalid email or password');
        }

        // Compare password securely
        const isMatch = await Encrypt.comparePassword(password, user.password);
        if (!isMatch) {
            throw new NotFoundError('Invalid email or password');
        }

        // Generate token on login
        await setAuthCookie({
            id: user._id!.toString(),
            email: user.email,
            role: user.role
        });

        // user.toJSON() ==> need to do it so that I can avoid the issue "Warning: Only plain objects can be passed to Client Components from Server Components"
        return user.toJSON();
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
    }
}

// export async function linkTeamMembers() {
//     try {
//         await connectToDatabase();

//         // Find all users with the "team_member" role
//         const teamMembers = await User.find({ role: 'team_member' });

//         // Iterate over each team member and link them to other team members
//         for (let user of teamMembers) {
//             user.teamMembers = teamMembers
//                 .filter(member => member._id.toString() !== user._id.toString()) // Exclude the user from their own teamMembers array
//                 .map(member => member._id); // Map to ObjectId

//             await user.save();
//         }

//         console.log('Team members linked successfully.');
//     } catch (error) {
//         console.error('Error linking team members:', error);
//     }
// }
