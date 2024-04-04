export const colorPallete = {
  light: {
    text: {
      primary: "#0f0f0f",
      secondary: "#FFFFFF",
      important: "#0F4098",
    },
    background: {
      primary: "#FFFFFF",
      secondary: "#F2F2F2",
    },
    button: {
      primary: "#0F4098",
      secondary: "#FFFFFF",
    },
    input: {
      primary: "#cdcdcd",
      secondary: "#F2F2F2",
    },
  },
  dark: {
    text: {
      primary: "#FFFFFF",
      secondary: "#0f0f0f",
      important: "#985EFF",
    },
    background: {
      primary: "#212121",
      secondary: "#1e1c1c",
    },
    button: {
      primary: "#985EFF",
      secondary: "#0F4098",
    },
    input: {
      primary: "#212121",
      secondary: "#1e1c1c",
    },
  },
};
export let tema = localStorage.getItem('Tema') 

export function setTema(isDarkMode: boolean): void {
    if(isDarkMode){
        tema = 'dark'
    } else {
        tema = 'light'
    }

    console.log(tema)
    localStorage.setItem('Tema',tema)

}