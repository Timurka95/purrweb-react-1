import React, { useEffect } from "react";
import { TrelloWorkspaceScreen } from "./pages/TrelloWorkspace/screens/";
import { ChangeNameModal } from "./components";
import "./assets/styles/App.css";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState<string>();
  const [changeNameModalFlag, setChangeNameModalFlag] = useState(false);
  const isHasName = !!localStorage.getItem("userName");

  const handleSaveUserName = (value: string) => {
    setUserName(value)
  };

  const handleShowChangeNameModal = () => {
    return (
      <ChangeNameModal
        onSave={handleSaveUserName}
        currentName={userName}
        hideModal={setChangeNameModalFlag}
      />
    );
  }

  useEffect(() => {
    if (!isHasName) {
      <ChangeNameModal
        onSave={handleSaveUserName}
        currentName={userName}
        hideModal={setChangeNameModalFlag}
      />;
    }
  }, [isHasName, userName]);

  return (
    <div>
      {!isHasName && (
        <ChangeNameModal
          onSave={handleSaveUserName}
          hideModal={setChangeNameModalFlag}
        />
      )}
      <TrelloWorkspaceScreen
        onNameClick={handleShowChangeNameModal}
        changeNameModalFlag={changeNameModalFlag}
        setChangeNameModalFlag={setChangeNameModalFlag}
      />
    </div>
  );
}

export default App;
