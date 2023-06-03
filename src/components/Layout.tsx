import Logo from "../assets/logo-light.svg";
import dots from "../assets/icon-vertical-ellipsis.svg";
import boardImg from "../assets/icon-board.svg";
import { useContext, useState } from "react";
import { CopyContext } from "../App";
import { IBoards } from "../types/boards";
import SmallDropdown from "./operations/SmallDropdown";
import hidebar from "../assets/icon-hide-sidebar.svg";

type Props = {
  children: React.ReactNode;
  setCurrentBoard: (index: number) => void;
  currentBoard: number;
  setIsModalOpen: (modal: boolean | string) => void;
};

const Layout = (props: Props) => {
  // // Getting which board is selected
  // const handleChosen = (item: { name: any }) => {
  //   if (item.name === props.boards[props.currentBoard].name) {
  //     return "list-board active";
  //   }
  //   return "list-board";
  // };
  const { copy } = useContext(CopyContext);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div>
            <img src={Logo} alt="Logo" className="logo" />

            <div className="sidebar-boards">
              <h4>All Boards({copy.length})</h4>

              <div>
                {copy.map((board: IBoards, index: number) => (
                  <div
                    key={board.name}
                    onClick={() => props.setCurrentBoard(index)}
                    // className={handleChosen(board)}
                    className={`list-board ${
                      board.name === copy[props.currentBoard].name && "active"
                    }`}
                  >
                    <img src={boardImg} alt="board" />
                    {board.name}
                  </div>
                ))}
                <div
                  className="list-board blue"
                  onClick={() => props.setIsModalOpen("add_new_board")}
                >
                  <img src={boardImg} alt="board" />+ Create New Board
                </div>
              </div>
            </div>
          </div>
          <div className="list-board">
            <img src={hidebar} alt="eyes-closed" /> Hide Sidebar
          </div>
        </div>

        <div className="header">
          <h1>{copy[props.currentBoard].name}</h1>
          <div>
            <button onClick={() => props.setIsModalOpen("add_new_task")}>
              + Add New Task
            </button>
            <img
              src={dots}
              alt="dots"
              className="dots vertically"
              onClick={() => setShowDropdown(true)}
            />

            {showDropdown && (
              <SmallDropdown
                setShowDropDown={setShowDropdown}
                name="Board"
                setIsModalOpen={props.setIsModalOpen}
              />
            )}
          </div>
        </div>
        <main className="test">{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
