# Prime Appliance Automation

Playwright automation for Prime Appliance portal workflows. The framework uses JavaScript ES modules, page objects, Gmail OTP login, and Playwright storage state files for reusable authenticated sessions.

## Tech Stack

- Node.js
- Playwright Test
- JavaScript ES modules
- Gmail API
- dotenv
- ESLint
- Prettier
- GitHub Actions

## Project Structure

```text
.
|-- .github/workflows/playwright.yml
|-- assets/images/
|-- auth/
|   `-- .gitkeep
|-- configs/
|   `-- portalConfig.js
|-- pages/
|   |-- common/LoginPage.js
|   |-- b2b/Sidebar.js
|   |-- b2c/Sidebar.js
|   |-- ivd/Sidebar.js
|   |-- pap/Sidebar.js
|   |-- pricing/Sidebar.js
|   |-- ptp/Sidebar.js
|   |-- rja/Sidebar.js
|   |-- sa/Sidebar.js
|   `-- soi/Sidebar.js
|-- test-data/
|   `-- PtpData.js
|-- tests/
|   |-- setup/auth.setup.js
|   |-- b2b/b2bWorkflow.spec.js
|   |-- b2c/b2cWorkflow.spec.js
|   |-- ivd/ivdWorkflow.spec.js
|   |-- pap/papWorkflow.spec.js
|   |-- pricing/pricingWorkflow.spec.js
|   |-- ptp/ptpWorkflow.spec.js
|   |-- rja/rjaWorkflow.spec.js
|   |-- sa/saWorkflow.spec.js
|   `-- soi/soiWorkflow.spec.js
|-- utils/
|   |-- gmailHelper.js
|   |-- loginHelper.js
|   `-- otpHelper.js
|-- eslint.config.js
|-- package.json
`-- playwright.config.js
```

## Configured Playwright Projects

The active projects are defined in `playwright.config.js`.

Authenticated projects:

- `rja`
- `ivd`
- `ptp`
- `b2b`
- `pap`
- `soi`

Each authenticated project depends on its matching setup project, for example `b2b` depends on `b2b-auth-setup`. The setup project logs in through Gmail OTP and saves a storage state file under `auth/<portal>-auth.json`.

Non-authenticated projects:

- `b2c`
- `sa`

Portal config also contains entries for `compliance`, `sap`, and `pricing`. Add matching Playwright projects before expecting those portals to run through `npm run test:list`.

## Environment Setup

Create a local `.env` file from `.env.example` and fill in the real portal values.

Required variables:

```env
COMMON_EMAIL=your_login_email

RJA_URL=https://example.com
COMPLIANCE_URL=https://example.com
IVD_URL=https://example.com
SA_URL=https://example.com
SAP_URL=https://example.com
PRICING_URL=https://example.com
PTP_URL=https://example.com
B2B_URL=https://example.com
B2C_URL=https://example.com
SOI_URL=https://example.com
PAP_URL=https://example.com
```

Sensitive local files are ignored by Git:

- `.env`
- `auth/credentials.json`
- `auth/token.json`
- `auth/*-auth.json`
- Playwright reports and test results

## Gmail OTP Setup

Local runs need Gmail API auth files:

- `auth/credentials.json`
- `auth/token.json`

The login helper reads the portal email from `.env`, waits for the OTP input, fetches the newest unread OTP email from Gmail, enters the code, and saves Playwright storage state.

By default, OTP lookup searches for subject `Your OTP Code`. B2B overrides this with `Prime Appliance Login OTP` in `configs/portalConfig.js`.

## Install

```bash
npm install
npx playwright install chromium
```

If you are setting up a clean CI-like Linux machine, install browser system dependencies too:

```bash
npx playwright install-deps chromium
```

## Commands

Run all configured tests:

```bash
npm run test
```

List discovered tests without running them:

```bash
npm run test:list
```

Run lint:

```bash
npm run lint
```

Run one project:

```bash
npx playwright test --project=b2b
```

Run one spec:

```bash
npx playwright test tests/soi/soiWorkflow.spec.js
```

Run headed:

```bash
npx playwright test --headed
```

Debug a project:

```bash
npx playwright test --project=soi --headed --debug
```

Note: when a project has an auth dependency, Playwright runs the auth setup project first. For example, debugging `soi` will first run `soi-auth-setup`.

## CI

GitHub Actions runs on pushes and pull requests to `main` and `master`.

The workflow:

1. Checks out the repo.
2. Installs Node.js.
3. Runs `npm ci`.
4. Checks the installed Chrome version.
5. Installs Playwright Chromium system dependencies.
6. Creates Gmail auth files from GitHub secrets.
7. Runs `npx playwright test`.

Required GitHub secrets:

- `COMMON_EMAIL`
- `GOOGLE_CREDENTIALS`
- `GOOGLE_TOKEN`
- `RJA_URL`
- `COMPLIANCE_URL`
- `IVD_URL`
- `SA_URL`
- `SAP_URL`
- `PRICING_URL`
- `PTP_URL`
- `B2B_URL`
- `B2C_URL`
- `SOI_URL`
- `PAP_URL`

The current workflow does not run `npm run lint`; run lint locally before pushing if lint quality is part of your release gate.

## Troubleshooting

If a test is not visible to Playwright, run:

```bash
npm run test:list
```

This confirms whether Playwright can load the config and discover projects/specs.

If OTP login fails:

- Confirm `auth/credentials.json` and `auth/token.json` exist locally.
- Confirm `COMMON_EMAIL` is correct.
- Confirm the portal sends an unread OTP email.
- Confirm the Gmail subject matches the portal config.
- Refresh `auth/token.json` if Gmail reports an invalid token.

If CI auth fails:

- Refresh the `GOOGLE_TOKEN` GitHub secret.
- Confirm `GOOGLE_CREDENTIALS` is valid JSON.
- Confirm all portal URL secrets are present.

## Notes

- Tests interact with live portal workflows and may create or update records.
- Some specs depend on current dates or existing live data, so they can fail when portal data changes.
- Auth state files are generated runtime artifacts and should stay out of Git.
