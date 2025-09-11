import { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { addTask } from '../../services/task';

type CreateTaskScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'CreateTask'
>;

export default function CreateTask({ navigation }: CreateTaskScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showDuePicker, setShowDuePicker] = useState(false);

  const onChangeStart = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) setStartDate(selectedDate);
  };
  const onChangeDue = (event: any, selectedDate?: Date) => {
    setShowDuePicker(Platform.OS === 'ios');
    if (selectedDate) setDueDate(selectedDate);
  };

  const handleCreateTask = () => {
    try {
      addTask({
        title,
        description,
        startDate: startDate.toISOString(),
        dueDate: dueDate.toISOString(),
      });
      navigation.navigate('TaskList');
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add new task</Text>
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
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate('TaskList')}>
          <Text style={[styles.button, styles.cancelButton]}>Cancel</Text>
        </Pressable>
        <Pressable onPress={() => handleCreateTask()}>
          <Text style={[styles.button, styles.createButton]}>Create</Text>
        </Pressable>
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
  header: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
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
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  textarea: {
    textAlignVertical: 'top',
    minHeight: 120,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
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
  createButton: {
    backgroundColor: '#007AFF',
    color: '#fff',
  },
});
