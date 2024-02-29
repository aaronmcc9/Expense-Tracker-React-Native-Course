import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/ExpensesOutput/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { View, StyleSheet } from "react-native";
import Button from "../components/ExpensesOutput/UI/Button";
import { ExpensesContext } from "../store/expense-context";

function ManageExpenses({ navigation, route }) {

  const expenseId = route.params.expenseId;
  const isEditing = !!expenseId;

  const expensesContext = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler() {
    expensesContext.deleteExpense(expenseId)
    closeModal();
  }

  function cancelHandler() {
    closeModal();
  }

  function confirmHandler() {
    isEditing ?
      expensesContext.updateExpense(expenseId, { description: "test", amount: 20.00, date: new Date() }) :
    expensesContext.addExpense({description: "test", amount: 20.00, date: new Date()})

    closeModal();
  }

  function closeModal() {
    navigation.goBack();
  }

  return <View style={styles.container}>
    <View style={styles.buttons}>
      <Button mode="flat"
        style={styles.button}
        onPress={cancelHandler}>Cancel</Button>

      <Button onPress={confirmHandler}
        style={styles.button}
      >{isEditing ? "Update" : "Add"}</Button>
    </View>
    {isEditing && (
      <View style={styles.deleteContainer}>
        <IconButton icon="trash"
          color={GlobalStyles.colors.error500}
          size={36}
          onPress={deleteExpenseHandler}></IconButton>
      </View>
    )}
  </View>;
}
export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
})
