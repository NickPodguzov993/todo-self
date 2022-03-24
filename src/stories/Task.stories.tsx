import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Task} from "../Task";
import {action} from "@storybook/addon-actions";
import {TaskType} from "../TodoList";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/AddItemForm',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

args: {
    removeTask: action('removeTask')
    changeTaskStatus: action('changeTaskStatus')
    changeTaskTitle: action('changeTaskTitle')
}

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    todoListId: 'todoListId',
    task: {id: '1', isDone: true, title: 'JS'},
};

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    todoListId: 'todoListId',
    task: {id: '1', isDone: false, title: 'JS'},
};


