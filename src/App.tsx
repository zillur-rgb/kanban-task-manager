import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import data from "./data.json";
import Kanban from "./components/Kanban";
import Modal from "./components/forms/Modal";

function App() {
  const [currentBoard, setCurrentBoard] = useState<number>(0);
  const [boards, setBoards] = useState({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  console.log("isModalOpen", isModalOpen);

  // console.log("BOards", boards);

  useEffect(() => {
    setBoards({
      ...data.boards[currentBoard].columns,
    });
  }, [currentBoard]);

  return (
    <>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
      <Layout
        boards={data.boards}
        setCurrentBoard={setCurrentBoard}
        currentBoard={currentBoard}
        setIsModalOpen={setIsModalOpen}
      >
        <Kanban
          boards={boards}
          setBoards={setBoards}
          currentBoard={currentBoard}
          setIsModalOpen={setIsModalOpen}
        />
      </Layout>
    </>
  );
}

export default App;
