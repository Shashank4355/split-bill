import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

const APP_URL = process.env.APP_URL || "https://proposals-adipex-longer-copyrighted.trycloudflare.com";

describe("Discount codes", () => {
  it("applies a valid discount code to the subtotal", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: APP_URL });

    // Add an item for $100
    await testdriver.find("Item input field with placeholder Item").click();
    await testdriver.type("Dinner");
    await testdriver.find("Price input field").click();
    await testdriver.type("100");
    await testdriver.find("Add item button").click();

    // Apply SAVE10 discount code
    await testdriver.find("Discount code input field with placeholder e.g. SAVE10").click();
    await testdriver.type("SAVE10");
    await testdriver.find("Apply button in discount code section").click();

    // Verify discount is applied
    const discountAssert = await testdriver.assert("The discount message shows SAVE10 applied: 10% off and the discount line shows -$10.00");
    expect(discountAssert).toBeTruthy();

    // Test invalid code
    await testdriver.find("Discount code input field with placeholder e.g. SAVE10").click();
    await testdriver.pressKeys(["Control", "a"]);
    await testdriver.type("BADCODE");
    await testdriver.find("Apply button in discount code section").click();

    // Verify invalid code message
    const invalidAssert = await testdriver.assert("The message shows That code is not valid");
    expect(invalidAssert).toBeTruthy();
  });
});
