type Props = {
  selectedTask: any;
};

const ViewTask = ({ selectedTask }: Props) => {
  console.log("selectedTask", selectedTask);

  return (
    <div className="view-task-content">
      <h1>{selectedTask.title}</h1>
      <h3>{selectedTask.description}</h3>
    </div>
  );
};

export default ViewTask;
