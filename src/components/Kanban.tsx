import { useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { CopyContext } from "../App";
import { IColumns } from "../types/boards";

const Kanban = () => {
  const {
    copy,
    currentBoard,
    currentColumns,
    setCurrentColumns,
    setSelectedTask,
    setIsModalOpen,
  } = useContext(CopyContext);

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

  let randomColorGenerator = () =>
    Math.floor(Math.random() * 16777215).toString(16);

  return (
    <div className="Kanban">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, copy[currentBoard].columns)}
      >
        {/* boards[0] is for the current selected board */}
        {Object.entries(copy[currentBoard].columns).map(
          ([columnId, column]: [string, any]) => {
            return (
              <div key={columnId}>
                <>
                  <div className="column-name-wrapper">
                    <div className="column-header">
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: 50,
                          backgroundColor: `#${randomColorGenerator()}`,
                        }}
                      ></div>

                      <h4 className="column-name">
                        {column.name} ({column.tasks.length})
                      </h4>
                    </div>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided) => {
                        return (
                          <div
                            className="column"
                            // {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {column.tasks.map((item: any, index: number) => {
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
                                          setSelectedTask(
                                            item,
                                            (item.key = columnId),
                                            (item.status = column.name),
                                            (item.index = index)
                                          );
                                        }}
                                        className="card"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          backgroundColor: snapshot.isDragging
                                            ? "#635fc750"
                                            : "#2B2C37",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <h4>{item.title}</h4>
                                        <p>
                                          {
                                            item.subtasks.filter(
                                              (item: any) =>
                                                item.isCompleted === true
                                            ).length
                                          }{" "}
                                          of {item.subtasks.length}
                                          Subtasks
                                        </p>
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
                </>
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
