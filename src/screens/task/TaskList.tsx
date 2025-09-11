import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { useEffect, useState } from 'react';
import { getListTask } from '../../services/task';
import { Task } from '../../types/task';
import PathIcon from '../../../assets/svgs/path.svg';
import { TASK_STATUSES } from '../../commons/task';

type TaskListScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'TaskList'
>;

export default function TaskList({ navigation }: TaskListScreenProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const data = await getListTask();
      console.log(data);
      setTasks(data as Task[]);
    } catch (error) {}
  };

  const dueDatePassed = (dueDate: string | undefined) => {
    if (!dueDate) return false;
    const now = new Date();
    const due = new Date(dueDate);
    return due.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Pressable
            style={styles.headerLeft}
            onPress={() => navigation.navigate('Home')}
          >
            <PathIcon width={20} height={20} />
            <Text style={styles.headerLeftText}>TaskList</Text>
          </Pressable>
        </View>
        <View style={styles.body}>
          {tasks.map(task => (
            <Pressable
              key={task.id}
              onPress={() => {
                navigation.navigate('DetailTask', { id: task.id as string });
              }}
              style={({ pressed }) => [
                styles.taskItem,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.taskItemDateTime,
                  dueDatePassed(task.dueDate) ? styles.danger : {},
                ]}
              >
                {new Date(task.startDate ?? '').toLocaleDateString()} ~{' '}
                {new Date(task.dueDate ?? '').toLocaleDateString()}
              </Text>
              <Text style={styles.taskItemTitle}>{task.title}</Text>
              <View style={styles.taskItemStatusContainer}>
                <View
                  style={[styles[task.status ?? 'new'], styles.taskItemCircle]}
                />
                <Text style={styles.taskItemStatus}>
                  {TASK_STATUSES[task.status as keyof typeof TASK_STATUSES]}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTask')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
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
    gap: 12,
    paddingBottom: 24,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -2,
  },
  taskItem: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    gap: 4,
  },
  taskItemDateTime: {
    fontSize: 12,
    color: '#989898',
    alignSelf: 'flex-end',
  },
  taskItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343434',
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  taskItemStatusContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  new: {
    backgroundColor: '#b1d39a',
  },
  in_progress: {
    backgroundColor: '#63b3ff',
  },
  pending: {
    backgroundColor: '#f8a94e',
  },
  completed: {
    backgroundColor: '#fe7460',
  },
  taskItemStatus: {
    fontSize: 14,
    color: '#343434',
  },
  taskItemCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
    marginTop: 4,
  },
  danger: {
    color: 'red',
  },
  pressed: {
    opacity: 0.5,
  },
});
