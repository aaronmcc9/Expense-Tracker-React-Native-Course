import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: "Driving Lesson",
        amount: 70.00,
        date: new Date('2024-02-22')
    },
    {
        id: 'e2',
        description: "Groceries",
        amount: 30.00,
        date: new Date('2024-02-24')
    },
    {
        id: 'e3',
        description: "Cinema Ticket",
        amount: 9.99,
        date: new Date('2024-02-25')
    },
    {
        id: 'e4',
        description: "Japan Flights",
        amount: 829.00,
        date: new Date('2024-02-22')
    },
    {
        id: 'e5',
        description: "New Book",
        amount: 14.99,
        date: new Date('2024-02-12')
    }
];

function ExpensesOutput({ expensesPeriod }) {
    return <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex:1
    }
})
