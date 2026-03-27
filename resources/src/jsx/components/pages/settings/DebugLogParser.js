/**
 * Parser for the PublishPress Hub HTTP debug log format.
 *
 * Each entry in the log file is written by HttpDebugger::log() as:
 *   [HTTP_DEBUG] -> REQUEST: { ...pretty-printed JSON... }
 *   [HTTP_DEBUG] <- RESPONSE: { ...pretty-printed JSON... }
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

/**
 * Parse raw log content into an array of structured entries.
 *
 * @param {string} logContent Raw log text.
 * @returns {Array<{type: string, direction: string, data: Object}>}
 */
export const parseLogEntries = (logContent) => {
    if (!logContent || !logContent.trim()) {
        return [];
    }

    // Split at each [HTTP_DEBUG] marker, keeping the delimiter in the following segment.
    const blocks = logContent.split(/(?=\[HTTP_DEBUG\])/);

    return blocks
        .map((block) => block.trim())
        .filter((block) => block.startsWith('[HTTP_DEBUG]'))
        .map((block) => {
            // Format: [HTTP_DEBUG] -> REQUEST: { ...json... }
            const match = block.match(/^\[HTTP_DEBUG\]\s+(.+?):\s*([\s\S]+)$/);

            if (!match) {
                return null;
            }

            const typeStr = match[1].trim(); // e.g. "-> REQUEST" or "<- RESPONSE"
            const jsonStr = match[2].trim();

            // Split "-> REQUEST" into direction + type
            const typeParts = typeStr.match(/^([^a-zA-Z]*)\s*(\w+)$/);
            const direction = typeParts ? typeParts[1].trim() : '--';
            const type = typeParts ? typeParts[2] : typeStr;

            let data = {};

            try {
                data = JSON.parse(jsonStr);
            } catch {
                data = { _parseError: true, raw: jsonStr };
            }

            return { type, direction, data };
        })
        .filter(Boolean);
};

/**
 * Group parsed entries into request/response pairs, most recent first.
 *
 * @param {Array} entries Output of parseLogEntries.
 * @returns {Array<{id: number, request: Object|null, response: Object|null}>}
 */
export const groupIntoPairs = (entries) => {
    const pairs = [];
    let i = 0;

    while (i < entries.length) {
        const entry = entries[i];

        if (entry.type === 'REQUEST' || entry.type === 'RAW_REQUEST') {
            const next = entries[i + 1];

            if (next && next.type === 'RESPONSE') {
                pairs.push({ id: i, request: entry, response: next });
                i += 2;
            } else {
                pairs.push({ id: i, request: entry, response: null });
                i++;
            }
        } else if (entry.type === 'RESPONSE') {
            // Orphan response without a preceding request
            pairs.push({ id: i, request: null, response: entry });
            i++;
        } else {
            i++;
        }
    }

    // Most recent pair first
    return pairs.reverse();
};
