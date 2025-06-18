import { Button } from "../buttons/button";
import { __ } from "@publishpress/hub-i18n";

export const FilterButtonsBar = ({
    options,
    selectedOption,
    onSelect,
    children,
    className,
}) => {
    if (!options) {
        return null;
    }

    if (!options.length) {
        return null;
    }

    return (
        <div className={`publishpress-hub-filter-buttons-bar ${className}`}>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">{__('Select an option', 'publishpress-hub')}</label>
                <select id="tabs" className="block w-full max-w-none py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm rounded-md" onChange={(e) => {onSelect(e.target.value)}}>
                    <optgroup label={__('Options', 'publishpress-hub')}>
                        {options.map((filter) => {
                            return (
                                <option key={filter.value} value={filter.value}>{filter.label} ({filter.total})</option>
                            )
                        })}
                    </optgroup>
                </select>
            </div>

            <div className="hidden sm:block">

                <div className="publishpress-hub-filter-buttons-bar">
                    {options.map((filter) => {
                        let isSelected = selectedOption === filter.value;
                        let buttonClass = isSelected ? 'active' : '';
                        let isDisabled = ! filter.total;

                        return (
                            <Button key={filter.value} className={`publishpress-hub-filter-button ${buttonClass} ${isDisabled ? 'disabled' : ''}`} onClick={() => {onSelect(filter.value)}} disabled={filter.total === 0}>
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
