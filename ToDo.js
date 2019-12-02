import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

function ToDo({ text, isCompleted, deleteToDo, id }) {
	const [ isEditing, setIsEditing ] = useState(isCompleted);
	const [ isCompletedS, setIsCompleted ] = useState(false);
	const [ toDoValue, setToDoValue ] = useState(text);

	const toggleComplete = () => {
		setIsCompleted((prevState) => !prevState);
	};
	const startEditing = () => {
		setIsEditing(true);
	};
	const finishEditing = () => {
		setIsEditing(false);
	};
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<TouchableOpacity onPress={toggleComplete}>
					<View style={[ styles.circle, isCompletedS ? styles.completedCircle : styles.uncompletedCircle ]} />
				</TouchableOpacity>
				{isEditing ? (
					<TextInput
						style={[
							styles.text,
							styles.input,
							isCompletedS ? styles.completedText : styles.uncompletedText
						]}
						value={toDoValue}
						onChangeText={setToDoValue}
						multiline={true}
						returnKeyType={'done'}
						onBlur={finishEditing}
					/>
				) : (
					<Text style={[ styles.text, isCompletedS ? styles.completedText : styles.uncompletedText ]}>
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
					<TouchableOpacity onPressOut={startEditing}>
						<View style={styles.actionContainer}>
							<Text style={styles.actionText}>✏️</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPressOut={() => deleteToDo(id)}>
						<View style={styles.actionContainer}>
							<Text style={styles.actionText}>❌</Text>
						</View>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}

ToDo.propTypes = {
	text: PropTypes.string.isRequired,
	isCompleted: PropTypes.bool.isRequired,
	deleteToDo: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired
};

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
