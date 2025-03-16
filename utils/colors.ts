import { Appearance } from "react-native";

const theme = {
    dark: {
        text: 'white',
        background: '#121212',
        secondBackground: '#23252D',
        
        primary: '#00C896',
        border: '#5E5E5E'
    },
    light: {
        text: 'black',
        secondBackground:'white',
        background: '#FAFAFA',
        primary: '#00C896',
        border: '#dbdbdb'    

    }
  };

const isDarkMode = Appearance.getColorScheme() === 'dark';
export const colors = theme[isDarkMode ? 'dark' : 'light'];