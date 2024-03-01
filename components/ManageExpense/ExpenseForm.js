import { useState } from "react";
import Input from "./Input";
import { View, StyleSheet, Text } from "react-native";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }

    })

    function inputChangedHandler(inputIdentifier, enteredValue) {
        console.log("HERE", inputIdentifier, enteredValue)

        setInputs((currInputs) => {
            return {
                ...currInputs,
                [inputIdentifier]: { value:enteredValue, isValid: true }
            }
        })

        console.log("inputs", inputs)
    }

    function onSubmitHandler() {
        console.log("SUBMIT", inputs)
        const expenseData = {
            amount: +inputs.amount.value, // +converts to number from str
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        console.log("HERE", expenseData)

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((currInputs) => {
                return {
                    amount: { value: currInputs.amount.value, isValid: amountIsValid },
                    date: { value: currInputs.date.value, isValid: dateIsValid },
                    description: { value: currInputs.description.value, isValid: descriptionIsValid }
                }
            })
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input style={styles.rowInput}
                label="Amount"
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }}
            />
            <Input style={styles.rowInput}
                label="Date"
                invalid={!inputs.date.isValid}
                textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value
                }} />
        </View>

        <View>

            <Input label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value
                    // autoCorrect: false
                    // autoCapitalize: 'none'
                }} />
        </View>
        {formIsInvalid && <Text style={styles.errorText}>Invalid input values - Please check your inputted data</Text>}
        <View style={styles.buttons}>
            <Button mode="flat"
                style={styles.button}
                onPress={onCancel}>Cancel</Button>

            <Button onPress={onSubmitHandler}
                style={styles.button}
            >{submitButtonLabel}</Button>
        </View>
    </View>
}

export default ExpenseForm;


const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 24,
        textAlign: 'center',
        color: 'white'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})