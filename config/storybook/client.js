import {configure} from '@kadira/storybook';

const req = require.context('./../../src/components', true, /\.page\.[jt]sx$/);

configure(() => {
	req.keys().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).forEach(req);
}, module);