// this component shows a message to the user, it can be used to show errors or information

import './MessageBox.css';

export const MessageBox = (text, isError = false) => {
    const div = document.createElement('div');
    div.className = 'message-box';
    div.innerHTML = text || 'Ops! Algo deu errado!';

    if (isError) {
        div.style.borderColor = 'rgb(253, 82, 82)';
    }

    return div;
}