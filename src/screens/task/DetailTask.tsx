import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { getTaskDetail } from '../../services/task';
import { Task } from '../../types/task';
import { TASK_STATUSES } from '../../commons/task';

type DetailTaskScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'DetailTask'
>;

export default function DetailTask({
  navigation,
  route,
}: DetailTaskScreenProps) {
  const { id } = route.params;
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskDetail(id);
        setTask(data);
      } catch (error) {
        setTask(null);
      }
    };
    fetchTask();
  }, [id]);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.label}>Description</Text>
      <Text style={styles.value}>{task.description}</Text>
      <Text style={styles.label}>Start Date</Text>
      <Text style={styles.value}>
        {new Date(task.startDate ?? '').toLocaleDateString()}
      </Text>
      <Text style={styles.label}>Due Date</Text>
      <Text style={styles.value}>
        {new Date(task.dueDate ?? '').toLocaleDateString()}
      </Text>
      <Text style={styles.label}>Status</Text>
      <Text style={styles.value}>
        {TASK_STATUSES[task.status as keyof typeof TASK_STATUSES]}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('TaskList')}>
          <Text style={[styles.button, styles.cancelButton]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditTask', { id: task.id as string })
          }
        >
          <Text style={[styles.button, styles.editButton]}>Edit Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: '#343434',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    padding: 12,
    borderRadius: 12,
    height: 48,
    width: 160,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#007AFF',
    color: '#fff',
  },
});
