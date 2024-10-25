import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, List, IconButton, Provider, Title } from 'react-native-paper';
import moment from 'moment';
import { db, auth } from '../../services/firebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { RefreshControl } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const Conclued = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('completed');
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks(user.uid);
    setRefreshing(false);
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
        ...doc.data(),
      }));
      setTasks(tasksData);
    } catch (error) {
      console.error('Erro ao buscar tasks: ', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao deletar task: ', error);
    }
  };

  const filterTasks = () => {
    if (filter === 'completed') {
      return tasks.filter(task => task.isCompleted);
    } else if (filter === 'pending') {
      return tasks.filter(task => !task.isCompleted && moment(task.expirationDate).isSameOrAfter(moment(), 'day'));
    } else if (filter === 'expired') {
      return tasks.filter(task => !task.isCompleted && moment(task.expirationDate).isBefore(moment(), 'day'));
    }
    return tasks;
  };

  const renderTaskItem = ({ item }) => {
    const isExpired = moment(item.expirationDate).isBefore(moment(), 'day');
    const gradientColors = item.isCompleted
      ? ['#DFFFD6', '#B2FF59'] // Gradiente verde claro para concluídas
      : isExpired
        ? ['#FDECEC', '#FF8A80'] // Gradiente vermelho claro para expiradas
        : ['#F7F7F7', '#BDBDBD']; // Gradiente cinza claro para pendentes
  
    return (
      <LinearGradient
        colors={gradientColors}
        style={styles.gradientItem}
      >
        <List.Item
          titleStyle={{ color: '#333' }}
          descriptionStyle={{ color: '#555' }}
          title={item.title}
          description={`Expira em: ${moment(item.expirationDate).format('YYYY-MM-DD')}`}
          left={() => (
            <TouchableOpacity disabled={true} style={{ opacity: 1 }}>
              <Icon
                name={item.isCompleted ? "check-circle" : "alert-circle-outline"}
                size={28} // Tamanho do ícone
                color={item.isCompleted ? "#4CAF50" : "#FF5722"} // Cor sólida (verde para concluído, vermelho para pendente/expirado)
              />
            </TouchableOpacity>
          )}
          right={props => (
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
              <Icon
                name="trash-can-outline"
                size={28}
                color="#777" // Cor sólida aplicada ao ícone de exclusão
              />
            </TouchableOpacity>
          )}
          style={styles.listItem}
        />
      </LinearGradient>
    );
  };
  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title style={styles.titleText}>Verifique suas tarefas aqui!</Title>
        </View>
        <View style={styles.filterContainer}>
          <Button
            mode={filter === 'completed' ? 'contained' : 'outlined'}
            onPress={() => setFilter('completed')}
            style={styles.button}
          >
            Concluídas
          </Button>
          <Button
            mode={filter === 'pending' ? 'contained' : 'outlined'}
            onPress={() => setFilter('pending')}
            style={styles.button}
          >
            Pendentes
          </Button>
          <Button
            mode={filter === 'expired' ? 'contained' : 'outlined'}
            onPress={() => setFilter('expired')}
            style={styles.button}
          >
            Expiradas
          </Button>
        </View>

        <FlatList
          data={filterTasks()}
          keyExtractor={(item) => item.id}
          renderItem={renderTaskItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.noTaskText}>Nenhuma tarefa encontrada</Text>
            </View>
          )}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  titleContainer: {
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: '900',
    color: '#888',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  noTaskText: {
    fontSize: 18,
    color: 'gray',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  gradientItem: {
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  listItem: {
    backgroundColor: 'transparent', // Transparente para exibir o gradiente
  },
});

export default Conclued;
