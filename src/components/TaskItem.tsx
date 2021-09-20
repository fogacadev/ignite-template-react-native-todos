import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pen/pen.png';

import {View, TouchableOpacity, Text, StyleSheet, TextInput, Image } from 'react-native';
import { Task } from './TasksList';

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId:number, taskNewTitle:string) => void;
}

export function TaskItem({ task: item,index, toggleTaskDone, removeTask, editTask }: TasksItemProps){

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title);

  const textInputRef = useRef<TextInput>(null)

  useEffect(()=>{
    if(textInputRef.current){
      if(editing){
        textInputRef.current.focus();
      }else{
        textInputRef.current.blur();
      }
    }
  }, [editing]);

  function handleStartEditing(){
    setEditing(true);
  }

  function handleCancelEditing(){
    setEditing(false);
    setTitle(item.title);
  }

  function handleSubmitEditing(){
    editTask(item.id, title);
    setEditing(false);
  }

  return (
    <>
    <View >
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={item.done == true ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput
                value={title}
                onChangeText={setTitle}
                editable={editing}
                onSubmitEditing={handleSubmitEditing}
                style={item.done ? styles.taskTextDone : styles.taskText}
                ref={textInputRef}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
              {editing ? (
                <TouchableOpacity onPress={handleCancelEditing}>
                  <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
              ):(
                <TouchableOpacity onPress={handleStartEditing}>
                  <Image source={editIcon} />
                </TouchableOpacity>
              )}
            
            <View style={ styles.iconsDivider }/>
            <TouchableOpacity disabled={editing}
                              onPress={() => removeTask(item.id)}
                              style={{ opacity: editing ? 0.2 : 1 }}>
              <Image source={trashIcon} />
            </TouchableOpacity>
            </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsDivider:{
    width: 30,
    height: 24,
    color:'rgba(196,196,196,0.24)'
  },
  iconsContainer:{
    flexDirection:'row',
    justifyContent:'flex-end'
  }
});