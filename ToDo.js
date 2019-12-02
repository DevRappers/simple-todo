import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function ToDo() {
	const [ isEditing, setIsEditing ] = useState(false);
	const [ isCompleted, setIsCompleted ] = useState(false);

	const toggleComplete = () => {
		setIsCompleted((prevState) => !prevState);
	};
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={toggleComplete}>
				<View style={[ styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle ]} />
			</TouchableOpacity>
			<Text style={styles.text}>Hello I'm a Todo</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: width - 50,
		borderBottomColor: '#bbb',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		alignItems: 'center'
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 3,
		marginRight: 20
	},
	completedCircle: {
		borderColor: '#bbb'
	},
	uncompletedCircle: {
		borderColor: '#F23657'
	},
	text: {
		fontWeight: '600',
		fontSize: 20,
		marginVertical: 20
	}
});

export default ToDo;
