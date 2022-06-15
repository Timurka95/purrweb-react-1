import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Column } from "./";
import { MainAppRowArray } from "../../../assets/types"

interface CardProps {
  onSetCardTitle: (value: string) => void;
  newCardTitle: string;
  deleteCommentName: string;
  descriptionContain: string;
  commentsList: string[];
  setRowTitles: (value: MainAppRowArray[]) => void;
  onDeleteCard: (value: boolean) => void;
  cardTitle: string;
  deleteCardButtonFlag: boolean;
  onClickCardTitle: (title: string, flag: boolean, rowTitle: string) => void;
};

const Card = (props: CardProps) => {
  const [rowTitles, setRowTitles] = useState<MainAppRowArray[]>([
    { RowName: "TODO", Cards: [] },
    { RowName: "In Progress", Cards: [] },
    { RowName: "Testing", Cards: [] },
    { RowName: "Done", Cards: [] },
  ]);
  const [addAnotherRowFlag, setAddAnotherRowFlag] = useState(false);
  const addAnotherRowInput = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cloneRowTitles = [...rowTitles];
    for (let i in cloneRowTitles) {
      for (let j in cloneRowTitles[i].Cards) {
        if (
          cloneRowTitles[i].Cards[j].CardName ===
          props.cardTitle
        ) {
          cloneRowTitles[i].Cards[j].CardDescription =
            props.descriptionContain;
          setRowTitles(cloneRowTitles.concat([]));
          break;
        }
      }
    }
  }, [props.descriptionContain]);

  useEffect(() => {
    let cloneRowTitles = [...rowTitles];
    for (let i in cloneRowTitles) {
      for (let j in cloneRowTitles[i].Cards) {
        if (
          cloneRowTitles[i].Cards[j].CardName ===
          props.cardTitle
        ) {
          cloneRowTitles[i].Cards[j].CardName = props.newCardTitle;
          setRowTitles(cloneRowTitles.concat([]));
          props.onSetCardTitle(props.newCardTitle);
          break;
        }
      }
    }
  }, [props.newCardTitle]);

  useEffect(() => {
    let cloneRowTitles = localStorage.getItem("RowTitles");
    cloneRowTitles != null
      ? setRowTitles(JSON.parse(cloneRowTitles))
      : setRowTitles(rowTitles);
  }, []);

  useEffect(() => {
    let cloneRowTitles = [...rowTitles];
    for (let i in cloneRowTitles) {
      for (let j in cloneRowTitles[i].Cards) {
        if (
          cloneRowTitles[i].Cards[j].CardName ===
          props.cardTitle
        ) {
          cloneRowTitles[i].Cards[j].CardComments = props.commentsList;
          setRowTitles(cloneRowTitles.concat([]));
          break;
        }
      }
    }
  }, [props.commentsList]);

  useEffect(() => {
    localStorage.setItem("RowTitles", JSON.stringify(rowTitles));
    props.setRowTitles(rowTitles);
  }, [rowTitles]);

  useEffect(() => {
    if (props.deleteCommentName === undefined) return;
    let cloneRowTitles = [...rowTitles];
    for (let i in cloneRowTitles) {
      for (let j in cloneRowTitles[i].Cards) {
        for (let y in cloneRowTitles[i].Cards[j].CardComments) {
          if (
            cloneRowTitles[i].Cards[j].CardComments[y] ===
            props.deleteCommentName
          ) {
            cloneRowTitles[i].Cards[j].CardComments.splice(Number(y), 1);
            setRowTitles(cloneRowTitles.concat([]));
            break;
          }
        }
      }
    }
  }, [props.deleteCommentName]);

  useEffect(() => {
    for (let i in rowTitles) {
      for (let j in rowTitles[i].Cards) {
        if (
          rowTitles[i].Cards[j].CardName === props.cardTitle
        ) {
          rowTitles[i].Cards = Array.prototype.slice.call(rowTitles[i].Cards); // Array
          rowTitles[i].Cards.splice(Number(j), 1);
          break;
        }
      }
    }
    localStorage.setItem("RowTitles", JSON.stringify(rowTitles));
    props.onDeleteCard(false);
  }, [props.deleteCardButtonFlag]);

  const handleAddAnotherRow = () => {
    let pureValue = addAnotherRowInput.current?.value.trim();
    if (pureValue === undefined) return;
    if (pureValue?.length === 0) return;
    let RowObject: MainAppRowArray = {
      RowName: pureValue,
      Cards: [],
    };
    setRowTitles(rowTitles.concat(RowObject));
    setAddAnotherRowFlag(false);
  };

  const handleAddUsersCard = (inputValue: string, currentTitle: string) => {
    let pureInputValue = inputValue.trim();
    if (pureInputValue.length === 0) return;
    for (let i in rowTitles) {
      if (rowTitles[i].RowName === currentTitle) {
        let cloneRowTitles = rowTitles;
        let newCardObjectData = {
          CardName: inputValue,
          CardDescription: "Add a more detailed description...",
          CardComments: [],
        };
        cloneRowTitles[i].Cards.push(newCardObjectData);
        setRowTitles(cloneRowTitles);
        break;
      }
    }
    setRowTitles(rowTitles.concat([]));
  }

  const handleSetEditedRowTitle = (newName: string, oldName: string) => {
    let cloneRowTitles = rowTitles;
    cloneRowTitles.map((elem) => {
      if (elem.RowName === oldName) {
        return (elem.RowName = newName);
      }
    });
    setRowTitles(cloneRowTitles.concat([]));
  }

  const handleDeleteRow = (neededTitle: string) => {
    let cloneRowTitles = rowTitles;
    for (let i in cloneRowTitles) {
      if (cloneRowTitles[i].RowName === neededTitle) {
        cloneRowTitles.splice(parseInt(i), 1);
        break;
      }
    }
    setRowTitles(cloneRowTitles.concat([]));
  }

  return (
    <Wrapper>
      {rowTitles.map((title, index) => {
        return (
          <Column
            key={`${title}-${index}`}
            onDeleteRow={handleDeleteRow}
            setEditedTitle={handleSetEditedRowTitle}
            onClickCardTitle={props.onClickCardTitle}
            onAddUsersCard={handleAddUsersCard}
            cardData={title.Cards}
            title={title.RowName}
          />
        );
      })}
      {addAnotherRowFlag === false ? (
        <AddAnotherRow
          onClick={() => {
            setAddAnotherRowFlag(!addAnotherRowFlag);
          }}
        >
          Add column
        </AddAnotherRow>
      ) : (
        <AddAnotherRowWrapper>
          <AddAnotherRowInput
            placeholder="Enter list title"
            ref={addAnotherRowInput}
          ></AddAnotherRowInput>
          <AddAnotherRowAddButton
            onClick={handleAddAnotherRow}
          >
            Add list
          </AddAnotherRowAddButton>
          <AddAnotherRowCancelButton
            onClick={() => {
              setAddAnotherRowFlag(!addAnotherRowFlag);
            }}
          >
            Cancel
          </AddAnotherRowCancelButton>
        </AddAnotherRowWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  justify-content: flex-start;
  margin-left: 3%;
`;

const AddAnotherRow = styled.button`
  background-color: #4e9c9c;
  cursor: pointer;
  border: none;
  text-align: center;
  min-width: 200px;
  color: white;
  font-size: 16px;
  padding: 10px 0px;
  border-radius: 15px;

  :hover {
    background-color: #1f5353;
    transition: 0.5s;
  }
`;

const AddAnotherRowWrapper = styled.div`
  background-color: #ebecf0;
  margin-right: 10px;
  position: relative;
  min-width: 200px;
  border-radius: 15px;
  max-width: 210px;
  padding: 15px 15px 10px 15px;
`;

const AddAnotherRowInput = styled.input`
  width: -webkit-fill-available;
  padding: 5px 0px 5px 5px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  margin-bottom: 20px;

  ::placeholder {
    opacity: 0.5;
  }

  :focus {
    ::placeholder {
      color: white;
      transition: 0.4s;
    }
  }
`;

const AddAnotherRowAddButton = styled.button`
  font-size: 14px;
  border: none;
  border-radius: 15px;
  background: #4d9c9c;
  color: #ffffff;
  position: relative;
  width: 45%;
  text-align: center;
  padding: 3px 0px 3px 0px;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 10px;

  :hover {
    background-color: #1f5353;
    transition: 0.5s;
  }
`;

const AddAnotherRowCancelButton = styled.button`
  font-size: 14px;
  border: none;
  border-radius: 15px;
  background: #9c4d4d;
  color: #ffffff;
  position: relative;
  width: 45%;
  text-align: center;
  padding: 3px 0px 3px 0px;
  cursor: pointer;
  margin-right: 5px;

  :hover {
    background-color: #531f1f;
    transition: 0.5s;
  }
`;

export default Card;
