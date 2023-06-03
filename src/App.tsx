import { createContext, useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import data from "./data.json";
import Kanban from "./components/Kanban";
import Modal from "./components/forms/Modal";

export const CopyContext: React.Context<any> = createContext(null);

function App() {
  // index for choosing currentColumns from the copy array
  const [currentBoard, setCurrentBoard] = useState<number>(0);

  // const [boards, setBoards] = useState({});
  // current columns
  const [currentColumns, setCurrentColumns] = useState({});

  // this is the data that we modify
  const [copy, setCopy] = useState([...data.boards]);

  // Set modal status
  const [isModalOpen, setIsModalOpen] = useState<boolean | string>(false);
  const [selectedTask, setSelectedTask] = useState();
  console.log("isModalOpen", isModalOpen);

  // console.log("BOards", boards);

  useEffect(() => {
    setCurrentColumns({
      ...copy[currentBoard].columns,
    });
  }, [currentBoard]);

  return (
    <CopyContext.Provider
      value={{
        copy,
        setCopy,
        currentColumns,
        setCurrentColumns,
        currentBoard,
        setCurrentBoard,
        selectedTask,
        setSelectedTask,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      <div>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            // copy={copy}
            // setCopy={setCopy}
          />
        )}
        <Layout
          // copy={copy}
          setCurrentBoard={setCurrentBoard}
          currentBoard={currentBoard}
          setIsModalOpen={setIsModalOpen}
        >
          <Kanban
            currentColumns={currentColumns}
            setCurrentColumns={setCurrentColumns}
            currentBoard={currentBoard}
            setIsModalOpen={setIsModalOpen}
            setSelectedTask={setSelectedTask}
          />
        </Layout>
      </div>
    </CopyContext.Provider>
  );
}

export default App;
