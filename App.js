import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import ToDo from './ToDo';
import uuidv1 from 'uuid/v1';

const { height, width } = Dimensions.get('window');

export default function App() {
	const [ newToDo, setNewToDo ] = useState('');
	const [ loadedToDos, setLoadedToDos ] = useState(false);
	const [ toDos, setToDos ] = useState([]);

	useEffect(() => {
		setLoadedToDos(true);
	}, []);

	const addToDo = () => {
		if (newToDo !== '') {
			const ID = uuidv1();
			const newToDoObject = {
				id: ID,
				isCompleted: false,
				text: newToDo,
				createdAt: Date.now()
			};
			setToDos([ ...toDos, newToDoObject ]);
		}
		setNewToDo('');
	};

	const deleteToDo = (id) => {
		setToDos(toDos.filter((toDo) => toDo.id !== id));
	};

	const completeToDo = (id) => {
		setToDos(toDos.map((ToDo) => (ToDo.id === id ? { ...ToDo, isCompleted: true } : ToDo)));
	};

	const uncompleteToDo = (id) => {
		setToDos(toDos.map((ToDo) => (ToDo.id === id ? { ...ToDo, isCompleted: false } : ToDo)));
	};

	const updateToDo = (id, text) => {
		setToDos(toDos.map((ToDo) => (ToDo.id === id ? { ...ToDo, text } : ToDo)));
	};

	if (!loadedToDos) {
		return <AppLoading />;
	}
	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />
			<Text style={styles.title}>Simple To Do</Text>
			<View style={styles.card}>
				<TextInput
					style={styles.input}
					placeholder={'New To Do'}
					value={newToDo}
					onChangeText={setNewToDo}
					placeholderTextColor={'#999'}
					returnKeyType={'done'}
					autoCorrect={false}
					onSubmitEditing={addToDo}
				/>
				<ScrollView contentContainerStyle={styles.toDos}>
					{toDos.map((toDo) => (
						<ToDo
							key={toDo.id}
							{...toDo}
							deleteToDo={deleteToDo}
							completeToDo={completeToDo}
							uncompleteToDo={uncompleteToDo}
							updateToDo={updateToDo}
						/>
					))}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F23657',
		alignItems: 'center'
	},
	title: {
		color: 'white',
		fontSize: 30,
		marginTop: 70,
		fontWeight: '400',
		marginBottom: 30
	},
	card: {
		backgroundColor: 'white',
		flex: 1,
		width: width - 25,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		...Platform.select({
			ios: {
				shadowColor: 'rgb(50, 50, 50)',
				shadowOpacity: 0.5,
				shadowRadius: 5,
				shadowOffset: {
					height: -1,
					width: 0
				}
			},
			android: {
				elevation: 3
			}
		})
	},
	input: {
		padding: 20,
		borderBottomColor: '#bbb',
		borderBottomWidth: 1,
		fontSize: 25
	},
	toDos: {
		alignItems: 'center'
	}
});
