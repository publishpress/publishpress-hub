import { Button } from "../buttons/button";
import { __ } from "@publishpress/hub-i18n";

export const FilterButtonsBar = ({
    options,
    selectedOption,
    onChange,
    children,
    className,
}) => {
    if (!options) {
        return null;
    }

    if (!options.length) {
        return null;
    }

    if (! selectedOption) {
        selectedOption = options[0].value;
    }

    return (
        <div className={`publishpress-hub-filter-container ${className}`}>
            <div className="publishpress-hub-filter-mobile">
                <label htmlFor="tabs" className="publishpress-hub-filter-label-sr">{__('Select an option', 'publishpress-hub')}</label>
                <select id="tabs" className="publishpress-hub-filter-select" onChange={(e) => {onChange(e.target.value)}}>
                    <optgroup label={__('Options', 'publishpress-hub')}>
                        {options.map((filter) => {
                            return (
                                <option key={filter.value} value={filter.value}>{filter.label} ({filter.total})</option>
                            )
                        })}
                    </optgroup>
                </select>
            </div>

            <div className="publishpress-hub-filter-desktop">
                <div className="publishpress-hub-filter-buttons-bar">
                    {options.map((filter) => {
                        let isSelected = selectedOption === filter.value;
                        let buttonClass = isSelected ? 'active' : '';
                        let isDisabled = ! filter.total;

                        return (
                            <Button key={filter.value} className={`publishpress-hub-filter-button ${buttonClass} ${isDisabled ? 'disabled' : ''}`} onClick={() => {onChange(filter.value)}} disabled={filter.total === 0}>
                                {filter.label} {filter.total > 0 && `(${filter.total})`}
                            </Button>
                        )
                    })}

                    {children}
                </div>
            </div>
        </div>
    )
}

export default FilterButtonsBar;
