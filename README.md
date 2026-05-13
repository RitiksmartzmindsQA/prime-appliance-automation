# Prime Appliance Automation Framework

## Overview

This project is a Playwright automation framework built using JavaScript for testing multiple Prime Holdings portals.

The framework supports:

* Multi-portal automation
* Gmail OTP login automation
* Reusable authentication handling
* CI execution with GitHub Actions
* Playwright storage state authentication
* Environment-based configuration
* ESLint and Prettier integration

---

# Tech Stack

* Playwright
* JavaScript (ES Modules)
* Node.js
* Gmail API
* GitHub Actions
* ESLint
* Prettier

---

# Project Structure

```bash
.
├── configs/
│   └── portalConfig.js
│
├── pages/
│   ├── common/
│   │   └── LoginPage.js
│   └── rja/
│       └── DashboardPage.js
│
├── tests/
│   └── rja/
│       └── login.spec.js
│
├── utils/
│   ├── gmailHelper.js
│   ├── otpHelper.js
│   └── loginHelper.js
│
├── auth/
├── .github/workflows/
├── playwright.config.js
├── global.setup.js
├── eslint.config.js
└── package.json
```

---

# Features

## Multi Portal Support

Currently configured portals:

* RJA Portal
* Compliance Portal
* IVD Portal
* SA Portal
* SAP Portal
* Pricing Portal
* PTP Portal
* B2B Portal
* B2C Portal
* SOI Portal
* PAP Portal

---

# Authentication Flow

The framework uses:

* Gmail OTP verification
* Automated OTP fetching using Gmail API
* Playwright storage state authentication

Authentication state is stored in:

```bash
auth/<portal-name>-auth.json
```

This avoids repeated login execution during tests.

---

# Environment Variables

Environment variables are managed using `.env`.

Example:

```bash
COMMON_EMAIL=your_email

RJA_URL=https://example.com/login
COMPLIANCE_URL=https://example.com/login
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Running Tests

Run all tests:

```bash
npx playwright test
```

Run headed mode:

```bash
npx playwright test --headed
```

Run specific test:

```bash
npx playwright test tests/rja/login.spec.js
```

---

# Linting

Run ESLint:

```bash
npx eslint .
```

Format files using Prettier:

```bash
npx prettier --write .
```

---

# CI Integration

GitHub Actions workflow is configured for:

* dependency installation
* Playwright browser setup
* automated test execution

Workflow file:

```bash
.github/workflows/playwright.yml
```

---

# Security

Sensitive files are excluded using `.gitignore`.

Ignored files include:

* `.env`
* Gmail credentials
* auth tokens
* Playwright auth states
* reports and screenshots

---

# Future Scope

* Functional module automation
* Smoke suite execution
* Cross-browser coverage
* Portal-wise test grouping
* Reporting enhancements
* Parallel execution optimization

---

# Author

Ritik QA
