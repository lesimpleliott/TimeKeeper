import Task from "@/models/Task";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

// Fonction POST pour créer une nouvelle tâche
export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newTask = new Task(data);
    await newTask.save();
    return NextResponse.json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { success: false, message: "Error creating task", error },
      { status: 500 }
    );
  }
}

// Fonction GET pour récupérer toutes les tâches
export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find({});
    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching tasks", error },
      { status: 500 }
    );
  }
}
