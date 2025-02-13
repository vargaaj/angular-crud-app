import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const FILE_PATH = 'passwords.json';

app.use(cors());
app.use(bodyParser.json());

const readPasswords = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH, 'utf8');
  return JSON.parse(data || '[]');
};

const writePasswords = (passwords: any[]) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(passwords, null, 2));
};

app.post('/api/passwords', (req, res) => {
  const passwords = readPasswords();
  const newPassword = { ...req.body, id: uuidv4() };
  passwords.push(newPassword);
  writePasswords(passwords);
  res.json({ message: 'Password saved successfully!', password: newPassword });
});

app.get('/api/passwords', (req, res) => {
  res.json(readPasswords());
});

app.put('/api/passwords', (req, res) => {
  const updatedPasswords = req.body;

  // Log the updated passwords for debugging

  // Overwrite the entire passwords array with the new data
  writePasswords(updatedPasswords);

  res.json({ message: 'Passwords updated successfully!' });
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4200;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
