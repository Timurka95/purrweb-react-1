import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainAppRowArray } from "../../../../assets/types";

interface EditCardModalProps {
  rowName: string;
  onDeleteComment: (value: string) => void;
  onEditCardTitle: (value: string | undefined) => void;
  getDescription: (value: string | undefined) => void;
  getCommentsList: (array: string[]) => void;
  rowTitlesArray: MainAppRowArray[];
  onDeleteCard: (value: boolean) => void;
  hideEditCardModal: (value: boolean) => void;
  cardTitle: string;
}

const EditCardModal: React.FC<any> = ({
  rowName,
  onDeleteComment,
  onEditCardTitle,
  getDescription,
  getCommentsList,
  rowTitlesArray,
  onDeleteCard,
  hideEditCardModal,
  cardTitle,
}: EditCardModalProps) => {
  const [editCardTitleFlag, setEditCardTitleFlag] = useState<boolean>(false);
  const [editDescriptionFlag, setEditDescriptionFlag] =
    useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<any[]>([]);
  const [descriptionContain, setDescriptionContain] = useState<string>(
    "Add a more detailed description..."
  );
  const editCardTitleInputField = React.useRef<HTMLInputElement>(null);
  const descriptionInputField = React.useRef<HTMLInputElement>(null);
  const commentsInputField = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    for (let i in rowTitlesArray) {
      for (let j in rowTitlesArray[i].Cards) {
        if (rowTitlesArray[i].Cards[j].CardName === cardTitle) {
          setCommentsList(rowTitlesArray[i].Cards[j].CardComments);
          setDescriptionContain(rowTitlesArray[i].Cards[j].CardDescription);
          break;
        }
      }
    }
  }, [rowTitlesArray]);

  const saveNewTitle = (event: any) => {
    if (event.key === "Enter") {
      saveEditedCardTitle();
    }
  };

  const saveNewDescription = (event: any) => {
    const value = editCardTitleInputField.current?.value.trim();

    if (event.key === "Enter") {
      if (value?.length === 0) return;

      setDescriptionContain(descriptionInputField.current?.value + "");
      getDescription(descriptionInputField.current?.value);
      setEditDescriptionFlag(false);
    }
  };

  const saveNewComment = (event: any) => {
    if (event.key === "Enter") {
      addNewComment();
    }
  };

  const addNewComment = () => {
    const value = commentsInputField.current?.value.trim();

    if (value?.length === 0) return;

    commentsList.push(commentsInputField.current?.value + "");
    setCommentsList(commentsList);
    getCommentsList(commentsList.concat([]));
  };

  const saveEditedCardTitle = () => {
    const value = editCardTitleInputField.current?.value.trim();

    if (value?.length === 0) return;
    
    setEditCardTitleFlag(false);
    onEditCardTitle(editCardTitleInputField.current?.value + "");
  };

  return (
    <Wrapper>
      <WindowOverlay>
        <CardModalWrapper>
          <HeaderWrapper>
            <InformationWrapper>
              {editCardTitleFlag === false ? (
                <TitleWrapper>
                  <Title
                    onClick={() => {
                      setEditCardTitleFlag(true);
                    }}
                  >
                    {cardTitle}
                  </Title>
                </TitleWrapper>
              ) : (
                <TitleWrapper>
                  <TitleInput
                    defaultValue={cardTitle}
                    ref={editCardTitleInputField}
                    onKeyDown={saveNewTitle}
                  />
                  <SaveEditedCardTitle onClick={saveEditedCardTitle}>
                    Save
                  </SaveEditedCardTitle>
                </TitleWrapper>
              )}

              <ListOwner>
                Author - <b>{localStorage.getItem("userName")}</b>
              </ListOwner>
              <CurrentRowWrapper>
                <CurrentRowTitle>
                  In row <b>{rowName}</b>
                </CurrentRowTitle>
              </CurrentRowWrapper>
            </InformationWrapper>
            <CloseButton>
              <HideCardModalWindow onClick={() => hideEditCardModal(false)}>
                Close
              </HideCardModalWindow>
              <DeleteCardButton
                onClick={() => {
                  onDeleteCard(true);
                }}
              >
                Delete
              </DeleteCardButton>
            </CloseButton>
          </HeaderWrapper>

          <DescriptionWrapper>
            <DescriptionTitle>Description</DescriptionTitle>
            {editDescriptionFlag === false ? (
              <DescriptionText onClick={() => setEditDescriptionFlag(true)}>
                {descriptionContain}
              </DescriptionText>
            ) : (
              <DescriptionTextInput
                ref={descriptionInputField}
                onKeyDown={saveNewDescription}
                defaultValue={descriptionContain}
              />
            )}
          </DescriptionWrapper>
          <CommentsWrapper>
            <CommentsTitle>Comments</CommentsTitle>
            <CommentsInputFieldBlock
              ref={commentsInputField}
              onKeyDown={saveNewComment}
            />
            <AddCommentButton onClick={addNewComment}>+</AddCommentButton>

            {commentsList.map((comment, index) => {
              return (
                <>
                  <CommentOwner>
                    {localStorage.getItem("userName")}
                  </CommentOwner>
                  <Comment>
                    <NewComment key={`${comment}-${index}`}>
                      {comment}{" "}
                    </NewComment>
                    <DeleteCommentButton
                      key={commentsList.indexOf(comment, 0)}
                      onClick={() => onDeleteComment(comment)}
                    >
                      x
                    </DeleteCommentButton>
                  </Comment>
                </>
              );
            })}
          </CommentsWrapper>
        </CardModalWrapper>
        <BlackLayer
          onClick={() => {
            hideEditCardModal(false);
          }}
        ></BlackLayer>
      </WindowOverlay>
    </Wrapper>
  );
};

const Comment = styled.div`
  display: flex;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px 10px 20px;
  outline: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: #4d9c9c;
  color: #ffffff;
  transition: 0.5s;

  :hover {
    background-color: #1f5353;
    border-radius: 20px;
    transition: 0.5s;
  }
`;

const Input = styled.input`
  font-size: 16px;
  background-color: #eaecf0;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  outline: none
  transition: 0.5s;

  :hover {
    border-radius: 20px;
    transition: 0.5s;
  }
`;

const CardModalWrapper = styled.div`
  padding: 10px;
  z-index: 11;
  position: relative;
  background-color: white;
  border-radius: 15px;
  width: 1000px;
  min-heigth: 400px;
`;

const BlackLayer = styled.div`
  background-color: #505765;
  opacity: 0.6;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index 10;
`;

const WindowOverlay = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: fixed;
  top: 0;
  margin-top: 5%;
  overflow: scroll;
  z-index: 11;
  width: 100%;
  height: 100%;
  left: 0;
`;

const TitleWrapper = styled.div`
  width: 700px;
  min-width: 200px;
  margin: 20px 0px 0px 20px;
`;

const TitleInput = styled(Input)`
  width: 20%;
  margin-bottom: 16px;
`;

const Title = styled.p`
  font-size: 25px;
  color: #223556;
  font-weight: 500;
  padding: 20px 0px 10px 20p;
  word-break: break-all;
  cursor: pointer;
`;

const ListOwner = styled.p`
  font-size: 20px;
  color: #223556;
  padding-left: 20px;
`;

const CurrentRowWrapper = styled.div`
  margin-left: 20px;
`;

const CurrentRowTitle = styled.p`
  font-size: 20px;
`;

const DescriptionWrapper = styled.div`
  margin: 0px 0px 20px 20px;
  max-width: 70%;
  position: relative;
`;

const DescriptionTitle = styled.p`
  font-size: 20px;
  margin-bottom: initial;
`;

const DescriptionTextInput = styled(Input)`
  padding: 15px;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  outline: none;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  padding: 15px;
  background-color: #eaecf0;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  transition: 0.5s;
  color: #767676;

  :hover {
    transition: 0.5s;
    border-radius: 20px;
  }
`;

const CommentsWrapper = styled.div`
  position: relative;
  margin: 0px 0px 20px 20px;
  max-width: 70%;
`;

const CommentsTitle = styled.p`
  font-size: 20px;
  margin-top: initial;
`;

const CommentsInputFieldBlock = styled(Input)`
  padding: 15px;
  width: 87%;
  margin-bottom: 40px;
`;

const CommentOwner = styled.p`
  font-size: 14px;
  color: #223556;
  font-weight: bold;
  margin-left: 5px;
  margin-top: 5px;
`;

const NewComment = styled.p`
  font-size: 16px;
  padding: 15px;
  background-color: #eaecf0;
  border: none;
  border-radius: 10px;
  width: 87%;
  outline: none;
  margin-bottom: 0px;
  margin-top: 0px;
  word-break: break-word;
  transition: 0.5s;

  :hover {
    transition: 0.5s;
    border-radius: 20px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const HideCardModalWindow = styled(Button)`
  margin-top: 20px;
  margin-left: 160px;
  width: 90px;
`;

const DeleteCardButton = styled(Button)`
  margin-top: 20px;
  margin-left: 160px;
  width: 90px;
  background-color: #9c4d4d;

  :hover {
    background-color: #531f1f;
  }
`;

const AddCommentButton = styled(Button)`
  padding: 15px 20px 15px 20px;
  margin-left: 10px;
`;

const DeleteCommentButton = styled(Button)`
  position: relative;
  margin-left: 10px;
  background-color: #9c4d4d;

  :hover {
    background-color: #531f1f;
  }
`;

const SaveEditedCardTitle = styled(Button)`
  margin-left: 10px;
`;

const InformationWrapper = styled.div``;
const CloseButton = styled.div``;
const Wrapper = styled.div``;

export default EditCardModal;
