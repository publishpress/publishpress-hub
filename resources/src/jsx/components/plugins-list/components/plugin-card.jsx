/**
 * Compact plugin card with a persistent action footer.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */
import { useEffect, useRef } from '@wordpress/element';
import { ToggleControl, Spinner } from '@wordpress/components';
import { __, sprintf } from '@publishpress-hub/i18n';
import { Button } from '../../buttons/button';
import { ActionButton } from './action-button';

const documentationCategories = {
    authors: 'publishpress-authors', blocks: 'blocks', capabilities: 'cme',
    checklists: 'checklists', future: 'future', permissions: 'presspermit',
    planner: 'publishpress', revisions: 'revisions', series: 'series',
    shortlinks: 'publishpress-shortlinks', statuses: 'publishpress-statuses',
    cart: 'publishpress-cart', taxonomies: 'publishpress-taxonomies',
    'tag-groups': 'publishpress-tag-groups',
};

export const PluginCard = ({
    pluginFamily, iconSrc, displayName, isFavorite, onToggleFavorite,
    actionButtons, progressStates, onActivate, onDeactivate, ...actions
}) => {
    const moreRef = useRef(null);

    useEffect(() => {
        const menu = moreRef.current;
        if (!menu) return;
        const ownerDocument = menu.ownerDocument;
        const dismissOutside = event => {
            if (menu.open && !menu.contains(event.target)) {
                menu.open = false;
            }
        };
        const dismissOnEscape = event => {
            if (event.key === 'Escape' && menu.open && menu.contains(event.target)) {
                menu.open = false;
                menu.querySelector('summary')?.focus();
                event.stopPropagation();
            }
        };
        ownerDocument.addEventListener('pointerdown', dismissOutside, true);
        menu.addEventListener('keydown', dismissOnEscape);
        return () => {
            ownerDocument.removeEventListener('pointerdown', dismissOutside, true);
            menu.removeEventListener('keydown', dismissOnEscape);
        };
    }, []);

    const busy = Object.values(progressStates).some(Boolean);
    const inProgress = progressStates.isInstalling || progressStates.isUpgrading || progressStates.isResolvingConflict;
    const active = pluginFamily.hasAnyVersionActive;
    const conflict = pluginFamily.hasConflictingInstallations;
    const category = documentationCategories[pluginFamily.slug];
    const documentationUrl = category
        ? `https://publishpress.com/docs-category/${category}/`
        : 'https://publishpress.com/knowledge-base/';
    const updateAction = actionButtons.find(button => button.key === 'update');
    const moreActions = actionButtons.filter(button => !['activate', 'deactivate', 'update'].includes(button.key));

    return (
        <article className={`pp-hub-plugin-card${isFavorite ? ' is-favorite' : ''}${busy ? ' is-busy' : ''}`}>
            <div className="pp-hub-plugin-card__header">
                <img className="pp-hub-plugin-card__icon" src={iconSrc} alt="" />
                <div className="pp-hub-plugin-card__identity">
                    <h2>{displayName.replace(/^PublishPress\s+/, '')}</h2>
                    <p>{pluginFamily.description}</p>
                </div>
                <div className="pp-hub-plugin-card__controls">
                    <button type="button" className="pp-hub-favorite" aria-pressed={isFavorite}
                        aria-label={sprintf(isFavorite ? __('Remove %s from favorites', 'publishpress-hub') : __('Add %s to favorites', 'publishpress-hub'), displayName)}
                        onClick={() => onToggleFavorite(pluginFamily.slug)}>
                        <span className={`dashicons dashicons-star-${isFavorite ? 'filled' : 'empty'}`} aria-hidden="true" />
                    </button>
                    {pluginFamily.hasAnyVersionInstalled && !conflict && (
                        <div className={`pp-hub-plugin-card__activation${active ? ' is-active' : ''}`}>
                            <span>{active ? __('Active', 'publishpress-hub') : __('Inactive', 'publishpress-hub')}</span>
                            {/* aria-disabled instead of disabled keeps keyboard focus on the toggle while busy (WCAG 2.4.3). */}
                            <ToggleControl checked={active} aria-disabled={busy || undefined}
                                aria-label={sprintf(active ? __('Deactivate %s', 'publishpress-hub') : __('Activate %s', 'publishpress-hub'), displayName)}
                                onChange={value => {
                                    if (busy) return;
                                    value ? onActivate(pluginFamily) : onDeactivate(pluginFamily);
                                }} />
                        </div>
                    )}
                    {!pluginFamily.hasAnyVersionInstalled && <span className="pp-hub-plugin-card__state">{__('Not installed', 'publishpress-hub')}</span>}
                </div>
            </div>

            <div className="pp-hub-plugin-card__actions">
                <details ref={moreRef} className="pp-hub-plugin-card__more">
                    <summary aria-label={sprintf(__('More actions for %s', 'publishpress-hub'), displayName)}>{__('More', 'publishpress-hub')}</summary>
                    <div className="pp-hub-plugin-card__more-actions">
                        {moreActions.map(({ key, ...button }) => button.variant === 'label'
                            ? <span key={key}>{button.text}</span>
                            : <Button key={key} {...button} disabled={busy} />)}
                    </div>
                </details>
            </div>

            {(conflict || updateAction || progressStates.isActivating || progressStates.isDeactivating) && (
                <div className="pp-hub-plugin-card__notice" role="status">
                    {conflict && <span className="pp-hub-plugin-feedback is-conflict"><span className="dashicons dashicons-warning" aria-hidden="true" />{__('Conflicting installations', 'publishpress-hub')}</span>}
                    {updateAction && <Button {...updateAction} disabled={busy && !progressStates.isUpdating} />}
                    {progressStates.isActivating && <span className="pp-hub-plugin-feedback"><Spinner aria-hidden="true" />{__('Activating…', 'publishpress-hub')}</span>}
                    {progressStates.isDeactivating && <span className="pp-hub-plugin-feedback"><Spinner aria-hidden="true" />{__('Deactivating…', 'publishpress-hub')}</span>}
                </div>
            )}

            <footer className="pp-hub-plugin-card__footer">
                <div className="pp-hub-plugin-card__primary">
                    <ActionButton pluginFamily={pluginFamily} inProgress={inProgress} disabled={busy} {...actions} />
                </div>
                <Button variant="secondary" href={documentationUrl} icon="book-alt">
                    {__('Documentation', 'publishpress-hub')}
                </Button>
            </footer>
        </article>
    );
};
