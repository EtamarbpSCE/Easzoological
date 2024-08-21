import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight:700
                },
                containedPrimary: {
                    color: '#ffffff', // Set the text color for secondary buttons
                },
                // containedSecondary: {
                //     color: '#fffff', // Set the text color for secondary buttons
                // },
            },
        },
    },
    palette: {
        // text: {
        //     primary: '#ff5722', // Replace with your desired color
        //     secondary: '#4caf50', // Optional: Secondary text color
        // },
        primary: {
            main: '#ea9937', // Replace with your desired color
        },
        secondary: {
            main: '#ea9937', // Replace with your desired color
        },
    },
});

export default theme;
