import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();

// tslint:disable-next-line: no-string-literal
global['window'] = mock.getWindow();

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
