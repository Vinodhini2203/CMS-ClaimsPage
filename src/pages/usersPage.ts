import { Locator, Page, expect } from "@playwright/test";
import { RolesPage } from "./rolesPage";
//import { table } from "node:console";



export class UsersPage {
    page: Page
    userUrl: string
    userTitle: Locator
    addBtn: Locator
    addTitle: Locator
    emailId: Locator
    name: Locator
    dropDwnBx: Locator
    dropDwnList: Locator
    selectRole: Locator
    password: Locator
    confirmPwd: Locator
    saveBtn: Locator
    nameHeader: Locator
    filterIcon: Locator
    containsDropdown: Locator
    applyBtn: Locator
    nameTxtbox: Locator
    nextPageBtn: Locator
    newTestData: string
    newBtn:Locator
    constructor(page: Page) {
        this.page = page;
        this.userUrl = 'https://testcms.reco-claims.ca/application-users';
        this.userTitle = this.page.getByRole('heading', { name: 'Users' })
        this.addBtn = this.page.getByText('Add', { exact: true })
        this.addTitle = this.page.getByText('Add Application User', { exact: true })
        this.emailId = this.page.locator('[name="Email"]')
        this.name = this.page.locator('[name="UserFullName"]')
        this.dropDwnBx = this.page.locator('[class="rz-dropdown valid rz-state-empty"]')
        this.dropDwnList = this.page.locator('[class="rz-dropdown-items rz-dropdown-list"]')
        this.selectRole = this.page.getByRole('option', { name: 'CmsTest_1', exact: true })
        this.password = this.page.locator('[name="Password"]')
        this.confirmPwd = this.page.locator('[name="ConfirmPassword"]')
        this.saveBtn = this.page.getByRole('button', { name: 'Save' })
        this.nameHeader = this.page.locator('th', { hasText: 'Name' });
        this.filterIcon = this.nameHeader.locator('[class="rzi rz-grid-filter-icon "]').first();
        this.containsDropdown = this.page.locator('label')
        this.applyBtn = this.page.getByRole('button', { name: 'Apply' })
        this.nameTxtbox = this.page.locator('[class="rz-textbox rz-state-empty"]')
        this.nextPageBtn = this.page.locator('[class="rz-paginator-icon rzi rzi-caret-right"]')
        this.newTestData = `TestData${Math.floor(Math.random() * 10000)}`
        this.newBtn = this.page.getByText('New', { exact: true })
    }

    async verifyUsersPage() {
        await this.page.waitForURL(this.userUrl)
        await expect(this.userTitle).toBeVisible()
    }

    async verifyUserCreation() {
        await this.addBtn.click()
        await this.addTitle.waitFor({ state: 'visible', timeout: 30000 })
        //await expect(this.page.getByText('Add Application User', { exact: true })).toBeVisible()
        await this.emailId.fill(`${this.newTestData}@cms.com`)
        const uName = await this.name.fill(`${this.newTestData}CMS`)
        console.log(uName)
        await this.dropDwnBx.click()
        await this.dropDwnList.last().waitFor({ state: 'visible', timeout: 30000 })
        await this.selectRole.click()
        await this.page.waitForTimeout(7000)
        await this.password.fill('Test123!')
        await this.confirmPwd.fill('Test123!')
        await this.saveBtn.click()
        //await expect(this.page.getByRole('cell',{name:`${uName}`})).toBeVisible()
        //await this.page.waitForTimeout(7000)
        //  await expect(this.page.getByText('User Created Successfully')).toBeVisible()

        const notificationMsg = this.page.locator('[class="rz-notification"]', { hasText: 'User Created Successfully' })
        await expect(notificationMsg).toBeVisible();
        await expect(notificationMsg).toBeHidden({ timeout: 7000 })
    }

    async validateAddApplication() {
        await this.addBtn.click()
        await this.addTitle.waitFor({ state: 'visible', timeout: 30000 })
        await this.saveBtn.click()
        await this.page.waitForTimeout(10000)
        await expect(this.page.getByText('Email is required', { exact: true })).toBeVisible()
        await expect(this.page.getByText('Name is required', { exact: true })).toBeVisible()
        await expect(this.page.getByText('Password is required', { exact: true })).toBeVisible()
        await expect(this.page.getByText('Confirm Password is required', { exact: true })).toBeVisible()
    }

    async verifyUserSearchFunc() {
        await this.filterIcon.click();
        await this.containsDropdown.filter({ hasText: 'Contains' }).nth(2)
        await this.nameTxtbox.nth(5).fill('Cms')
        await this.applyBtn.click()
        let isUserFound = false
        while (!isUserFound) {
            const nameCells = this.page.locator('table tbody tr td:nth-child(1)')
            console.log(nameCells)
            const count = await nameCells.count()
            for (let i = 0; i < count; i++) {
                const text = await nameCells.nth(i).innerText();
                if (text.includes('Cms')) {
                    isUserFound = true
                    break
                }
            }

            if (isUserFound) break;

            // const nextButton = this.page.locator('[class="rz-paginator-icon rzi rzi-caret-right"]')
            if (await this.nextPageBtn.isVisible() && await this.nextPageBtn.isEnabled()) {
                await this.nextPageBtn.click()
                await this.page.waitForTimeout(10000)
            }
            else {
                break
            }
        }
        expect(isUserFound).toBe(true)
    }

    async validateEditApllication() {
        await this.page.getByText('Test12345', { exact: true }).click()
        await expect(this.page.getByText('Edit Application User', { exact: true })).toBeVisible()
        await this.page.locator('[name="Email"]').fill('')
        await this.page.locator('[name="UserFullName"]').fill('')
        await this.saveBtn.click()
        await expect(this.page.getByText('Email is required', { exact: true })).toBeVisible()
        await expect(this.page.getByText('Name is required', { exact: true })).toBeVisible()
    }

    async validateConfirmPassword() {
        await this.page.getByText('Test12345', { exact: true }).click()
        await expect(this.page.getByText('Edit Application User', { exact: true })).toBeVisible()
        await this.password.fill('Test123!')
        await this.confirmPwd.fill('Test123')
        await this.saveBtn.click()
        await expect(this.page.getByText('Confirm Password does not match Password', { exact: true })).toBeVisible()
    }

    async verifyUserDeactivation() {
        await this.page.getByText('Test12345', { exact: true }).click()
        await expect(this.page.getByText('Edit Application User', { exact: true })).toBeVisible()
        await this.page.getByText('Deactivate User', { exact: true }).click()
        await this.page.waitForTimeout(5000)
        await expect(this.page.getByText('Are you sure you want to')).toBeVisible()
        await this.page.getByRole('button', { name: 'Deactivate', exact: true }).click()
        const notificationMsg = this.page.locator('[class="rz-notification"]', { hasText: 'User Deactivated' })
        await expect(notificationMsg).toBeVisible();
        await expect(notificationMsg).toBeHidden({ timeout: 7000 })
    }

    async verifyNewlyAddedFirm(){
        await this.page.getByText('xavier!', { exact: true }).click()
        await expect(this.page.getByText('Edit Application User', { exact: true })).toBeVisible()
        await expect(this.page.getByText('Additional Details', { exact: true })).toBeVisible()
        await expect(this.newBtn).toBeVisible()
        await this.newBtn.click()
        await expect(this.page.getByText('Add Firm', { exact: true })).toBeVisible()
        await this.page.locator('[name="Name"]').fill('TestFirm')
        await this.page.getByText('Choose Firm Type', { exact: true }).click()
        await this.page.getByRole('option', { name: 'Appraisers' }).click()
        await this.page.waitForTimeout(3000)
        await this.page.getByRole('button', { name: 'save Save' }).nth(1).click()
        await expect(this.page.getByText('Add Firm', { exact: true })).toBeHidden()
        await expect(this.page.locator(`label:has-text("TestFirm")`)).toBeVisible()
    }
    async verifyAddFirmPopup(){
        await this.page.getByText('xavier!', { exact: true }).click()
        await expect(this.page.getByText('Edit Application User', { exact: true })).toBeVisible()
        await expect(this.page.getByText('Additional Details', { exact: true })).toBeVisible()
        await expect(this.newBtn).toBeVisible()
        await this.newBtn.click()
        await expect(this.page.getByText('Add Firm', { exact: true })).toBeVisible()
        await this.page.locator('[name="Name"]').fill('AbcFirm')
        await this.page.getByText('Choose Firm Type', { exact: true }).click()
        await this.page.getByRole('option', { name: 'Appraisers' }).click()
        await this.page.waitForTimeout(3000)
        await this.page.getByText('Cancel', { exact: true }).last().click()
        await expect(this.page.getByText('Add Firm', { exact: true })).toBeHidden()
        await expect(this.page.locator(`label:not(has-text("AbcFirm"))`))
    }
}