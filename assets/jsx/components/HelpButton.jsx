import { Button } from "@wordpress/components";
import { __ } from '@publishpress/hub-i18n';

export const HelpButton = () => {
    const helpUrl = 'https://publishpress.com/publishpress-support/';

    const handleClick = () => {
        window.open(helpUrl, '_blank');
    }

    return (
        <Button icon="editor-help" onClick={handleClick} className="publishpress-hub-help-button">
            {__('Need Help?', 'publishpress-hub')}
        </Button>
    )
}

export default HelpButton;
