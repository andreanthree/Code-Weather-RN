import { Dimensions } from 'react-native';

const WINDOW = Dimensions.get('window');

export function heightByScreen(size = 100) {
    return (size * WINDOW.height) / 100;
}

export function widthByScreen(size = 100) {
    return (size * WINDOW.width) / 100;
}
