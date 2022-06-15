import React from "react";
import styled from "styled-components";

interface ChangeNameModalProps {
  onSave: (value: string) => void;
  currentName?: string;
  hideModal: (value: boolean) => void;
}

const ChangeNameModal = ({
  onSave,
  currentName,
  hideModal,
}: ChangeNameModalProps) => {
  const inputField = React.useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    if (inputField === undefined) return;
    const inputValue = inputField.current?.value + "";
    const purValue = inputField.current?.value.trim();

    if (purValue?.length === 0) {
      alert("Put name");
      return;
    }

    localStorage.setItem("userName", inputValue);
    onSave(inputValue);
    hideModal(false);
  };

  const saveName = (event: any) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <Wrapper>
        <Input
          placeholder="Write your name"
          ref={inputField}
          defaultValue={currentName && currentName}
          onKeyDown={saveName}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  backdrop-filter: blur(10px);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 20px 0px;
  outline: none;
  font-size: 20px;
  width: 320px;
  text-align: center;
  margin-bottom: 40px;

  ::placeholder {
    font-size: 15px;
    text-transform: uppercase;
  }

  :hover {
    ::placeholder {
      color: white;
      transition: 0.5s;
    }
  }

  :focus {
    ::placeholder {
      color: white;
    }
  }
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  background-color: #4e9c9c;
  border: none;
  font-size: 20px;
  text-transform: uppercase;
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
`;

export default ChangeNameModal;
