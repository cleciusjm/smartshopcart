import { test, expect } from '@playwright/test';

test.describe('Smart Shop Cart', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should verify empty cart state', async ({ page }) => {
        // Check that the toolbar is visible with "Meu Carrinho" text
        await expect(page.locator('mat-toolbar').first()).toBeVisible();
        // Check that empty message is visible
        await expect(page.locator('.emptyMessage')).toContainText('Seu carrinho está vazio');
    });

    test('should create a new item', async ({ page }) => {
        // Click 'New' button - FAB with 'add' icon in shop-cart-list
        await page.locator('button[mat-fab] mat-icon').filter({ hasText: 'add' }).click();

        // Expect to be on newItem page
        await expect(page).toHaveURL(/.*newItem/);

        // Fill form in shop-cart-item-detail
        await page.fill('input[formControlName="name"]', 'Milk');
        await page.fill('input[formControlName="unitaryValue"]', '2.50');

        // Amount might be 1 by default, let's change it
        // Using nth(0) for amount if locators are ambiguous, but formControlName is specific
        await page.fill('input[formControlName="amount"]', '2');

        // Save - button with 'check' icon
        await page.locator('button[type="submit"] mat-icon').filter({ hasText: 'check' }).click();

        // Verification - item should appear in the list with correct details
        // The list uses <h4 mat-line>{{item.name}}</h4>
        await expect(page.locator('mat-nav-list h4')).toContainText('Milk');
        // Verify calculation: 2 * 2.50 = 5.00
        // Formatting might be locale dependent (BRL), checking text content loosely
        await expect(page.locator('mat-nav-list p')).toContainText(/5,00|5.00/);
    });
});
