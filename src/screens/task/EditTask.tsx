import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TASK_STATUSES } from '../../commons/task';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getTaskDetail } from '../../services/task';
import { updateTask } from '../../services/task';
import { Task } from '../../types/task';

const STATUS_OPTIONS = Object.entries(TASK_STATUSES);

type EditTaskScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'EditTask'
>;

export default function EditTask({ route, navigation }: EditTaskScreenProps) {
  const { id } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState('new');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showDuePicker, setShowDuePicker] = useState(false);

  const statusStyleMap: { [key: string]: object } = {
    new: styles.statusSelected_new,
    in_progress: styles.statusSelected_in_progress,
    pending: styles.statusSelected_pending,
    completed: styles.statusSelected_completed,
  };

  const onChangeStart = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) setStartDate(selectedDate);
  };
  const onChangeDue = (event: any, selectedDate?: Date) => {
    setShowDuePicker(Platform.OS === 'ios');
    if (selectedDate) setDueDate(selectedDate);
  };

  const handleEdit = async () => {
    const updatedTask: Task = {
      id,
      title,
      description,
      startDate: startDate.toISOString(),
      dueDate: dueDate.toISOString(),
      status: status as keyof typeof TASK_STATUSES,
    };
    try {
      await updateTask(id, updatedTask);
      navigation.navigate('DetailTask', { id });
    } catch (error) {}
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskDetail(id);
        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setStartDate(data.startDate ? new Date(data.startDate) : new Date());
          setDueDate(data.dueDate ? new Date(data.dueDate) : new Date());
          setStatus(data.status || 'new');
        }
      } catch (error) {}
    };
    fetchTask();
  }, [id]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        multiline
        editable
        underlineColorAndroid="transparent"
      />
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity
        onPress={() => setShowStartPicker(true)}
        style={styles.dateInput}
      >
        <Text>{startDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onChangeStart}
        />
      )}
      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity
        onPress={() => setShowDuePicker(true)}
        style={styles.dateInput}
      >
        <Text>{dueDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDuePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onChangeDue}
        />
      )}
      <Text style={styles.label}>Status</Text>
      <View style={styles.selectBox}>
        {STATUS_OPTIONS.map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={[styles.statusOption, status === key && statusStyleMap[key]]}
            onPress={() => setStatus(key)}
          >
            <Text
              style={
                status === key ? styles.statusTextSelected : styles.statusText
              }
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('TaskList')}>
          <Text style={[styles.button, styles.cancelButton]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={[styles.button, styles.editButton]}>Edit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  selectBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  statusOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  statusSelected_new: {
    backgroundColor: '#b1d39a',
    borderColor: '#b1d39a',
  },
  statusSelected_in_progress: {
    backgroundColor: '#63b3ff',
    borderColor: '#63b3ff',
  },
  statusSelected_pending: {
    backgroundColor: '#f8a94e',
    borderColor: '#f8a94e',
  },
  statusSelected_completed: {
    backgroundColor: '#fe7460',
    borderColor: '#fe7460',
  },
  statusText: {
    color: '#343434',
    fontWeight: '500',
  },
  statusTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
    gap: 12,
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
