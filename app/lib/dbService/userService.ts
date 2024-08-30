'use server';

import mongoose from "mongoose";
import Project from "../schemas/Project.schema";
import { JSONObject } from "../definations";
import connectToDatabase from "./db";
import Metting from "../schemas/Meeting.schema";
import Milestone from "../schemas/Milestone.schema";
import Task from "../schemas/Task.schema";
import User from "../schemas/User.schema";
import * as Encrypt from "./encryptPassword";

export async function login({email, password}: JSONObject): Promise<JSONObject> {

	try {
		console.log("========= login ");
		await connectToDatabase();
		console.log(" --- connected DB ");
		const searchResult = await User.find({ email });
		console.log("searchResult", searchResult);

		// Find the users with the password if there is password in parametters
		let matchedUser: Document | null = null;
		for (let i = 0; i < searchResult.length; i++) {
			const user = searchResult[i];
			const matched = await Encrypt.comparePassword(password!, user.password);
			if (matched) {
				matchedUser = user;
				break;
			}
		}

		if ( matchedUser === null ) {
			return ({status: "fail", message: "Username/Password is wrong"});
		 }
		 
		 return ({status: "success", data: matchedUser});
	} catch (error: any) {
		return ({status: "error", message: error.message});
	}
}

export async function register(userData: JSONObject): Promise<JSONObject> {
	
	try {
		await connectToDatabase();

		const password = userData.password;
		userData.password = await Encrypt.hashPassword(password);

		const newUser = await User.create(userData);
		return ({status: "succcess", data: newUser});

	} catch (error: any) {
		return ({status: "error", message: error.message});
		// if (error instanceof mongoose.Error.ValidationError) {
        //     return({status: "error",error: 'Validation Error:' + error.message});
        // } else if (error instanceof mongoose.Error.CastError) {
        //     return({error: 'Cast Error:' + error.message});
        // } else if (error.code === 11000) {  // Duplicate key error code
        //     return({error: 'Duplicate Key Error:' + error.message});
        // } else {
        //     return({error: 'UnknownError:' + error.message});
        // }
	}
}
