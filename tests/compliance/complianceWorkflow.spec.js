import { test, expect } from '@playwright/test';

import { Sidebar } from '../../pages/compliance/Sidebar';

async function waitForSuccessModalToClose(page) {
  await expect(page.locator('#success-modal')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('#success-modal')).toBeHidden({ timeout: 20000 });
  await expect(page.locator('.modal.show')).toHaveCount(0);
  await expect(page.locator('.modal-backdrop')).toHaveCount(0);
}

test.setTimeout(600000);

test('Complete portal workflow', async ({ page, browser }) => {
  const sidebar = new Sidebar(page);

  const uniqueId = Date.now();
  const firstName = 'Test';
  const lastName = `user${uniqueId}`;
  const userFullName = `${firstName} ${lastName}`;
  const uniqueEmail = `test${uniqueId}@yopmail.com`;

  await page.goto(process.env.COMPLIANCE_URL);

  await sidebar.openSidebar.click();
  await sidebar.users.click();
  await sidebar.addUser.click();

  await expect(page.getByRole('heading', { name: 'Add user' })).toBeVisible();

  await page.locator('#first_name').fill(firstName);

  await page.locator('#last_name').fill(lastName);

  await page.locator('#user_type').selectOption('user');

  await page.locator('#email').fill(uniqueEmail);

  await page.locator('#primary_phone').fill('5555555555');

  await page.locator('#secondary_phone').fill('6666666666');

  await page.locator('#last_name').fill(lastName);

  await page.locator('#role').selectOption('Test Role');

  await page.locator('#service_area_code').selectOption('ON-N-1');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('User added successfully.')).toBeVisible();

  await sidebar.openSidebar.click();
  await expect(sidebar.screenings).toBeVisible({ timeout: 15000 });
  await sidebar.screenings.click();

  await expect(page.getByRole('heading', { name: 'Screening(s)' })).toBeVisible({ timeout: 20000 });

  await page.locator('#searchInput').fill(uniqueEmail);

  await page.keyboard.press('Enter');

  await expect(page.locator('tbody tr').filter({ hasText: userFullName })).toBeVisible();

  await page.locator('tbody tr').filter({ hasText: userFullName }).locator('a.w-100').click();

  await expect(page.getByText('Screening(s) Details')).toBeVisible({ timeout: 20000 });

  await expect(page.locator('a[wire\\:click*="uploadDocumentDetails"]').first()).toBeVisible({ timeout: 10000 });

  await page.locator('a[wire\\:click*="uploadDocumentDetails"]').first().click();

  await expect(page.getByRole('heading', { name: 'Test Screenings' })).toBeVisible();

  await page.locator('input[wire\\:model="document"]').fill('https://www.testsite.com/dashboard');

  await page.getByRole('button', { name: 'Save Link' }).click();

  await waitForSuccessModalToClose(page);

  await sidebar.openSidebar.click();
  await expect(sidebar.credentials).toBeVisible({ timeout: 15000 });
  await sidebar.credentials.click();

  await page.locator('#searchInput').fill(uniqueEmail);

  await page.keyboard.press('Enter');

  await expect(page.locator('tbody tr').filter({ hasText: userFullName })).toBeVisible();

  await page.locator('tbody tr').filter({ hasText: userFullName }).locator('a.w-100').click();

  await expect(page.locator('tbody tr')).toContainText('Test Credentials');

  await page.locator('a[wire\\:click*="uploadDocumentDetails"]').first().click();

  await expect(page.getByRole('heading', { name: 'Screening Options' })).toBeVisible();

  await page.locator('[wire\\:model="login_link"]').fill('http://api.coolapp.dev/services');

  await page.locator('[wire\\:model="username"]').fill('Test username');

  await page.locator('[wire\\:model="password"]').fill('Test password');

  await page.locator('[wire\\:model="additional_notes"]').fill('Test additional note');

  await page.getByRole('button', { name: 'Save & Approve' }).click();

  await waitForSuccessModalToClose(page);

  let userPage = await browser.newPage({ storageState: { cookies: [], origins: [] } });
  let userSidebar = new Sidebar(userPage);

  // user login

  await userPage.goto(process.env.COMPLIANCE_URL);

  await expect(userPage.getByText('Login to Your Account')).toBeVisible();

  await userPage.locator('#yourEmail').fill(uniqueEmail);

  await userPage.getByRole('button', { name: 'Send OTP' }).click();

  await expect(userPage.getByText('Enter OTP')).toBeVisible();

  await userPage.locator('#otp').fill('123456');

  await userPage.locator('button', { name: 'Verify OTP' }).click();

  await expect(userPage.getByRole('heading', { name: 'Verification Overview' })).toBeVisible();

  // Upload Licence

  await userSidebar.openSidebar.click();
  await userSidebar.licenses.click();

  await userPage.locator('a[wire\\:click*="uploadDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Licenses' })).toBeVisible();

  await userPage.locator('#fileInput').setInputFiles('assets/images/878-100x100.jpg');

  await expect(userPage.locator('#fileList img')).toBeVisible();

  await userPage.getByRole('button', { name: 'Submit' }).click();

  await waitForSuccessModalToClose(userPage);

  await userPage.locator('a[wire\\:click*="submittedDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Licenses' })).toBeVisible();

  await expect(userPage.locator('#fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await userPage.getByRole('button', { name: 'Close' }).click();

  await userPage.locator('a[wire\\:click*="verifiedDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Licenses' })).toBeVisible();

  await expect(userPage.locator('.modal.show').getByText('No license document verified yet!')).toBeVisible();

  await userPage.getByRole('button', { name: 'Close' }).click();

  // Upload insurances

  await userSidebar.openSidebar.click();
  await userSidebar.insurances.click();

  await userPage.locator('a[wire\\:click*="uploadDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Insurances' })).toBeVisible();

  await userPage.locator('#fileInput').setInputFiles('assets/images/878-100x100.jpg');

  await expect(userPage.locator('#fileList img')).toBeVisible();

  await userPage.getByRole('button', { name: 'Submit' }).click();

  await waitForSuccessModalToClose(userPage);

  await userPage.locator('a[wire\\:click*="submittedDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Insurances' })).toBeVisible();

  await expect(userPage.locator('#fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await userPage.getByRole('button', { name: 'Close' }).click();

  await userPage.locator('a[wire\\:click*="verifiedDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Insurances' })).toBeVisible();

  await expect(userPage.locator('.modal.show').getByText('No insurance document verified yet!')).toBeVisible();

  await userPage.getByRole('button', { name: 'Close' }).click();

  // Upload Government Document

  await userSidebar.openSidebar.click();
  await userSidebar.governmentDocs.click();

  await userPage.locator('a[wire\\:click*="uploadDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Govt Documentatiion' })).toBeVisible();

  await userPage.locator('#fileInput').setInputFiles('assets/images/878-100x100.jpg');

  await expect(userPage.locator('#fileList img')).toBeVisible();

  await userPage.getByRole('button', { name: 'Submit' }).click();

  await waitForSuccessModalToClose(userPage);

  await userPage.locator('a[wire\\:click*="submittedDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Govt Documentatiion' })).toBeVisible();

  await expect(userPage.locator('#fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await userPage.getByRole('button', { name: 'Close' }).click();

  await userPage.locator('a[wire\\:click*="verifiedDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Govt Documentatiion' })).toBeVisible();

  await expect(userPage.locator('.modal.show').getByText('No government document verified yet!')).toBeVisible();

  await userPage.getByRole('button', { name: 'Close' }).click();

  // Upload Payment Document

  await userSidebar.openSidebar.click();
  await userSidebar.paymentDocs.click();

  await userPage.locator('a[wire\\:click*="uploadDocumentDetails"]').nth(0).click();

  await expect(userPage.getByRole('heading', { name: 'Test Payment Documentation' })).toBeVisible();

  await userPage.locator('#fileInput').setInputFiles('assets/images/878-100x100.jpg');

  await expect(userPage.locator('#fileList img')).toBeVisible();

  await userPage.getByRole('button', { name: 'Submit' }).click();

  await waitForSuccessModalToClose(userPage);

  await userPage.locator('a[wire\\:click*="uploadDocumentDetails"]').nth(1).click();

  await expect(userPage.getByRole('heading', { name: 'Test Payment Documentation 2' })).toBeVisible();

  await userPage.locator('#fileInput').setInputFiles('assets/images/878-100x100.jpg');

  await expect(userPage.locator('#fileList img')).toBeVisible();

  await userPage.getByRole('button', { name: 'Submit' }).click();

  await waitForSuccessModalToClose(userPage);

  await userPage.locator('a[wire\\:click*="submittedDocumentDetails"]').nth(0).click();

  await expect(userPage.getByRole('heading', { name: 'Test Payment Documentation' })).toBeVisible();

  await expect(userPage.locator('#fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await userPage.getByRole('button', { name: 'Close' }).click();

  await userPage.locator('a[wire\\:click*="submittedDocumentDetails"]').nth(1).click();

  await expect(userPage.getByRole('heading', { name: 'Test Payment Documentation' })).toBeVisible();

  await expect(userPage.locator('#fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await userPage.getByRole('button', { name: 'Close' }).click();

  await userPage.locator('a[wire\\:click*="verifiedDocumentDetails"]').nth(0).click();

  await expect(userPage.getByRole('heading', { name: 'Test Payment Documentation' })).toBeVisible();

  await expect(userPage.locator('.modal.show').getByText('No payment document verified yet!')).toBeVisible();

  await userPage.getByRole('button', { name: 'Close' }).click();

  await userPage.locator('a[wire\\:click*="verifiedDocumentDetails"]').nth(1).click();

  await expect(userPage.getByRole('heading', { name: 'Test Payment Documentation' })).toBeVisible();

  await expect(userPage.locator('.modal.show').getByText('No payment document verified yet!')).toBeVisible();

  await userPage.getByRole('button', { name: 'Close' }).click();

  // Agreement document

  await userSidebar.openSidebar.click();
  await userSidebar.agreementDocs.click();

  await userPage.locator('a[wire\\:click*="uploadDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Agreements' })).toBeVisible();

  await userPage.locator('#fileInput').setInputFiles('assets/images/878-100x100.jpg');

  await expect(userPage.locator('#fileList img')).toBeVisible();

  await userPage.getByRole('button', { name: 'Submit' }).click();

  await waitForSuccessModalToClose(userPage);

  await userPage.locator('a[wire\\:click*="submittedDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Agreements' })).toBeVisible();

  await expect(userPage.locator('#fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await userPage.getByRole('button', { name: 'Close' }).click();

  await userPage.locator('a[wire\\:click*="verifiedDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Test Agreements' })).toBeVisible();

  await expect(userPage.locator('.modal.show').getByText('No agreement document verified yet!')).toBeVisible();

  await userPage.getByRole('button', { name: 'Close' }).click();

  await userSidebar.openSidebar.click();
  await expect(userSidebar.screenings).toBeVisible({ timeout: 15000 });
  await userSidebar.screenings.click();

  await userPage.locator('a[wire\\:click*="uploadDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Screening Options' })).toBeVisible();

  await expect(userPage.locator('[wire\\:model="document"]')).toHaveValue('https://www.testsite.com/dashboard');

  await userPage.getByRole('button', { name: 'Close' }).click();

  await userSidebar.openSidebar.click();
  await expect(userSidebar.credentials).toBeVisible({ timeout: 15000 });
  await userSidebar.credentials.click();

  await userPage.locator('a[wire\\:click*="uploadDocumentDetails"]').click();

  await expect(userPage.getByRole('heading', { name: 'Screening Options' })).toBeVisible();

  await expect(userPage.locator('[wire\\:model="login_link"]')).toHaveValue('http://api.coolapp.dev/services');

  await expect(userPage.locator('[wire\\:model="username"]')).toHaveValue('Test username');

  await expect(userPage.locator('[wire\\:model="password"]')).toHaveValue('Test password');

  await expect(userPage.locator('[wire\\:model="additional_notes"]')).toHaveValue('Test additional note');

  await userPage.getByRole('button', { name: 'Close' }).click();

  await expect(userPage.locator('a.nav-profile[data-bs-toggle="dropdown"]')).toBeVisible();

  await userPage.locator('form[action$="/logout"]').evaluate((form) => form.submit());

  await expect(userPage.getByText('Login to Your Account')).toBeVisible();

  await userPage.close();

  await page.goto(process.env.COMPLIANCE_URL);

  await expect(sidebar.openSidebar).toBeVisible();

  // admin verify license

  await sidebar.openSidebar.click();
  await sidebar.licenses.click();

  await page.locator('#searchInput').fill(uniqueEmail);

  await page.keyboard.press('Enter');

  await expect(page.locator('tbody tr').filter({ hasText: userFullName })).toBeVisible();

  await page.locator('tbody tr').filter({ hasText: userFullName }).locator('a.w-100').click();

  await expect(page.locator('a[wire\\:click*="submittedDocumentDetails"]').first()).toBeVisible({ timeout: 20000 });

  await page.locator('a[wire\\:click*="submittedDocumentDetails"]').click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await expect(page.locator('.modal.show input[type="date"]')).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show input[type="date"]').fill('2026-12-31');

  await expect(page.locator('.modal.show').getByRole('button', { name: 'Verify' })).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show').getByRole('button', { name: 'Verify' }).click();

  await waitForSuccessModalToClose(page);

  await page.locator('a[wire\\:click*="verifiedDocumentDetails"]').click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await page.getByRole('button', { name: 'Close' }).click();

  // admin verify insurance

  await sidebar.openSidebar.click();
  await sidebar.insurances.click();

  await page.locator('#searchInput').fill(uniqueEmail);

  await page.keyboard.press('Enter');

  await expect(page.locator('tbody tr').filter({ hasText: userFullName })).toBeVisible();

  await page.locator('tbody tr').filter({ hasText: userFullName }).locator('a.w-100').click();

  await expect(page.locator('a[wire\\:click*="submittedDocumentDetails"]').first()).toBeVisible({ timeout: 20000 });

  await page.locator('a[wire\\:click*="submittedDocumentDetails"]').click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await expect(page.locator('.modal.show input[type="date"]')).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show input[type="date"]').fill('2026-12-31');

  await expect(page.locator('.modal.show').getByRole('button', { name: 'Verify' })).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show').getByRole('button', { name: 'Verify' }).click();

  await waitForSuccessModalToClose(page);

  await page.locator('a[wire\\:click*="verifiedDocumentDetails"]').click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await page.getByRole('button', { name: 'Close' }).click();

  // admin verify government document

  await sidebar.openSidebar.click();
  await sidebar.governmentDocs.click();

  await page.locator('#searchInput').fill(uniqueEmail);

  await page.keyboard.press('Enter');

  await expect(page.locator('tbody tr').filter({ hasText: userFullName })).toBeVisible();

  await page.locator('tbody tr').filter({ hasText: userFullName }).locator('a.w-100').click();

  await expect(page.locator('a[wire\\:click*="submittedDocumentDetails"]').first()).toBeVisible({ timeout: 20000 });

  await page.locator('a[wire\\:click*="submittedDocumentDetails"]').click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await expect(page.locator('.modal.show input[type="date"]')).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show input[type="date"]').fill('2026-12-31');

  await expect(page.locator('.modal.show').getByRole('button', { name: 'Verify' })).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show').getByRole('button', { name: 'Verify' }).click();

  await waitForSuccessModalToClose(page);

  await page.locator('a[wire\\:click*="verifiedDocumentDetails"]').click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await page.getByRole('button', { name: 'Close' }).click();

  // admin verify payment document

  await sidebar.openSidebar.click();
  await sidebar.paymentDocs.click();

  await page.locator('#searchInput').fill(uniqueEmail);

  await page.keyboard.press('Enter');

  await expect(page.locator('tbody tr').filter({ hasText: userFullName })).toBeVisible();

  await page.locator('tbody tr').filter({ hasText: userFullName }).locator('a.w-100').click();

  await expect(page.locator('a[wire\\:click*="submittedDocumentDetails"]').first()).toBeVisible({ timeout: 20000 });

  await page.locator('a[wire\\:click*="submittedDocumentDetails"]').nth(0).click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await expect(page.locator('.modal.show input[type="date"]')).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show input[type="date"]').fill('2026-12-31');

  await expect(page.locator('.modal.show').getByRole('button', { name: 'Verify' })).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show').getByRole('button', { name: 'Verify' }).click();

  await waitForSuccessModalToClose(page);

  await page.locator('a[wire\\:click*="verifiedDocumentDetails"]').nth(0).click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await page.getByRole('button', { name: 'Close' }).click();

  await page.locator('a[wire\\:click*="submittedDocumentDetails"]').nth(1).click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await expect(page.locator('.modal.show input[type="date"]')).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show input[type="date"]').fill('2026-12-31');

  await expect(page.locator('.modal.show').getByRole('button', { name: 'Verify' })).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show').getByRole('button', { name: 'Verify' }).click();

  await waitForSuccessModalToClose(page);

  await page.locator('a[wire\\:click*="verifiedDocumentDetails"]').nth(1).click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await page.getByRole('button', { name: 'Close' }).click();

  // admin verify agreement document

  await sidebar.openSidebar.click();
  await sidebar.agreementDocs.click();

  const agreementSearchInput = page.locator('#searchInput');

  await agreementSearchInput.click();
  await agreementSearchInput.fill('');
  await agreementSearchInput.pressSequentially(uniqueEmail);

  const submittedAgreementRow = page
    .locator('tbody tr')
    .filter({ hasText: userFullName })
    .filter({ hasText: 'Submitted' });

  await agreementSearchInput.press('Enter');

  await expect(submittedAgreementRow).toBeVisible();

  await submittedAgreementRow.locator('a.w-100').click();

  await expect(page.locator('a[wire\\:click*="submittedDocumentDetails"]').first()).toBeVisible({ timeout: 20000 });

  await page.locator('a[wire\\:click*="submittedDocumentDetails"]').click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await expect(page.locator('.modal.show input[type="date"]')).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show input[type="date"]').fill('2026-12-31');

  await expect(page.locator('.modal.show').getByRole('button', { name: 'Verify' })).toBeVisible({ timeout: 10000 });

  await page.locator('.modal.show').getByRole('button', { name: 'Verify' }).click();

  await waitForSuccessModalToClose(page);

  await page.locator('a[wire\\:click*="verifiedDocumentDetails"]').click();

  await expect(page.locator('.modal.show #fileList img').first()).toHaveAttribute('src', /878-100x100\.jpg/);

  await page.getByRole('button', { name: 'Close' }).click();

  // admin verify screening document

  await sidebar.openSidebar.click();
  await sidebar.screenings.click();

  await page.locator('#searchInput').fill(uniqueEmail);

  await page.keyboard.press('Enter');

  await expect(page.locator('tbody tr').filter({ hasText: userFullName })).toBeVisible();

  await page.locator('tbody tr').filter({ hasText: userFullName }).locator('a.w-100').click();

  await expect(page.locator('a[wire\\:click*="uploadDocumentDetails"]').first()).toBeVisible({ timeout: 20000 });

  await page.locator('a[wire\\:click*="uploadDocumentDetails"]').click();

  await page.locator('#expiration_date').fill(new Date().toISOString().split('T')[0]);

  await page.locator('.modal.show').getByRole('button', { name: 'Set Date & Approve' }).click();

  await waitForSuccessModalToClose(page);
});
