import React, { createContext, useReducer } from "react";

export type Comment = {
  title: string;
  comments: number;
};

export type CommentState = {
  comments: Comment[];
};

const initialState: CommentState = {
  comments: [],
};

export const CommentContext = createContext(initialState);
export const CommentDispatchContext = createContext(new Function());

export enum CommentType {
  LOAD = "comment/load",
}

type CommentAction = {
  type: CommentType;
  comments: Comment[];
};

export function findComment(comments: Comment[], slug: string) {
  return comments.find((comment) => comment.title === slug);
}

const reducer = (state: CommentState, action: CommentAction) => {
  switch (action.type) {
    case "comment/load":
      return {
        comments: action.comments,
      };
    default:
      return state;
  }
};

function CommentProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[] | string | string[];
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CommentDispatchContext.Provider value={dispatch}>
      <CommentContext.Provider value={state}>
        {children}
      </CommentContext.Provider>
    </CommentDispatchContext.Provider>
  );
}

export default CommentProvider;
