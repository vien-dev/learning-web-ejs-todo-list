const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    action: {
        type: String,
        required: true
    }
});

const todoListSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const uri = "mongodb://127.0.0.1:27017/todolistDB";

async function initDefaultTodoList(todoListName) {
    await mongoose.connect(uri);
    console.log("Connected to todolistDB in mongoDB");

    const TodoItem = mongoose.model(todoListName, itemSchema);

    var result = await TodoItem.find({});
    if (result.length != 0) {
        return result;
    }

    const item1 = new TodoItem({
        action: "Welcome to your todolist!"
    });

    const item2 = new TodoItem({
        action: "Hit the + button to add a new item."
    });

    const item3 = new TodoItem({
        action: "<-- Hit this to delete an item."
    });

    const defaultItems = [item1, item2, item3];

    await TodoItem.insertMany(defaultItems);

    result = await TodoItem.find({});
    return result;
}

async function getTodoList(todoListName) {
    try {
        const TodoItem = mongoose.model(todoListName, itemSchema);

        await mongoose.connect(uri);
        console.log("Connected to todolistDB in mongoDB");

        const result = await TodoItem.find({});
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function insertItemToTodoList(todoListName, value) {
    await mongoose.connect(uri);
    console.log("Connected to todolistDB in mongoDB");

    const TodoItem = mongoose.model(todoListName, itemSchema);

    const item = new TodoItem({
        action: value
    })
    await item.save();

    return await TodoItem.find({});
}

async function removeItemFromTodoList(todoListName, actionId) {
    await mongoose.connect(uri);
    console.log("Connected to todolistDB in mongoDB");

    const TodoItem = mongoose.model(todoListName, itemSchema);

    return await TodoItem.findByIdAndDelete(actionId);
}

exports.initDefaultTodoList = initDefaultTodoList;
exports.getTodoList = getTodoList;
exports.insertItemToTodoList = insertItemToTodoList;
exports.removeItemFromTodoList = removeItemFromTodoList;
