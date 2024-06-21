/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const SettingContext = createContext();

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
  const [personalization, setPersonalization] = useLocalStorageState(
    {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Roboto',
      lineHeight: 1.5,
    },
    'personalization',
  );

  const initialState = personalization;
  const [{ color, fontFamily, fontSize, lineHeight }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const handleChangeColor = color => {
    let newPersonalization = { ...initialState, color: color };
    setPersonalization(newPersonalization);

    dispatch({ type: 'color', payload: color });
  };

  const handleChangeFontFamily = fontFamily => {
    let newPersonalization = { ...initialState, fontFamily: fontFamily };
    setPersonalization(newPersonalization);

    dispatch({ type: 'fontFamily', payload: fontFamily });
  };

  const handleChangeFontSize = delta => {
    let actualFontSize = fontSize + delta;

    if (actualFontSize > 64) actualFontSize = 64;
    if (actualFontSize < 12) actualFontSize = 12;

    let newPersonalization = { ...initialState, fontSize: actualFontSize };
    setPersonalization(newPersonalization);

    dispatch({ type: 'fontSize', payload: actualFontSize });
  };

  const handleChangeLineHeight = delta => {
    let actualLineHeight = lineHeight + delta;
    if (actualLineHeight > 2) actualLineHeight = 2;
    if (actualLineHeight < 1) actualLineHeight = 1;

    let newPersonalization = { ...initialState, lineHeight: actualLineHeight };
    setPersonalization(newPersonalization);

    dispatch({ type: 'lineHeight', payload: actualLineHeight });
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
