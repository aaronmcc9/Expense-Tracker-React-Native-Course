import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { View, StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpenses({ navigation, route }) {

  const expenseId = route.params.expenseId;
  const isEditing = !!expenseId;

  const expensesContext = useContext(ExpensesContext);

  const selectedExpense = expensesContext.expenses.find((e) => e.id === expenseId);

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

  function confirmHandler(expenseData) {
    isEditing ?
      expensesContext.updateExpense(expenseId, expenseData) :
      expensesContext.addExpense(expenseData)

    closeModal();
  }

  function closeModal() {
    navigation.goBack();
  }

  return <View style={styles.container}>
    <ExpenseForm onCancel={cancelHandler} onSubmit={confirmHandler}
      defaultValues={selectedExpense}
      submitButtonLabel={isEditing ? "Update" : "Add"} />
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
})
