import Task from "@/models/Task";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

// Fonction POST pour créer une nouvelle tâche
export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newTask = await Task.create(data);

    return NextResponse.json({
      success: true,
      message: "Task created successfully",
      task: newTask.toJSON(), // Transformation automatique
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { success: false, message: "Error creating task", error },
      { status: 500 },
    );
  }
}

// Fonction GET pour récupérer toutes les tâches
export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find({}).lean(); // `.lean()` pour convertir directement en objet JS

    return NextResponse.json({
      success: true,
      tasks: tasks.map((task) => ({
        id: task._id, // Ajout de `id`
        ...task,
        _id: undefined, // Suppression de `_id`
        __v: undefined, // Suppression de `__v`
      })),
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching tasks", error },
      { status: 500 },
    );
  }
}
