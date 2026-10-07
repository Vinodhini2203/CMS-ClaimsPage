import { expect } from "@playwright/test";
import { LoginPage } from "../src/Pages/loginPage";
import { CommonPage } from "../src/pages/commonPage";
import { UsersPage } from "../src/pages/usersPage";
import { test } from '../src/config/fixture'

test.describe('UsersPageTests', () => {

    let common: CommonPage
    let usersPage: UsersPage

    test.beforeEach(async ({ pageWithLogin }) => {
        common = new CommonPage(pageWithLogin)
        usersPage = new UsersPage(pageWithLogin)
    })

    test('TC-005_Verify Users page loads', async () => {
        await common.navigateViaHomePage('Administrator', 'Users')
        await usersPage.verifyUsersPage()
    })

    test('TC-006_Verify user creation with valid details', async () => {
        await common.navigateViaHomePage('Administrator', 'Users')
        await usersPage.verifyUsersPage()
        await usersPage.verifyUserCreation()
    })

    test('TC-007_Verify validation when required fields are empty', async () => {
        await common.navigateViaHomePage('Administrator', 'Users')
        await usersPage.verifyUsersPage()
        await usersPage.validateAddApplication()
    })

    test('TC-008_Verify user search functionality', async () => {
        await common.navigateViaHomePage('Administrator', 'Users')
        await usersPage.verifyUsersPage()
        await usersPage.verifyUserSearchFunc()
    })

    test('TC-022_Verify Validation messages should be displayed for all mandatory fields',async() => {
        await common.navigateViaHomePage('Administrator','Users')
        //await usersPage.verifyUserCreation()
        await usersPage.validateEditApllication()
    })

    test('TC-023_Verify User is deactivated successfully',async() => {
        await common.navigateViaHomePage('Administrator','Users')
        await usersPage.verifyUserDeactivation()
    })

    test('TC_024_Validate message indicating Password and Confirm Password do not match',async() => {
        await common.navigateViaHomePage('Administrator','Users')
        await usersPage.validateConfirmPassword()
    })
    
    test('TC_025_Verify Newly added firm is selectable and saved for the user',async() => {
        await common.navigateViaHomePage('Administrator','Users')
        await usersPage.verifyNewlyAddedFirm()
    })

    test('TC_026_Verify Add Firm popup is closed and entered data is not saved',async()=> {
        await common.navigateViaHomePage('Administrator','Users')
        await usersPage.verifyAddFirmPopup()
    })
})