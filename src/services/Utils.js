export const strongPasswordOptions = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10
};

export const capitalize = (string) => {
    let str = string.trim().toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const capitalizeEachWord = (string) => {
    return string.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

export const cropperLangExt = {
    hint: 'Click or drag the file here to upload',
    loading: 'Uploading…',
    noSupported: 'Browser is not supported, please use IE10+ or other browsers',
    success: 'Upload success',
    fail: 'Upload failed',
    preview: 'Preview',
    btn: {
        off: 'Cancel',
        close: 'Close',
        back: 'Back',
        save: 'Save'
    },
    error: {
        onlyImg: 'Image only',
        outOfSize: 'Image exceeds size limit: ',
        lowestPx: 'Image\'s size is too low. Expected at least: '
    }
};

// chunk the data into 100 items per array
export const chunkArrayMethod = (array, chunk = 100) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunk) {
        result.push(array.slice(i, i + chunk));
    }
    return result;
};

export const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
};

export const imagePlaceholder100 = '../assets/img/placeholder-100.jpg';

export const imagePlaceholder200 = '/assets/img/placeholder-200.jpg';

export const imagePlaceholder300 = '/assets/img/placeholder-300.jpg';

export const logoImage = '/assets/img/pressbox-logo.png';

export const editorToolbarOptionsOne = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'clean',
    'image',
    'video',
    'align',
    'list',
    'color',
    'background',
    'header',
    'script',
    'direction',
    'undo',
    'redo'
];