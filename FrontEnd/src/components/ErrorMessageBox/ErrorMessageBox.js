import './ErrorMessageBox.css';

export const ErrorMessageBox = (text) => {
    const div = document.createElement('div');
    div.className = 'error-message-box';
    div.innerHTML = text || 'Ops! Algo deu errado!';
    return div;
}