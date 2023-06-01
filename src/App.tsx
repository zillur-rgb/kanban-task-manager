import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import data from "./data.json";
import Kanban from "./components/Kanban";

function App() {
  const [currentBoard, setCurrentBoard] = useState<number>(0);
  const [boards, setBoards] = useState({});
  console.log("BOards", boards);

  useEffect(() => {
    setBoards({
      ...data.boards[currentBoard].columns,
    });
  }, [currentBoard]);

  return (
    <div className="App">
      <Layout boards={data.boards} setCurrentBoard={setCurrentBoard}>
        <Kanban
          boards={boards}
          setBoards={setBoards}
          currentBoard={currentBoard}
        />
      </Layout>
    </div>
  );
}

export default App;
