export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.locator("input[type=email]");

    this.submitButton = page.locator("button[type=submit]");

    this.otpInput = page.locator("input[type=number]");
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);

    await this.submitButton.click();
  }

  async enterOTP(otp) {
    await this.otpInput.fill(otp);
  }

  async clickVerifyButton() {
    await this.submitButton.click();
  }
}
