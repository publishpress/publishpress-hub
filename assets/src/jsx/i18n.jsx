import {
    __ as wp__,
    sprintf as wpSprintf,
    isRTL as wpIsRTL,
    _n as wpN,
    _x as wpX,
    _nx as wpNx,
    _n_noop as wpNNoop,
    _nx_noop as wpNxNoop,
} from '@wordpress/i18n';


const data = (() => {
    const free = window.publishpressHubI18nConfig?.data || {};
    const pro = window.publishpressHubI18nProConfig?.data || {};

    const merged = {};

    const domains = new Set([
        ...Object.keys(free.locale_data || {}),
        ...Object.keys(pro.locale_data || {}),
    ]);

    domains.forEach((domain) => {
        merged[domain] = {
            ...((free.locale_data || {})[domain] || {}),
            ...((pro.locale_data || {})[domain] || {}),
        };
    });

    return {
        locale_data: merged
    };
})();

export const __ = (text, domain = null) => {

    if (domain && data.locale_data?.[domain]?.[text]) {
        return data.locale_data[domain][text][0];
    }

    for (const key in data.locale_data) {
        if (data.locale_data[key]?.[text]) {
            return data.locale_data[key][text][0];
        }
    }

    return wp__(text, domain);
};


export const sprintf = (text, ...args) => {
    return wpSprintf(text, ...args);
};

export const isRTL = () => {
    return wpIsRTL();
};

export const _n = (single, plural, number, domain = null) => {
    single = __(single, domain);
    plural = __(plural, domain);

    return wpN(single, plural, number, domain);
};

export const _x = (text, context, domain = null) => {
    text = __(text, domain);

    return wpX(text, context, domain);
};

export const _nx = (single, plural, number, context, domain = null) => {
    single = __(single, domain);
    plural = __(plural, domain);

    return wpNx(single, plural, number, context, domain);
};

export const _n_noop = (single, plural, domain = null) => {
    single = __(single, domain);
    plural = __(plural, domain);

    return wpNNoop(single, plural, domain);
};

export const _nx_noop = (single, plural, context, domain = null) => {
    single = __(single, domain);
    plural = __(plural, domain);

    return wpNxNoop(single, plural, context, domain);
};

if (typeof window.publishpressHub === 'undefined') {
    window.publishpressHub = {};
}

if (typeof window.publishpressHub.i18n === 'undefined') {
    window.publishpressHub.i18n = {};
}

window.publishpressHub.i18n.__ = __;
window.publishpressHub.i18n.sprintf = sprintf;
window.publishpressHub.i18n.isRTL = isRTL;
window.publishpressHub.i18n._n = _n;
window.publishpressHub.i18n._x = _x;
window.publishpressHub.i18n._nx = _nx;
window.publishpressHub.i18n._n_noop = _n_noop;
window.publishpressHub.i18n._nx_noop = _nx_noop;

