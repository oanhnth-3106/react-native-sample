import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { RootState } from '../../stores/store';
import { useSelector } from 'react-redux';
import { getBlogById } from '../../api/blog';
import { useEffect, useState } from 'react';
import { Blog } from '../../types/blog';
import BellIcon from '../../../assets/svgs/bell.svg';
import MailIcon from '../../../assets/svgs/mail.svg';
import SettingIcon from '../../../assets/svgs/setting.svg';
import HomeIcon from '../../../assets/svgs/home.svg';
import ArrowRightIcon from '../../../assets/svgs/arrow-right.svg';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;

export default function Home({ navigation }: HomeScreenProps) {
  const username = useSelector((state: RootState) => state.auth.username);
  const [detail, setDetail] = useState<Blog | null>(null);

  const fetchBlogDetail = async () => {
    try {
      const data = await getBlogById('1');
      setDetail(data || null);
    } catch (error) {
      console.error('Error fetching blog detail:', error);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
            style={styles.avatar}
          />
          <Text style={styles.headerLeftText}>Welcome, {username}!</Text>
        </View>
        <BellIcon width={24} height={24} style={styles.headerIcon} />
      </View>
      <View style={styles.body}>
        <View>
          <View style={styles.blog}>
            <Text style={styles.blogHeaderText}>Hostest Blog</Text>
            <Pressable
              style={styles.blogButton}
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
      </View>
      <View style={styles.actionBar}>
        <View style={styles.homeScreenIcon}>
          <HomeIcon width={20} height={20} />
          <Text style={styles.homeScreenIconText}>Home</Text>
        </View>
        <MailIcon width={28} height={28} />
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
  headerIcon: {
    alignSelf: 'center',
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
});
