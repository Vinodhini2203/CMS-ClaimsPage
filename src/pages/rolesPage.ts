import { Locator, Page, expect } from "@playwright/test";
//import { waitForDebugger } from "node:inspector";
//import { error } from "node:console";
//import testdata from "../testData/testData.json"

//const roleName: string = 'CmsTest_1'
export class RolesPage {

    page: Page;
    rolesHeading: Locator;
    rolesTable: Locator;
    addButton: Locator;
    nameTitle:Locator;
    addPopup: Locator;
    nameTxtbox: Locator;
    existingRole:Locator;
    saveButton: Locator;
    cancelButton: Locator;
    tableRows: Locator;
    nextButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.rolesTable = page.locator('[class="col-md-12"]');
        this.addButton = page.getByText('Add', { exact: true });
        this.nameTitle=this.page.getByTitle('Name')
        this.addPopup = page.locator('[class="rz-dialog-title"]');
        this.nameTxtbox = page.locator('[name="Name"]');
        this.existingRole=this.page.getByText('CmsTest_1', { exact: true })
        this.saveButton = page.getByText('Save', { exact: true });
        this.cancelButton = page.getByText('Cancel', { exact: true });
        this.tableRows = page.locator('table tbody tr');
        this.nextButton = this.page.locator('[class="rz-paginator-icon rzi rzi-caret-right"]')
        this.rolesHeading=this.page.getByRole('heading', { name: 'Roles' })
        
    }
    async verifyRolesPage() {
        await this.page.waitForURL('https://testcms.reco-claims.ca/application-roles')
        await expect(this.rolesTable).toBeVisible()
    }
    async verifyRolesHeading(){
        await expect(this.rolesHeading).toBeVisible()
    }
    async verifyAddButton(){
        await expect(this.addButton).toBeVisible()
        await expect(this.addButton).toBeEnabled()
    }

    async verifyColName(){
        await expect(this.nameTitle).toBeVisible()
    }

    async verifyExistingRoles(){
        await expect(this.existingRole).toBeVisible()
    }

    async verifyAddApplicationPopup() {
        await this.addButton.click()
        await this.addPopup.waitFor({ state: 'visible', timeout: 30000 })
        await expect(this.nameTxtbox).toBeVisible()
        await expect(this.saveButton).toBeVisible()
        await expect(this.cancelButton).toBeVisible()
    }
    async verifyNewRoleAdded(roleName: string) {
        //await this.nameTxtbox.fill(roleName)
        await this.nameTxtbox.fill(roleName)
        await this.saveButton.click()
        const rows = this.tableRows
        const rowsCount = await rows.count()
        for (let i = 0; i < rowsCount; i++) {
            const newRole = await rows.nth(i).textContent()
            if (newRole?.includes(roleName)) {
                return true
            }
            return false
        }
        await (this.tableRows, { hasText: roleName }, { state: 'visible', timeout: 60000 });
        await expect(this.page.locator('table tbody tr', { hasText: roleName })).toBeVisible()
        console.log("New Role Found")
    }
    async duplicateRoleValidation(roleName: string) {
        await this.nameTxtbox.fill(roleName)
        await this.saveButton.click()
        const rows = this.tableRows
        const rowsCount = await rows.count()
        for (let i = 0; i < rowsCount; i++) {
            const newRole = await rows.nth(i).textContent()
            if (newRole === (roleName)) {
                await expect(this.page.locator('[class="rz-notification"]').filter({ hasText: 'Cannot create role' })).toBeVisible()
            }
            return false
        }
    }
    /* async verifyDeleteRole(roleName: string) {
        const rows = this.tableRows
        const rowsCount = await rows.count()
        for (let i = 0; i < rowsCount; i++) {
            const newRole = await rows.nth(i).textContent()
            if (newRole === (roleName)) {
                await this.tableRows.filter({hasText:roleName}).getByText('close', { exact: true }).first().click()
            }
        }

      } */

    async verifyDeleteRole(roleName: string) {
        let isRoleFound = false

        while (!isRoleFound) {
            const targetRow = this.tableRows.filter({ hasText: roleName }).first()
           
            const targetRowCount = await targetRow.count()
            if (targetRowCount > 0) {
                await expect(targetRow).toBeVisible()
                console.log("Role we r looking:", roleName )
                console.log("Actual Row:",await targetRow.innerText())
                await targetRow.getByText('close', { exact: true }).click()
                // await expect(this.page.locator('.rz-dialog-titlebar')).toBeVisible()
                // await expect(this.page.getByText(`Delete role "${roleName}"?`)).toBeVisible()
                const dialog = this.page.locator('.rz-dialog-titlebar')
                await expect(dialog).toBeVisible()
                await expect(dialog).toContainText(`Delete role "${roleName}"?`)
                await dialog.getByText('Delete', { exact: true }).click()
                //await expect(this.tableRows.filter({ hasText: roleName })).toHaveCount(0)
                isRoleFound = true
            }
            else { 
                if (await this.nextButton.isDisabled()) {
                console.log(`Role "${roleName}" was not found on any page`)
                break
            }
            await this.nextButton.click()
        }
 
    }
}

}
