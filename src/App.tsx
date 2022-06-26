import React, { useEffect } from "react";
import { TrelloWorkspaceScreen } from "./pages/TrelloWorkspace/screens/";
import { ChangeNameModal } from "./components";
import "./assets/styles/App.css";
import { useState } from "react";
import { Provider, useDispatch } from 'react-redux';
import { rootActions, store } from "./store";
import { SubmitHandler, useForm } from "react-hook-form";

interface Name{
  userName: string,
}

function App() {
  const [userName, setUserName] = useState<string>();
  const [changeNameModalFlag, setChangeNameModalFlag] = useState(false);
  const isHasName = !!localStorage.getItem("userName");
  // const dispatch = useDispatch();

  // const {handleSubmit, control, reset, formState: {errors, isValid}} = useForm<Name>(
  //   {
  //     defaultValues: {
  //       userName: "",
  //     },
  //     mode: "onChange"
  //   }
  // )

  // const onSubmit: SubmitHandler<Name> = data => {
  //   const {userName} = data;
  //   dispatch(rootActions.auth.setName(userName));
  // }

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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
