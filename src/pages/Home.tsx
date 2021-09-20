import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    var titleAlreadyExists = tasks.find(task => task.title ==newTaskTitle);
    if(titleAlreadyExists){
      Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    var data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };
    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {

    const updatedTasks = tasks.map(task => (task));

    const updateTask = updatedTasks.find(task => task.id == id);
    if(updateTask != undefined){
      updateTask.done = !updateTask.done;
    }

    setTasks(updatedTasks);
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item',
    'Tem certeza que você deseja remover esse item?', 
    [ {text:"cancelar"},
    {text:"ok", onPress:()=> {
      setTasks(oldState => oldState.filter(task => task.id != id));
    }}]);    
    
  }

  function handleEditTask(taskId:number, taskNewTitle:string){
    const updatedTasks = tasks.map(task => (task));

    const updateTask = updatedTasks.find(task => task.id == taskId);
    if(updateTask != undefined){
      updateTask.title = taskNewTitle;
    }

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})