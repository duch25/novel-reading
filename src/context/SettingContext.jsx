/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react';

const SettingContext = createContext();

const initialState = {
  fontSize: 16,
  fontFamily: 'Roboto',
  lineHeight: 1.5,
  color: '#fff',
};

function reducer(state, action) {
  switch (action.type) {
    case 'color':
      return { ...state, color: action.payload };
    case 'fontSize':
      return { ...state, fontSize: action.payload };
    case 'fontFamily':
      return { ...state, fontFamily: action.payload };
    case 'lineHeight':
      return { ...state, lineHeight: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

function SettingProvider({ children }) {
  const [{ color, fontFamily, fontSize, lineHeight }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const handleChangeColor = color => {
    dispatch({ type: 'color', payload: color });
  };

  const handleChangeFontFamily = fontFamily => {
    dispatch({ type: 'fontFamily', payload: fontFamily });
  };

  const handleChangeFontSize = delta => {
    let data = fontSize + delta;
    if (data > 64) data = 64;
    if (data < 12) data = 12;

    dispatch({ type: 'fontSize', payload: data });
  };

  const handleChangeLineHeight = delta => {
    let data = lineHeight + delta;
    if (data > 2) data = 2;
    if (data < 1) data = 1;

    dispatch({ type: 'lineHeight', payload: data });
  };

  return (
    <SettingContext.Provider
      value={{
        color,
        fontFamily,
        fontSize,
        lineHeight,
        handleChangeFontSize,
        handleChangeLineHeight,
        handleChangeFontFamily,
        handleChangeColor,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

function useSetting() {
  const context = useContext(SettingContext);
  if (context === undefined)
    throw new Error('SettingContext was used outside the SettingProvider');
  return context;
}

export { SettingProvider, useSetting };
