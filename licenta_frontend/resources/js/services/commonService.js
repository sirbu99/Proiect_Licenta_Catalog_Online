import _ from 'lodash';
import store from '../store';


/* Permissions */
export function hasPermission(perm) {
    const state = store.getState();
    return _.includes(_.get(state, 'authentication.user.permissions', []), perm.toLowerCase());
}


/* Routes */
export function getRoutes(routes, auth) {
    const byPermission = _.get(routes, 'byPermission', {});
    let allowedRoutes = routes.all;

    if (!auth.loggedIn) {
        return _.concat(allowedRoutes, _.get(routes, 'anonymous', []));
    }

    allowedRoutes = _.concat(allowedRoutes, _.get(routes, 'loggedIn', []));

    _.each(byPermission, (routes, permission) => {
        if (_.includes(_.get(auth, 'user.permissions', []), permission.toLowerCase())) {
            allowedRoutes = _.concat(allowedRoutes, routes);
        }
    });

    return allowedRoutes;
}

/* Parse HTML */
export function stripScripts(s) {
    // strip script tags
    const div = document.createElement('div');
    div.innerHTML = s;
    const scripts = div.getElementsByTagName('script');
    let elCount = scripts.length;
    while (elCount--) {
        scripts[elCount].parentNode.removeChild(scripts[elCount]);
    }

    // strip attributes && events
    Array.from(div.querySelectorAll("*")).forEach(function(el) {
        const atts = el.attributes;
        const attsCount = atts.length;
        for (let i = attsCount - 1; i >= 0; i--) {
            let att = atts[i].nodeName;
            const isImageSource = el.tagName.toLowerCase() === 'img' && att.toLowerCase() === 'src';
            if (["style", "class"].indexOf(att) == -1 && !isImageSource) {
                el.removeAttribute(att);
            }
        }
    });

    return div.innerHTML;
}

/* Translations */
function applyReplacements(message, replacements) {
    _.each(replacements, (replacementKey, replacementName) => {
        const replacement = _.get(replacements, replacementName, '');

        const regex = new RegExp(`:${replacementName}`, 'g');
        message = message.replace(regex, replacement);
    });

    return message;
}

export function getApiHost() {
    return 'http://localhost:3000';
}