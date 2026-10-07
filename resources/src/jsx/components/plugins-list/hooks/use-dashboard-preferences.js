/**
 * Browser preferences scoped to the current site and user.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */
import { useState, useCallback } from '@wordpress/element';

const storageKey = () => `pp-hub-dashboard:${window.ppHubPluginsDashboardConfig?.preferencesKey || 'default'}`;

export const readPreferences = () => {
    try {
        const saved = JSON.parse(window.localStorage.getItem(storageKey())) || {};
        return {
            layout: saved.layout === 'cards' ? 'cards' : 'list',
            grouped: saved.grouped !== false,
            favorites: Array.isArray(saved.favorites) ? saved.favorites.filter(slug => typeof slug === 'string') : [],
        };
    } catch {
        return { layout: 'list', grouped: true, favorites: [] };
    }
};

export const useDashboardPreferences = () => {
    const [preferences, setPreferences] = useState(readPreferences);
    const updatePreferences = useCallback((changes) => {
        setPreferences(previous => {
            const next = { ...previous, ...changes };
            try {
                window.localStorage.setItem(storageKey(), JSON.stringify(next));
            } catch {
                // The controls still work when browser storage is unavailable.
            }
            return next;
        });
    }, []);
    const toggleFavorite = useCallback((slug) => {
        setPreferences(previous => {
            const favorites = previous.favorites.includes(slug)
                ? previous.favorites.filter(item => item !== slug)
                : [...previous.favorites, slug];
            const next = { ...previous, favorites };
            try {
                window.localStorage.setItem(storageKey(), JSON.stringify(next));
            } catch {
                // Keep the current session usable without browser storage.
            }
            return next;
        });
    }, []);
    return { preferences, updatePreferences, toggleFavorite };
};
