import { useCallback, memo } from '@wordpress/element';
import { Button } from "../buttons/button";
import { __ } from "@publishpress/hub-i18n";

const FilterButtonsBarComponent = ({
    options,
    selectedOption,
    onChange,
    children,
    className = '',
}) => {
    // Early returns for better performance
    if (!options || !options.length) {
        return null;
    }

    // Use the first option as default if none selected
    const activeSelectedOption = selectedOption || options[0].value;

    // Memoize the select change handler
    const handleSelectChange = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

    // Memoize the button click handler factory
    const createButtonClickHandler = useCallback((value) => () => {
        onChange(value);
    }, [onChange]);

    return (
        <div className={`publishpress-hub-filter-container ${className}`}>
            <div className="publishpress-hub-filter-mobile">
                <label htmlFor="tabs" className="publishpress-hub-filter-label-sr">
                    {__('Select an option', 'publishpress-hub')}
                </label>
                <select
                    id="tabs"
                    className="publishpress-hub-filter-select"
                    value={activeSelectedOption}
                    onChange={handleSelectChange}
                >
                    <optgroup label={__('Options', 'publishpress-hub')}>
                        {options.map((filter) => (
                            <option key={filter.value} value={filter.value}>
                                {filter.label} ({filter.total})
                            </option>
                        ))}
                    </optgroup>
                </select>
            </div>

            <div className="publishpress-hub-filter-desktop">
                <div className="publishpress-hub-filter-buttons-bar">
                    {options.map((filter) => {
                        const isSelected = activeSelectedOption === filter.value;
                        const buttonClass = isSelected ? 'active' : '';
                        const isDisabled = !filter.total;

                        return (
                            <Button
                                key={`filter-${filter.value}`}
                                className={`publishpress-hub-filter-button ${buttonClass} ${isDisabled ? 'disabled' : ''}`}
                                onClick={createButtonClickHandler(filter.value)}
                                disabled={filter.total === 0}
                            >
                                {filter.label} {filter.total > 0 && `(${filter.total})`}
                            </Button>
                        );
                    })}

                    {children}
                </div>
            </div>
        </div>
    );
};

// Memoize the component to prevent unnecessary re-renders
export const FilterButtonsBar = memo(FilterButtonsBarComponent);

export default FilterButtonsBar;
