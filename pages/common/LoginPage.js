export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page
      .locator(
        'input[type=email], input[placeholder="Email"], input[placeholder="Email address"]'
      )
      .or(
        page.getByRole("textbox", {
          name: /email/i,
        })
      );

    this.submitButton = page.locator("button[type=submit]");

    this.sendOtpButton = page
      .locator("#loginWithOtpBtn")
      .or(
        page.getByRole("button", {
          name: /send otp|login with otp/i,
        })
      )
      .first();

    this.verifyOtpButton = page.getByRole("button", {
      name: /verify otp/i,
    });

    this.otpInput = page.locator("input[type=number]");
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);

    if (
      await this.sendOtpButton
        .isVisible({
          timeout: 5000,
        })
        .catch(() => false)
    ) {
      await this.sendOtpButton.click();
    } else {
      await this.submitButton.click();
    }
  }

  async enterOTP(otp) {
    await this.otpInput.fill(otp);
  }

  async clickVerifyButton() {
    if (
      await this.verifyOtpButton
        .isVisible({
          timeout: 5000,
        })
        .catch(() => false)
    ) {
      await this.verifyOtpButton.click();
    } else {
      await this.submitButton.click();
    }
  }
}
