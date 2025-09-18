import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { useCallback, useState } from 'react';
import { Blog } from '../../types/blog';
import CameraIcon from '../../../assets/svgs/camera.svg';
import SettingIcon from '../../../assets/svgs/setting.svg';
import HomeIcon from '../../../assets/svgs/home.svg';
import ArrowRightIcon from '../../../assets/svgs/arrow-right.svg';
import { countAllStatuses } from '../../services/task';
import { useFocusEffect } from '@react-navigation/native';
import { getAnyBlog } from '../../services/blog';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;

export default function Home({ navigation }: HomeScreenProps) {
  const [detail, setDetail] = useState<Blog | null>(null);
  const [taskCounts, setTaskCounts] = useState<Record<string, number>>({});

  const fetchBlogDetail = async () => {
    try {
      const data = await getAnyBlog();
      setDetail(data as Blog);
    } catch (error) {}
  };

  const fetchTaskCounts = async () => {
    try {
      const counts = await countAllStatuses([
        'new',
        'in_progress',
        'pending',
        'completed',
      ]);
      setTaskCounts(counts);
    } catch (error) {}
  };

  const data = [
    { id: 0, status: 'New', count: taskCounts.new ?? 0, style: styles.green },
    {
      id: 1,
      status: 'In progress',
      count: taskCounts.in_progress ?? 0,
      style: styles.blue,
    },
    {
      id: 2,
      status: 'Pending',
      count: taskCounts.pending ?? 0,
      style: styles.yellow,
    },
    {
      id: 3,
      status: 'Completed',
      count: taskCounts.completed ?? 0,
      style: styles.red,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      fetchBlogDetail();
      fetchTaskCounts();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
            style={styles.avatar}
          />
          <Text style={styles.headerLeftText}>Welcome!</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View>
          <View style={styles.blog}>
            <Text style={styles.blogHeaderText}>Hostest Blog</Text>
            <Pressable
              style={({ pressed }) => [
                styles.blogButton,
                pressed && styles.pressed,
              ]}
              onPress={() => navigation.navigate('BlogList')}
            >
              <Text>Go to Blog List</Text>
              <ArrowRightIcon width={12} height={12} stroke={'#343434'} />
            </Pressable>
          </View>
          {detail && (
            <Pressable
              onPress={() => {
                navigation.navigate('BlogDetail', { id: '1' });
              }}
            >
              <View style={styles.blogItem}>
                <Image
                  source={{ uri: detail.imageUrl }}
                  style={styles.blogImage}
                />
                <View style={styles.blogContent}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.blogContentTitle}
                  >
                    {detail.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.blogContentText}
                  >
                    {detail.content}
                  </Text>
                  <View style={styles.blogContentAuthor}>
                    <Text style={styles.blogContentAuthorText}>
                      {detail.author}
                    </Text>
                    <Text style={styles.blogContentAuthorText}>
                      {new Date(detail.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        </View>
        <View style={styles.task}>
          <Text style={styles.taskHeaderText}>Manage your task</Text>

          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={styles.taskCountContainer}
            renderItem={({ item }) => (
              <View style={[item.style, styles.taskCountItem]}>
                <Text style={styles.taskCountStatus}>{item.status}</Text>
                <Text style={styles.taskCountText}>{item.count}</Text>
              </View>
            )}
          />
          <Pressable
            style={({ pressed }) => [
              styles.taskButton,
              pressed && styles.pressed,
            ]}
            onPress={() => navigation.navigate('TaskList')}
          >
            <Text>See all</Text>
            <ArrowRightIcon width={12} height={12} stroke={'#343434'} />
          </Pressable>
        </View>
      </View>
      <View style={styles.actionBar}>
        <View style={styles.homeScreenIcon}>
          <HomeIcon width={20} height={20} />
          <Text style={styles.homeScreenIconText}>Home</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Camera')}>
          <CameraIcon width={28} height={28} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Setting')}>
          <SettingIcon width={28} height={28} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#281C9D',
  },
  header: {
    height: 120,
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
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 30,
  },
  body: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 91,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 32,
  },
  homeScreenIcon: {
    flexDirection: 'row',
    backgroundColor: '#281C9D',
    height: 42,
    borderRadius: 21,
    width: 106,
    padding: 8,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeScreenIconText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  blog: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  blogHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343434',
  },
  blogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    marginHorizontal: 24,
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
  task: {
    padding: 12,
  },
  taskHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343434',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  taskCountContainer: {
    gap: 4,
    padding: 4,
  },
  taskCountItem: {
    flexDirection: 'row',
    height: 48,
    width: '50%',
    borderRadius: 24,
    padding: 4,
  },
  taskCountStatus: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    textAlignVertical: 'center',
    paddingLeft: 16,
  },
  taskCountText: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  green: {
    backgroundColor: '#b1d39a',
  },
  blue: {
    backgroundColor: '#63b3ff',
  },
  yellow: {
    backgroundColor: '#f8a94e',
  },
  red: {
    backgroundColor: '#fe7460',
  },
  taskButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginTop: 16,
    alignSelf: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
});
