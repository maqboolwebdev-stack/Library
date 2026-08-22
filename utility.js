// Helper utility functions
import { titleInput, titleError, authorError, authorInput, pageInput, pageError } from './script.js';

function showError(input, errorContainer, message) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    errorContainer.textContent = message;
}

function showSuccess(input, errorContainer) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorContainer.textContent = '';
}

function validateTitle() {
    if (titleInput.validity.valueMissing) {
        showError(titleInput, titleError, 'Title is required.')
        return false;
    }
    showSuccess(titleInput, titleError);
    return true;
};

function validateAuthor() {
    if (authorInput.validity.valueMissing) {
        showError(authorInput, authorError, 'The author name must be filled!.');
        return false;
    }
    showSuccess(authorInput, authorError);
    return true;

}

function validatePage() {
    if (pageInput.validity.valueMissing) {
        showError(pageInput, pageError, 'Page is required.')
        return false;
    } else if (pageInput.validity.rangeUnderflow || Number(pageInput.value) <= 0) {
        showError(pageInput, pageError, 'Page must be greater than 0.');
        return false;
    }

    showSuccess(pageInput, pageError);
    return true;
}


export { validateTitle, validateAuthor, validatePage };