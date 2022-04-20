import { db } from './config/firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Item = ({ todo, done, destroy }) => {
    //console.log(todo);

    const icon = todo.status ? 'close' : 'done'
    const line = todo.status ? 'line-through' : 'none'
    const backgroundColor = todo.status ? 'red' : 'green'
    const onPress = () => {
        if (!todo.status) {
            done(todo.id)
        } else {
            destroy(todo.id)
        }
    }

    return (
        <View style={styles.item}>
            <Text style={{ ...styles.title, textDecorationLine: line }}>{todo.todo}</Text>
            <TouchableOpacity
                style={{ ...styles.button, backgroundColor }}
                onPress={onPress}
            >
                <MaterialIcons name={icon} size={30} color='white' />
            </TouchableOpacity>
        </View>
    )
}
const Todo = () => {
    const [todos, setTodos] = useState([{
        id: '',
        todo: '',
        status: false
    },])
    const [todo, setTodo] = useState('')
    const todoCollection = collection(db, "todo")

    const done = async id => {
        const todoDoc = doc(db, 'todo', id)
        await updateDoc(todoDoc, { status: true })
        getData()
    }
    const destroy = async id => {
        const todoDoc = doc(db, 'todo', id)
        await deleteDoc(todoDoc)
        getData()

    }

    const renderItem = ({ item }) => {
        //console.log(item);
        return (<Item todo={item} done={done} destroy={destroy} />)
    }

    const getData = async () => {
        let data = await getDocs(todoCollection)
        data = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        data.sort((a, b) => a.createdAt - b.createdAt)
        data.sort((a, b) => a.status - b.status)
        console.log(data);
        setTodos(data)
        //consoledfs(data);
    }

    useEffect(() => {
        getData()
    }, [])


    const handleSubmit = async () => {
        await addDoc(todoCollection, { todo: todo, status: false, createdAt: new Date().getTime() })
        setTodo('')
        getData()
        const data = await todoCollection.get()
        console.log(data);
        /* const todoRef = db.collection('todo')
        const data = await todoRef.get()
        console.log('data', data);
        console.log('tes'); */
    }
    return (
        <View style={styles.container} >
            <TextInput
                style={styles.screen}
                multiline={true}
                numberOfLines={4}
                placeholder='tulis to do list'
                value={todo}
                onChangeText={text => setTodo(text)}
            ></TextInput >
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText} >Add</Text>
            </TouchableOpacity>
            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

        </View>

    )
}

const styles = {
    container: {
        backgroundColor: '#FFA0A0',
        height: '100%',
        padding: 22
    },
    screen: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 25,
        padding: 10,
        marginTop: 10
    },
    button: {
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#FF5757'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        flex: 1
    },
}

export default Todo