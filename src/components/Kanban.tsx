import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ITasks } from "../types/boards";
type Props = {
  currentColumns: any;
  setCurrentColumns: (e: any) => void;
  currentBoard: number;
  setIsModalOpen: any;
  setSelectedTask: (item: ITasks) => void;
};

const Kanban = ({
  currentColumns,
  setCurrentColumns,
  setIsModalOpen,
  setSelectedTask,
}: Props) => {
  const onDragEnd = (result: any, columns: any) => {
    if (!result.destination) return;
    console.log("currentColumns", currentColumns);

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      // what column we take from
      const sourceColumn = columns[source.droppableId];
      // what column we change to
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setCurrentColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setCurrentColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      });
    }
  };

  // Add new column to the board
  const addNewColumn = () => {
    const newColumn = {
      name: "Tests",
      tasks: [],
    };

    setCurrentColumns({
      ...currentColumns,
      newColumn,
    });
  };

  return (
    <div className="Kanban">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, currentColumns)}
      >
        {/* boards[0] is for the current selected board */}
        {Object.entries(currentColumns).map(
          ([columnId, column]: [string, any]) => {
            return (
              <div key={columnId}>
                <div>
                  <h4 className="column-name">
                    {column.name} ({column.tasks.length})
                  </h4>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided) => {
                      return (
                        <div
                          className="column"
                          // {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {column.tasks.map((item: ITasks, index: number) => {
                            return (
                              <Draggable
                                key={item.title}
                                draggableId={item.title}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      onClick={() => {
                                        setIsModalOpen("view_task");
                                        setSelectedTask(item);
                                      }}
                                      className="card"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#2B2C37",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <h4>{item.title}</h4>
                                      <p>Subtasks</p>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          }
        )}
      </DragDropContext>
      <div className="add-new-column" onClick={addNewColumn}>
        + New Column
      </div>
    </div>
  );
};

export default Kanban;
