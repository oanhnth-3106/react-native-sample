export type Task = {
    id?: string;
    title: string;
    description: string;
    startDate?: string;
    dueDate?: string;
    status?: 'new' | 'pending' | 'in_progress' | 'completed';
}