import { Skill } from "@/models/skill";
import { connect } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect()
        const skills = await Skill.find({})
        return NextResponse.json({
            message: 'success',
            skills
        })
    } catch (error) {
        return NextResponse.json({
            message: 'error'
        })
    }

}