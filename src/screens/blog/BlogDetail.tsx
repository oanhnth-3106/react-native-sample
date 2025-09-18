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
import { getBlogDetail } from '../../services/blog';
import PathIcon from '../../../assets/svgs/path.svg';

type BlogDetailScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'BlogDetail'
>;

export default function BlogDetail({
  navigation,
  route,
}: BlogDetailScreenProps) {
  const [detail, setDetail] = useState<Blog | null>(null);
  const { id } = route.params || {};

  const fetchBlogDetail = async () => {
    try {
      const data = await getBlogDetail(id);
      setDetail(data || null);
    } catch (error) {
      console.error('Error fetching blog detail:', error);
    }
  };

  useEffect(() => {
    if (id) fetchBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.headerLeft}
          onPress={() => navigation.goBack()}
        >
          <PathIcon width={20} height={20} />
          <Text style={styles.headerLeftText}>Detail</Text>
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.body}>
          {detail && (
            <View>
              <Image
                source={{ uri: detail.imageUrl }}
                style={styles.blogImage}
              />
              <Text style={styles.blogTitle}>{detail.title}</Text>
              <Text style={styles.blogAuthorInfo}>
                By {detail.author} - {new Date(detail.createdAt).toDateString()}
              </Text>
              <Text style={styles.blogContent}>{detail.content}</Text>
            </View>
          )}
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
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  blogTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#343434',
    marginTop: 12,
  },
  blogAuthorInfo: {
    fontSize: 14,
    fontWeight: '400',
    color: '#343434',
    marginTop: 8,
  },
  blogContent: {
    fontSize: 16,
    fontWeight: '400',
    color: '#343434',
    marginTop: 12,
    lineHeight: 24,
  },
});
