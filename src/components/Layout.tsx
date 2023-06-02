import Logo from "../assets/logo-light.svg";
import dots from "../assets/icon-vertical-ellipsis.svg";
import boardImg from "../assets/icon-board.svg";

type Props = {
  children: React.ReactNode;
  boards: any;
  setCurrentBoard: (index: number) => void;
  currentBoard: number;
  setIsModalOpen: (modal: boolean) => void;
};

const Layout = (props: Props) => {
  // Getitng which board is selected
  const handleChosen = (item: { name: any }) => {
    if (item.name === props.boards[props.currentBoard].name) {
      return "list-board active";
    }
    return "list-board";
  };
  return (
    <>
      <div className="container">
        <div className="sidebar">
          <img src={Logo} alt="Logo" className="logo" />

          <div className="sidebar-boards">
            <h4>All Boards({props.boards.length})</h4>

            <div>
              {props.boards.map((board: any, index: number) => (
                <div
                  key={index}
                  onClick={() => props.setCurrentBoard(index)}
                  className={handleChosen(board)}
                >
                  <img src={boardImg} alt="board" />
                  {board.name}
                </div>
              ))}
              <div className="list-board blue">
                <img src={boardImg} alt="board" />+ Create New Board
              </div>
            </div>
          </div>
        </div>

        <div className="header">
          <h1>{props.boards[props.currentBoard].name}</h1>
          <div>
            <button onClick={() => props.setIsModalOpen(true)}>
              + Add New Task
            </button>
            <img src={dots} alt="dots" />
          </div>
        </div>
        <main className="test">{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
