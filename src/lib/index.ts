// place files you want to import through the `$lib` alias in this folder.
export type Task = {
  id: number;
  title: string;
  description: string;
  priority: number;
  completed: boolean;
};

export type TaskListsProps = {
  tasks: Task[];
  deleteTask: (id: number) => void;
  editTask: (id: number) => void;
}

export type TaskModalProps = {
  hidden: boolean;
  task: Task;
  toggleModal: () => void;
  onclick: () => void;
};

export type FloatButtonProps = {
  hidden: boolean;
  onclick: () => void;
};