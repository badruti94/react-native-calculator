import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';


const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Calculator"
                onPress={() => navigation.navigate('Calculator')}
            />
            <View style={{ marginBottom: 50 }} />
            <Button
                title="To do list"
                onPress={() => navigation.navigate('To do list')}
            />
        </View>
    );
}

export default Home