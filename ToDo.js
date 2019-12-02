import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

function ToDo({ text }) {
	const [ isEditing, setIsEditing ] = useState(false);
	const [ isCompleted, setIsCompleted ] = useState(false);
	const [ toDoValue, setToDoValue ] = useState('');

	const toggleComplete = () => {
		setIsCompleted((prevState) => !prevState);
	};
	const stateEditing = () => {
		setToDoValue(text);
		setIsEditing(true);
	};
	const finishEditing = () => {
		setIsEditing(false);
	};
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<TouchableOpacity onPress={toggleComplete}>
					<View style={[ styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle ]} />
				</TouchableOpacity>
				{isEditing ? (
					<TextInput
						style={[
							styles.text,
							styles.input,
							isCompleted ? styles.completedText : styles.uncompletedText
						]}
						value={toDoValue}
						onChangeText={setToDoValue}
						multiline={true}
						returnKeyType={'done'}
						onBlur={finishEditing}
					/>
				) : (
					<Text style={[ styles.text, isCompleted ? styles.completedText : styles.uncompletedText ]}>
						{text}
					</Text>
				)}
			</View>
			{isEditing ? (
				<View style={styles.actions}>
					<TouchableOpacity onPressOut={finishEditing}>
						<View style={styles.actionContainer}>
							<Text style={styles.actionText}>✅</Text>
						</View>
					</TouchableOpacity>
				</View>
			) : (
				<View style={styles.actions}>
					<TouchableOpacity onPressOut={stateEditing}>
						<View style={styles.actionContainer}>
							<Text style={styles.actionText}>✏️</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity>
						<View style={styles.actionContainer}>
							<Text style={styles.actionText}>❌</Text>
						</View>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: width - 50,
		borderBottomColor: '#bbb',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
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
	},
	completedText: {
		color: '#bbb',
		textDecorationLine: 'line-through'
	},
	uncompletedText: {
		color: '#353535'
	},
	column: {
		flexDirection: 'row',
		alignItems: 'center',
		width: width / 2
	},
	actions: {
		flexDirection: 'row'
	},
	actionContainer: {
		marginVertical: 10,
		marginHorizontal: 10
	},
	input: {
		width: width / 2,
		marginVertical: 15,
		paddingBottom: 5
	}
});

export default ToDo;
