import firestore from '@react-native-firebase/firestore';
import { Task } from '../types/task';

const tasksCollection = firestore().collection('tasks');

export const getListTask = async () => {
  try {
    const snapshot = await tasksCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching tasks: ", error);
  }
};

export const addTask = (payload: Partial<Task>) => {
  return tasksCollection.add({
    ...payload,
    createdAt: firestore.FieldValue.serverTimestamp(),
    status: 'new',
  });
}

export const getTaskDetail = async (id: string) => {
  try {
    const doc = await tasksCollection.doc(id).get();
    if (doc.exists()) {
      return { id: doc.id, ...doc.data() } as Task;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching task detail: ", error);
    return null;
  }
};

export const updateTask = (id: string, payload: Partial<Task>) => {
  return tasksCollection.doc(id).update(payload);
}

export const countAllStatuses = async (statuses: string[]) => {
  const results: Record<string, number> = {};

  for (const s of statuses) {
    const query = tasksCollection.where('status', '==', s);
    const snapshot = await query.count().get();
    results[s] = snapshot.data().count;
  }

  return results;
}