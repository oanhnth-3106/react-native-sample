import axios from 'axios';
import { Blog } from '../types/blog';

const API_URL = 'http://10.0.2.2:3000/blogs';

export const getListBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await axios.get<Blog[]>(API_URL);
    return response.data
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (id: string): Promise<Blog> => {
  try {
    const response = await axios.get<Blog>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};