import Logo from "../assets/logo-light.svg";
import dots from "../assets/icon-vertical-ellipsis.svg";
import boardImg from "../assets/icon-board.svg";
import { useContext, useState } from "react";
import { CopyContext } from "../App";
import { IBoards } from "../types/boards";
import SmallDropdown from "./operations/SmallDropdown";
import hidebar from "../assets/icon-hide-sidebar.svg";
import showBar from "../assets/icon-show-sidebar.svg";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { copy, currentBoard, setCurrentBoard, setIsModalOpen } =
    useContext(CopyContext);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <>
      <div className="container">
        {showSidebar && (
          <div className="sidebar">
            <div>
              <img src={Logo} alt="Logo" className="logo" />

              <div className="sidebar-boards">
                <h4>ALL BOARDS({copy.length})</h4>

                <div>
                  {copy.map((board: IBoards, index: number) => (
                    <div
                      key={board.name}
                      onClick={() => setCurrentBoard(index)}
                      // className={handleChosen(board)}
                      className={`list-board ${
                        board.name === copy[currentBoard].name ? "active" : ""
                      }`}
                    >
                      <img src={boardImg} alt="board" />
                      {board.name}
                    </div>
                  ))}
                  <div
                    className="list-board blue"
                    onClick={() => setIsModalOpen("add_new_board")}
                  >
                    <img src={boardImg} alt="board" />+ Create New Board
                  </div>
                </div>
              </div>
            </div>
            <div className="list-board" onClick={() => setShowSidebar(false)}>
              <img src={hidebar} alt="eyes-closed" /> Hide Sidebar
            </div>
          </div>
        )}

        <div className={showSidebar ? "header" : "header full"}>
          {!showSidebar && <img src={Logo} alt="logo" className="logo" />}
          <h1 className={!showSidebar ? "grow" : ""}>
            {copy[currentBoard].name}
          </h1>
          <div className="parent">
            <button onClick={() => setIsModalOpen("task_form")}>
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
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </div>
        </div>

        {!showSidebar && (
          <div
            onClick={() => setShowSidebar(true)}
            className="list-board absolute"
          >
            <img src={showBar} alt="eye open" />
          </div>
        )}
        <main className={showSidebar ? "test" : "test full"}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
