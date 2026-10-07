import {test} from '../src/config/fixture'
import { RolesPage } from '../src/pages/rolesPage'
import { CommonPage } from '../src/pages/commonPage'
import { LoginPage } from '../src/Pages/loginPage'
import {Page} from '@playwright/test'

test.describe('Roles page testcases', () => {
    
    let rolesPage:RolesPage
    let common:CommonPage

    test.beforeEach(async({pageWithLogin}) => {
        rolesPage=new RolesPage(pageWithLogin)
        common=new CommonPage(pageWithLogin)        
    })

    test('TC_ROLE_001-Verify Roles page loads', async() => {
        await common.navigateViaHomePage('Administrator','Roles')
        await rolesPage.verifyRolesPage()
    })

    test('TC_ROLE_002-Verify Roles heading is displayed',async() => {
        await common.navigateViaHomePage('Administrator','Roles')
        await rolesPage.verifyRolesHeading()
    })

    test('TC_ROLE_003-Verify Add button is visible and enabled',async() => {
        await common.navigateViaHomePage('Administrator','Roles')
        await rolesPage.verifyAddButton()
    })

    test('TC_ROLE_004-Verify Name column is displayed',async() => {
        await common.navigateViaHomePage('Administrator','Roles')
        await rolesPage.verifyColName()
    })

    // test('TC_ROLE_005-Verify existing roles are displayed',async() => {
        
    // })
})