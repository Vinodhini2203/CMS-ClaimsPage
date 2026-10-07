//import { test, expect, Page } from '@playwright/test'
import { LoginPage } from '../src/Pages/loginPage'
import { CommonPage } from '../src/pages/commonPage'
import { RolesPage } from '../src/pages/rolesPage'
import {test} from '../src/config/fixture'

test.describe('Roles Page Tests', () => {

    let rolesPage:RolesPage
    let common:CommonPage

    test.beforeEach(async ({pageWithLogin}) => {
        rolesPage = new RolesPage(pageWithLogin)
        common = new CommonPage(pageWithLogin)

    })

    test("TC-001_Verify Roles page loads successfully", async () => {
        await common.navigateViaHomePage('Administrator','Roles')
        await rolesPage.verifyRolesPage()
    })

    test('TC-002_Verify user can open Add Application Role popup', async () => {
        await common.navigateViaHomePage('Administrator','Roles')
        await rolesPage.verifyRolesPage()
        await rolesPage.verifyAddApplicationPopup()
    })

    test('TC-003_Verify user can create a new role', async () => {
    
        await common.navigateViaHomePage('Administrator','Roles')
        await rolesPage.verifyRolesPage()
        await rolesPage.verifyAddApplicationPopup()
        await rolesPage.verifyNewRoleAdded('CmsTest_1')
    })

    test('TC-004_Verify role cannot be created with duplicate name', async () => {
        await common.navigateViaHomePage('Administrator','Roles')
        await rolesPage.verifyRolesPage()
        await rolesPage.verifyAddApplicationPopup()
        await rolesPage.duplicateRoleValidation('CmsTest_1')
    })

    test.only('TC-016_Verify Role should be deleted after confirmation', async () => {
        await common.navigateViaHomePage('Administrator','Roles')
        await rolesPage.verifyRolesPage()
        await rolesPage.verifyDeleteRole('C_Test_2')
    })

})

