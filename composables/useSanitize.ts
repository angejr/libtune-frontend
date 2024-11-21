import DOMPurify from 'dompurify';

export const useSanitize = (dirty : string) => {
    return DOMPurify.sanitize(dirty)
};