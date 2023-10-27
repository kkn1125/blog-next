import { Article } from "@/util/types";
import React, { createContext, useReducer } from "react";

interface PostValue {
  posts: Article[];
}

interface PostAction {
  type: POST_INIT;
  posts: Article[];
}

const initialValues: PostValue = {
  posts: [],
};

export enum POST_INIT {
  INIT = "post/initial",
}

export const PostContext = createContext({ posts: [] as Article[] });
export const PostDispatchContext = createContext(new Function());

const reducer = (state: PostValue, action: PostAction) => {
  switch (action.type) {
    case POST_INIT.INIT:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return { ...state };
  }
};

export const PostProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  return (
    <PostDispatchContext.Provider value={dispatch}>
      <PostContext.Provider value={state as any}>
        {children}
      </PostContext.Provider>
    </PostDispatchContext.Provider>
  );
};
