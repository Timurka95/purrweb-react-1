import React, { KeyboardEventHandler } from "react";
import styled from "styled-components";
import { useState } from "react";
import Xicon from "../../../assets/images/X.png";

interface Props {
  key: string;
  onDeleteRow: (neededTitle: string) => void;
  setEditedTitle: (newName: string, oldName: string) => void;
  onClickCardTitle: (title: string, flag: boolean, rowTitle: string) => void;
  onAddUsersCard: (inputValue: string, currentTitle: string) => void;
  cardData: any[];
  title: string;
};

const Column = (props: Props) => {
  const [showAddMenuFlag, setShowAddMenuFlag] = useState(true);
  const [editRowTitleFlag, setEditRowTitleFlag] = useState(false);
  const cardTitleInputField = React.useRef<HTMLInputElement>(null);
  const newCardInputField = React.useRef<HTMLTextAreaElement>(null);

  const AddingAdditionalMenuField = (props: any) => {
    return (
      <AdditionalMenu>
        <AdditionalMenuInput ref={newCardInputField} />
        <AdditionalMenuUnderLine>
          <CancelButtom
            onClick={() => {
              setShowAddMenuFlag(true);
            }}
          >
            Cancel
          </CancelButtom>
          <AdditionalMenuUnderLineAddButton
            onClick={() => {
              props.props.onAddUsersCard(
                newCardInputField.current?.value,
                props.props.title
              );
            }}
          >
            {" "}
            Add card
          </AdditionalMenuUnderLineAddButton>
        </AdditionalMenuUnderLine>
      </AdditionalMenu>
    );
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      if (cardTitleInputField.current?.value === undefined) return;

      setEditRowTitleFlag(false);
      let pureValue = cardTitleInputField.current?.value.trim();

      if (pureValue === "") return;

      props.setEditedTitle(pureValue, props.title);
    }
  }

  return (
    <>
      <Wrapper>
        <TitleWrapper>
          {editRowTitleFlag === false ? (
            <CardTitle
              onClick={() => {
                setEditRowTitleFlag(true);
              }}
            >
              {props.title}
            </CardTitle>
          ) : (
            <CardTitleInput
              ref={cardTitleInputField}
              onKeyDown={handleKeyPress}
              placeholder={props.title}
            ></CardTitleInput>
          )}
          <DeleteRowButton
            onClick={() => {
              props.onDeleteRow(props.title);
            }}
          >
            <DeleteRowButtonImage src={Xicon}></DeleteRowButtonImage>
          </DeleteRowButton>
        </TitleWrapper>
        {props.cardData.map((elem: any) => {
          return (
            <Card
              key={props.cardData.indexOf(elem, 0)}
              onClick={() =>
                props.onClickCardTitle(elem.CardName, true, props.title)
              }
            >
              {elem.CardName}
            </Card>
          );
        })}

        {showAddMenuFlag === true ? (
          <AddCardButton
            onClick={() => {
              setShowAddMenuFlag(false);
            }}
          >
            +
          </AddCardButton>
        ) : (
          <AddingAdditionalMenuField props={props}></AddingAdditionalMenuField>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: #ebecf0;
  margin-right: 10px;
  position: relative;
  min-width: 200px;
  border-radius: 15px;
  max-width: 210px;
  padding: 5px 15px 10px 15px;
`;

const CardTitle = styled.p`
  color: #406d6a;
  font-size: 18px;
  white-space: wrap;
  word-wrap: break-word;
  font-weight: 500;
  cursor: pointer;
`;

const CardTitleInput = styled.input`
  color: #40516d;
  margin-top: 15px;
  font-size: 19px;
  position: relative;
  max-width: 85%;
  margin-bottom: 15px;
  overflow: visible;
  outline: none;
  border: 1px solid #0079bf;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  background-color: white;
`;

const AddCardButton = styled.button`
  font-size: 14px;
  border: none;
  border-radius: 15px;
  background: #4d9c9c;
  color: #ffffff;
  position: relative;
  width: 100%;
  text-align: center;
  padding: 3px 0px 3px 0px;
  cursor: pointer;
  :hover {
    background-color: #1f5353;
    color: #ffffff;
    border-radius: 15px;
    transition: 0.5s;
  }
`;

const AdditionalMenu = styled.div`
  diplay: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const AdditionalMenuInput = styled.textarea`
  position: relative;
  width: -webkit-fill-available;
  border: none;
  font-size: 17px;
  min-height: 40px;
  padding: 10px;
  border-radius: 10px;
  resize: vertical;
  max-height: 200px;
  outline: none;
  font-family: sans-serif;
`;

const AdditionalMenuUnderLine = styled.div`
  display: flex;
  position: relative;
  margin-top: 10px;
  align-items: center;
  flex-direction: row-reverse;
`;

const AdditionalMenuUnderLineAddButton = styled.button`
  background-color: #4d9c9c;
  padding: 8px 10px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-right: 5px;

  :hover {
    background-color: #1f5353;
    transition: 0.5s;
  }
`;

const CancelButtom = styled.button`
  background-color: #9c4d4d;
  padding: 8px 10px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 14px;
  cursor: pointer;

  :hover {
    background-color: #531f1f;
    transition: 0.5s;
  }
`;

const AdditionalMenuUnderLineDeleteButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 3px;
  background-color: #ebecf0;
  :hover {
    background: #b3b3b3;
    opacity: 0.5s;
  }
  margin-left: 10px;
`;

const AdditionalMenuUnderLineDeleteButtonImg = styled.img`
  width: 20px;
  padding: 6px 6px 2px 6px;
  height: 20px;
  opacity: 0.6;
`;

const Card = styled.p`
  color: #40516d;
  opacity: 0.7;
  font-size: 18px;
  white-space: wrap;
  word-wrap: break-word;
  font-weight: 500;
  background-color: white;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 7px 7px 7px 7px;
  border-radius: 10px;
  margin-top: 10px;

  :hover {
    opacity: 1;
    transition: 0.5s;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteRowButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  :hover {
    opacity: 0.3;
    transition: 0.5s;
  }
`;

const DeleteRowButtonImage = styled.img`
  width: 15px;
  opacity: 0.4;
  height: 13px;
`;

export default Column;
