
import ImageCompress from 'quill-image-compress';
import * as Quill from 'quill';
Quill.register('modules/imageCompress', ImageCompress);

export const config = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote'],
        [{ header: 1 }, { header: 2 }, {header: 3}],               // custom button values
        [{ list: 'ordered'}, { list: 'bullet' }],
        // [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
        [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
        // [{ direction: 'rtl' }],                         // text direction
        [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
        // [{ 'font': [] }],
        [{ align: [] }],
        ['clean'],                                         // remove formatting button
        ['link', 'image', 'video']                         // link and image, video
    ],
    clipboard: {
        matchVisual: false // https://quilljs.com/docs/modules/clipboard/#matchvisual
    },
    imageCompress: {
        quality: 0.7, // default
        maxWidth: 800, // default
        maxHeight: 1000, // default
        imageType: 'image/jpeg', // default
        debug: true, // default
    }
    // placeholder:'asdf ...'
};

export const configReply = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote'],
        [{ header: 1 }, { header: 2 }],               // custom button values
        [{ list: 'ordered'}, { list: 'bullet' }],
        // [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
        [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
        // [{ direction: 'rtl' }],                         // text direction
        [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
        // [{ 'font': [] }],
        [{ align: [] }],
        ['link', 'image', 'video'],                        // link and image, video
        ['clean']                                       // remove formatting button
    ],
    imageCompress: {
        quality: 0.5, // default
        maxWidth: 500, // default
        maxHeight: 500, // default
        imageType: 'image/jpeg', // default
        debug: true // default
    }
    // placeholder:'asdf ...'
}