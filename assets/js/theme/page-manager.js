export default class PageManager {
    constructor(context) {
        this.context = context;
    }

    type() {
        return this.constructor.name;
    }

    onReady() {
    }

    onBefore() {
        this.grMoveHtmlToDropzones();
    }

    grMoveHtmlToDropzones() {
        // console.log('PageManager.gr_moveHtmlToDropzones: start');
        $('.gr-dropzone').each(function moveDropzoneContent() {
            // console.log('PageManager.gr_moveHtmlToDropzones: dropzone content found');
            const $this = $(this);
            const zoneId = $this.data('gr-zone');
            // console.log(`PageManager.gr_moveHtmlToDropzones: target zone=${zoneId}`);
            if (zoneId) {
                const $zone = $(`#${zoneId}`);
                if ($zone.length > 0) {
                   // console.log(`PageManager.gr_moveHtmlToDropzones: Moving zone to dropzone #${zoneId}`);
                    $zone.html($this.html());   // copy the html to where it should be
                } else {
                   // console.warn(`PageManager.gr_moveHtmlToDropzones: dropzone #${zoneId} not found.`);
                }
            } else {
               // console.warn('PageManager.gr_moveHtmlToDropzones: dropzone %o has no target.', $this);
            }
            $this.remove();            // remove the html from its temporary location
        });
         // console.log('PageManager.gr_moveHtmlToDropzones: end');
    }

    static load(context) {
        const page = new this(context);

        $(document).ready(() => {
            page.onBefore.bind(page)();
            page.onReady.bind(page)();
        });
    }
}
