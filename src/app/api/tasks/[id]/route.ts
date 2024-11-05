import Task from "@/models/Task";
import { TaskType } from "@/types/task";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

// Fonction GET pour récupérer une tâche par ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const task = (await Task.findById(params.id).lean()) as TaskType | null;

    if (!task) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 },
      );
    }

    // Reconstruction de l'objet pour que `id` soit la première propriété
    const { _id, ...taskData } = task;
    const taskWithIdFirst = { id: _id.toString(), ...taskData };

    return NextResponse.json({
      success: true,
      task: taskWithIdFirst,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching task", error },
      { status: 500 },
    );
  }
}

// Fonction PUT pour mettre à jour une tâche par ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const data = await req.json();
    const updatedTask = (await Task.findByIdAndUpdate(params.id, data, {
      new: true,
    }).lean()) as TaskType | null;

    if (!updatedTask) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 },
      );
    }

    // Reconstruction de l'objet pour que `id` soit la première propriété
    const { _id, ...taskData } = updatedTask;
    const taskWithIdFirst = { id: _id.toString(), ...taskData };

    return NextResponse.json({
      success: true,
      message: "Task updated successfully",
      task: taskWithIdFirst,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { success: false, message: "Error updating task", error },
      { status: 500 },
    );
  }
}

// Fonction DELETE pour supprimer une tâche par ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const deletedTask = await Task.findByIdAndDelete(params.id);

    if (!deletedTask) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting task", error },
      { status: 500 },
    );
  }
}
