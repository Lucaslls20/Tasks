import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ScrollView, TextInput, Pressable, Animated, Image } from 'react-native';
import { Card, Button, IconButton, FAB, List, Portal, Dialog, Provider, Checkbox, Snackbar } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { db, auth } from '../../services/firebaseConfig';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', expirationDate: new Date() });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeButton, setActiveButton] = useState('today');
  const [user, setUser] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    setSelectedDate(moment());
  }, []);

  const handleNavigation = (type) => {
    setActiveButton(type);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchTasks(user.uid);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const fetchTasks = async (userId) => {
    try {
      const tasksRef = collection(db, 'tasks');
      const q = query(tasksRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    } catch (error) {
      console.error('Erro ao buscar tasks: ', error);
    }
  };

  const handleAddTask = async () => {
    if (user) {
      if (!newTask.title) {
        return;
      }
      try {
        const task = {
          ...newTask,
          expirationDate: moment(newTask.expirationDate).format('YYYY-MM-DD'),
          userId: user.uid
        };
        const taskDoc = await addDoc(collection(db, 'tasks'), task);
        setTasks([...tasks, { ...task, id: taskDoc.id }]);
        setShowModal(false);
        setNewTask({ title: '', description: '', expirationDate: new Date() });
        setSnackBarMessage('Tarefa inserida com sucesso');
        setSnackBarVisible(true);
      } catch (error) {
        console.error('Erro ao adicionar task: ', error);
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      setNewTask({ ...newTask, expirationDate: selectedDate });
    }
    setShowDatePicker(false);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
      setSnackBarMessage('Tarefa deletada com sucesso');
      setSnackBarVisible(true);
    } catch (error) {
      console.error('Erro ao deletar task: ', error);
    }
  };

  const getFilteredTasks = () => {
    if (activeButton === 'today') {
      return tasks.filter(task =>
        moment(task.expirationDate).isSame(moment(), 'day')
      );
    } else if (activeButton === 'month') {
      return tasks.filter(task =>
        moment(task.expirationDate).isSame(moment(), 'month')
      );
    } else if (activeButton === 'year') {
      return tasks.filter(task =>
        moment(task.expirationDate).isSame(moment(), 'year')
      );
    }
    return tasks;
  };

  const handleCheckTask = async (task) => {
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, { isCompleted: !task.isCompleted });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t));
    } catch (error) {
      console.error('Erro ao atualizar task: ', error);
    }
  };

  const renderTaskItem = ({ item }) => {
    return (
      <LinearGradient
        colors={['#E0F7FA', '#B2EBF2']} // Azul claro com um leve gradiente
        style={{ borderRadius: 8, marginBottom: 10 }}
      >
        <List.Item
          titleStyle={[
            styles.taskText,
            item.isCompleted ? styles.completedText : null
          ]}
          title={item.title}
          description={`Expira em: ${moment(item.expirationDate).format('YYYY-MM-DD')}`}
          left={() => (
            <Checkbox
              status={item.isCompleted ? 'checked' : 'unchecked'}
              onPress={() => handleCheckTask(item)}
            />
          )}
          right={props => (
            <IconButton
              {...props}
              icon="trash-can-outline"
              color="red"
              onPress={() => handleDeleteTask(item.id)}
            />
          )}
        />
      </LinearGradient>
    );
  };
  

  const startFadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (showModal) startFadeIn();
  }, [showModal]);

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <CalendarStrip
          scrollable
          style={styles.calendar}
          calendarColor={'#00A9F4'}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          highlightDateNumberStyle={{ color: '#FFEB3B' }}
          highlightDateNameStyle={{ color: '#FFEB3B' }}
          selectedDate={selectedDate}
          onDateSelected={(date) => setSelectedDate(date)}
        />

        <View style={styles.navigation}>
          <Button
            mode={activeButton === 'today' ? 'contained' : 'outlined'}
            color={activeButton === 'today' ? '#00A9F4' : undefined}
            onPress={() => handleNavigation('today')}
          >
            Today
          </Button>
          <Button
            mode={activeButton === 'month' ? 'contained' : 'outlined'}
            color={activeButton === 'month' ? '#00A9F4' : undefined}
            onPress={() => handleNavigation('month')}
          >
            Month
          </Button>
          <Button
            mode={activeButton === 'year' ? 'contained' : 'outlined'}
            color={activeButton === 'year' ? '#00A9F4' : undefined}
            onPress={() => handleNavigation('year')}
          >
            Year
          </Button>
        </View>

        <View style={styles.taskContainer}>
          <FlatList
            data={getFilteredTasks()}
            keyExtractor={(item) => item.id}
            renderItem={renderTaskItem}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.noTaskText}>Sem tarefas ainda</Text>
                <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/11/06/18/30/eggplant-2924511_1280.png' }}
                  style={styles.imageEmpty}
                />
              </View>
            )}
            ListFooterComponent={<View style={{ height: 80 }} />}
          />
        </View>

        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => setShowModal(true)}
        />

        <Portal>
          <Dialog visible={showModal} onDismiss={() => setShowModal(false)}>
            <Dialog.Title>Nova Tarefa</Dialog.Title>
            <Animated.View style={{ opacity: fadeAnim }}>
              <Dialog.Content>
                <TextInput
                  placeholder="Título"
                  style={styles.input}
                  value={newTask.title}
                  onChangeText={(text) => setNewTask({ ...newTask, title: text })}
                />
              {/*}  <TextInput
                  placeholder="Descrição"
                  style={styles.input}
                  value={newTask.description}
                  onChangeText={(text) => setNewTask({ ...newTask, description: text })}
                /> */}
                <Pressable onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.dateText}>
                    Expiração: {moment(newTask.expirationDate).format('YYYY-MM-DD')}
                  </Text>
                </Pressable>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setShowModal(false)} color="#FF6F61">Cancelar</Button>
                <Button onPress={handleAddTask}>Adicionar</Button>
              </Dialog.Actions>
            </Animated.View>
          </Dialog>
        </Portal>

        {showDatePicker && (
          <DateTimePicker
            value={newTask.expirationDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Snackbar
          visible={snackBarVisible}
          onDismiss={() => setSnackBarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          {snackBarMessage}
        </Snackbar>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FAFAFA',
  },
  calendar: {
    height: 100,
    marginBottom: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  taskContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#00A9F4',
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    padding: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#00A9F4',
    marginBottom: 20,
  },
  noTaskText: {
    fontSize: 18,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageEmpty: {
    width: 100,
    height: 100,
    opacity: 0.8,
  },
});

export default Home;
