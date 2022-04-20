import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


const Screen = (props) => {
    const { numberToCount, equal } = props

    const getCount = () => {
        const last_char = numberToCount.charAt(numberToCount.length - 1)

        try {
            if (last_char === '/' || last_char === 'x' || last_char === '-' || last_char === '+') {
                return eval(numberToCount.split('x').join('*').slice(0, -1))
            }

            return eval(numberToCount.split('x').join('*'))
        } catch (error) {
            return error.message
        }
    }

    const checkEqual = () => {
        return equal ? 35 : 25
    }

    return (
        <TextInput
            style={styles.screen}
            multiline={true}
            numberOfLines={4}
        >
            <Text style={{ fontSize: 25 }} >{numberToCount}</Text>
            {'\n'}
            <Text style={{ fontSize: checkEqual() }} >{getCount()}</Text>


        </TextInput >

    )
}

const Key = (props) => {
    const { number, onPress, color = '#FF5757' } = props

    return (
        <TouchableOpacity
            style={{ ...styles.button, backgroundColor: color }}
            onPress={onPress}
        >
            <Text style={styles.buttonText} >{number}</Text>
        </TouchableOpacity>
    )
}

const Calculator = (props) => {
    const [numberToCount, setNumberToCount] = useState('0')
    const [equal, setEqual] = useState(false)

    const setNumber = char => {
        if (numberToCount === '0') {
            setNumberToCount(char)
        } else {
            setNumberToCount(numberToCount + char)
        }
        setEqual(false)
    }

    const clearNumber = () => {
        setNumberToCount('0')
        setEqual(false)
    }

    const deleteNumber = () => {
        setNumberToCount(numberToCount.slice(0, -1))
        setEqual(false)
    }


    return (
        <View style={styles.container} >
            <Text style={styles.header} >Display</Text>
            <Screen
                numberToCount={numberToCount}
                equal={equal}
            />
            <View style={{ flexDirection: 'row' }} >
                <Key number='1' onPress={() => { setNumber('1') }} />
                <Key number='2' onPress={() => { setNumber('2') }} />
                <Key number='-' onPress={() => { setNumber('-') }} color='#930707' />
                <Key number='+' onPress={() => { setNumber('+') }} color='#930707' />
            </View>
            <View style={{ flexDirection: 'row' }} >
                <Key number='3' onPress={() => { setNumber('3') }} />
                <Key number='4' onPress={() => { setNumber('4') }} />
                <Key number='/' onPress={() => { setNumber('/') }} color='#930707' />
                <Key number='x' onPress={() => { setNumber('x') }} color='#930707' />
            </View>
            <View style={{ flexDirection: 'row' }} >
                <Key number='5' onPress={() => { setNumber('5') }} />
                <Key number='6' onPress={() => { setNumber('6') }} />
                <Key number='%' onPress={() => { setNumber('%') }} color='#930707' />
                <Key number='=' onPress={() => { setEqual(true) }} color='#930707' />
            </View>
            <View style={{ flexDirection: 'row' }} >
                <Key number='7' onPress={() => { setNumber('7') }} />
                <Key number='8' onPress={() => { setNumber('8') }} />
                <Key number='9' onPress={() => { setNumber('9') }} />
                <Key number='0' onPress={() => { setNumber('0') }} />
            </View>
            <View style={{ flexDirection: 'row' }} >
                <Key number='C' onPress={() => { clearNumber() }} color='#930707' />
                <Key number='<-' onPress={() => { deleteNumber() }} color='#930707' />
                <Key number=',' onPress={() => { setNumber(',') }} />
            </View>

        </View>
    );
}

const styles = {
    container: {
        backgroundColor: '#FFA0A0',
        height: '100%',
        padding: 22
    },
    header: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 15
    },
    screen: {
        backgroundColor: 'white',
        borderRadius: 10,
        textAlign: 'right',
        fontWeight: 'bold',
        paddingRight: 10,
        marginBottom: 25
    },
    button: {
        padding: 15,
        borderRadius: 10,
        width: 71,
        marginRight: 10,
        marginBottom: 10
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    }
}

export default Calculator

