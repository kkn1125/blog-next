import React, { createContext, useReducer } from "react";

interface VisitorValue {
  user: any;
  visitCount: number;
  readInfo: { sawList: string[] };
}

interface VisitorAction {
  type: VISITOR_INIT;
}

const initialValues: VisitorValue = {
  user: null,
  visitCount: 0,
  readInfo: {
    sawList: [],
  },
};

enum VISITOR_INIT {
  INIT = "visitor/initial",
}

const visitorContext = createContext({});
const visitorDispatchContext = createContext(new Function());

const reducer = (state: VisitorValue, action: VisitorAction) => {
  switch (action.type) {
    case VISITOR_INIT.INIT:
      return state;
    default:
      return state;
  }
};

export const VisitorProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  return (
    <visitorDispatchContext.Provider value={dispatch}>
      <visitorContext.Provider value={state}>
        {children}
      </visitorContext.Provider>
    </visitorDispatchContext.Provider>
  );
};
