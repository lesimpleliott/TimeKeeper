import { NextResponse } from 'next/server'; // Importation de NextResponse pour gérer les réponses HTTP
import dbConnect from '@/utils/dbConnect'; // Importation de la fonction de connexion à la base de données
import Task from '@/models/Task'; // Importation du modèle Task

// Fonction GET pour récupérer une tâche par ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect(); // Connexion à la base de données
    const { id } = params; // Extraction de l'ID des paramètres
    const task = await Task.findById(id); // Recherche de la tâche par ID
    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 }); // Tâche non trouvée
    }
    return NextResponse.json({ success: true, task }); // Tâche trouvée, réponse avec les détails de la tâche
  } catch (error) {
    console.error('Error fetching task:', error); // Log de l'erreur
    return NextResponse.json({ success: false, message: 'Error fetching task', error }, { status: 500 }); // Réponse en cas d'erreur
  }
}

// Fonction PUT pour mettre à jour une tâche par ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect(); // Connexion à la base de données
    const { id } = params; // Extraction de l'ID des paramètres
    const data = await req.json(); // Extraction des données de la requête
    const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true }); // Mise à jour de la tâche
    if (!updatedTask) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 }); // Tâche non trouvée
    }
    return NextResponse.json({ success: true, message: 'Task updated successfully', task: updatedTask }); // Tâche mise à jour avec succès
  } catch (error) {
    console.error('Error updating task:', error); // Log de l'erreur
    return NextResponse.json({ success: false, message: 'Error updating task', error }, { status: 500 }); // Réponse en cas d'erreur
  }
}

// Fonction DELETE pour supprimer une tâche par ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect(); // Connexion à la base de données
    const { id } = params; // Extraction de l'ID des paramètres
    const deletedTask = await Task.findByIdAndDelete(id); // Suppression de la tâche
    if (!deletedTask) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 }); // Tâche non trouvée
    }
    return NextResponse.json({ success: true, message: 'Task deleted successfully' }); // Tâche supprimée avec succès
  } catch (error) {
    console.error('Error deleting task:', error); // Log de l'erreur
    return NextResponse.json({ success: false, message: 'Error deleting task', error }, { status: 500 }); // Réponse en cas d'erreur
  }
}
