// According to the issue https://github.com/facebook/react/issues/5046
// We have to add `--require ./test/setup.js` into mocha arguments to
// make sure the jsdom ready before React getting initialized.
import { jsdom } from 'jsdom'

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator
