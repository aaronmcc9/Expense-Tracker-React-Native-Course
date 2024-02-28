import { FlatList } from "react-native";
import ExpressItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
    return <ExpressItem {...itemData.item}/>
}

function ExpensesList({ expenses }) {
    return <FlatList data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
    />
}

export default ExpensesList;
