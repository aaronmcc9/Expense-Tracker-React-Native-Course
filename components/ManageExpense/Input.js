import { TextInput, StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, invalid, textInputConfig }) {

    let inputStyles = [styles.input]

    if (textInputConfig && textInputConfig.multiline)
        inputStyles.push(styles.inputMultiline);

    return <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
        <TextInput style={[inputStyles, invalid && styles.invalidInput]} {...textInputConfig}></TextInput>
    </View>
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
        // flex: 1
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        textAlignVertical: 'top',
        minHeight: 100
    },
    invalidLabel:{
        color: GlobalStyles.colors.error500
    }, 
    invalidInput:{
        backgroundColor: GlobalStyles.colors.error50
    }
})