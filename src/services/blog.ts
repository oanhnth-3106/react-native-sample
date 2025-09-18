import firestore from '@react-native-firebase/firestore';
import { Blog } from '../types/blog';

const blogsCollection = firestore().collection('blogs');

export const getListBlog = async () => {
  try {
    const snapshot = await blogsCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog));
  } catch (error) {}
};

export const getBlogDetail = async (id: string) => {
  try {
    const doc = await blogsCollection.doc(id).get();
    if (doc.exists()) {
      return { id: doc.id, ...doc.data() } as Blog;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getAnyBlog = async () => {
  try {
    const snapshot = await blogsCollection.limit(1).get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Blog;
    }
    return null;
  } catch (error) {
    return null;
  }
};
