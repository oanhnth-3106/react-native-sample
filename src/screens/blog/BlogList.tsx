import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { useEffect, useState } from 'react';
import { Blog } from '../../types/blog';
import PathIcon from '../../../assets/svgs/path.svg';
import { getListBlog } from '../../services/blog';

type BlogListScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'BlogList'
>;

export default function BlogList({ navigation }: BlogListScreenProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const data = await getListBlog();
      setBlogs(data as Blog[]);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.headerLeft}
          onPress={() => navigation.navigate('Home')}
        >
          <PathIcon width={20} height={20} />
          <Text style={styles.headerLeftText}>BlogList</Text>
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.body}>
          {blogs.map(blog => (
            <Pressable
              key={blog.id}
              onPress={() => {
                navigation.navigate('BlogDetail', { id: blog.id });
              }}
            >
              <View style={styles.blogItem}>
                <Image
                  source={{ uri: blog.imageUrl }}
                  style={styles.blogImage}
                />
                <View style={styles.blogContent}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.blogContentTitle}
                  >
                    {blog.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.blogContentText}
                  >
                    {blog.content}
                  </Text>
                  <View style={styles.blogContentAuthor}>
                    <Text style={styles.blogContentAuthorText}>
                      {blog.author}
                    </Text>
                    <Text style={styles.blogContentAuthorText}>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 100,
    flexDirection: 'row',
    padding: 24,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  headerLeftText: {
    color: '#343434',
    fontSize: 24,
    fontWeight: '600',
  },
  body: {
    flex: 1,
    paddingHorizontal: 36,
    gap: 24,
    paddingBottom: 24,
  },
  blogItem: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    flexDirection: 'row',
    height: 120,
  },
  blogImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  blogContent: {
    padding: 8,
    flex: 1,
  },
  blogContentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  blogContentText: {
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '90%',
    color: '#343434',
    fontSize: 14,
  },
  blogContentAuthor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blogContentAuthorText: {
    color: '#A3A3A3',
    fontSize: 12,
  },
});
