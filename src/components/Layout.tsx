import Logo from "../assets/logo-light.svg";
import dots from "../assets/icon-vertical-ellipsis.svg";

type Props = {
  children: React.ReactNode;
  boards: any;
  setCurrentBoard: (index: number) => void;
};

const Layout = (props: Props) => {
  return (
    <>
      <div className="container">
        <div className="sidebar">
          <img src={Logo} alt="Logo" />

          <div className="sidebar-boards">
            <p className="sidebar-p">All Boards({props.boards.length})</p>

            <div>
              {props.boards.map((board: any, index: number) => (
                <div
                  key={index}
                  onClick={() => props.setCurrentBoard(index)}
                  className="list-board"
                >
                  {board.name}
                </div>
              ))}
              <div className="list-board blue">+ Create New Board</div>
            </div>
          </div>
        </div>

        <div className="header">
          {/* <h1>{props.boards.name}</h1> */}
          <div>
            <button>+ Add New Task</button>
            <img src={dots} alt="" />
          </div>
        </div>
        <div className="test">{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
