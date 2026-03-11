import { byteSize, openFile, toBase64 } from '@/shared/jhipster/data-utils';
import { getPageNumberFromLinkHeader } from '@/shared/jhipster/link-header';

/**
 * A composable utility for data.
 */
const useDataUtils = () => ({
  /**
   * Method to abbreviate the text given
   */
  abbreviate(text, append = '...') {
    if (text.length < 30) {
      return text;
    }
    return text ? text.substring(0, 15) + append + text.slice(-10) : '';
  },

  /**
   * Method to find the byte size of the string provides
   */
  byteSize(base64String) {
    return byteSize(base64String);
  },

  /**
   * Method to open file
   */
  openFile(contentType, data) {
    openFile(data, contentType);
  },

  /**
   * Method to clear the input
   */
  clearInputImage(entity, elementRef, field, fieldContentType, idInput) {
    if (entity && field && fieldContentType) {
      if (Object.hasOwn(entity, field)) {
        entity[field] = null;
      }
      if (Object.hasOwn(entity, fieldContentType)) {
        entity[fieldContentType] = null;
      }
      if (elementRef && idInput && elementRef.nativeElement.querySelector(`#${idInput}`)) {
        elementRef.nativeElement.querySelector(`#${idInput}`).value = null;
      }
    }
  },

  setFileData(event, entity, field, isImage) {
    if (event?.target.files?.[0]) {
      const file = event.target.files[0];
      if (isImage && !file.type.startsWith('image/')) {
        return;
      }
      toBase64(file, base64Data => {
        entity[field] = base64Data;
        entity[`${field}ContentType`] = file.type;
      });
    }
  },

  /**
   * Method to download file
   */
  downloadFile(contentType, data, fileName) {
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: contentType,
    });
    const tempLink = document.createElement('a');
    tempLink.href = window.URL.createObjectURL(blob);
    tempLink.download = fileName;
    tempLink.target = '_blank';
    tempLink.click();
  },

  /**
   * Method to parse header links
   */
  parseLinks(header) {
    try {
      return getPageNumberFromLinkHeader(header);
    } catch {
      return {};
    }
  },
});

export default useDataUtils;
