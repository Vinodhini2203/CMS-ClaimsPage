import { expect } from '@playwright/test'
import { test } from '../src/config/fixture'
import { CommonPage } from '../src/pages/commonPage'
import { ClaimsPage } from '../src/pages/claimsPage'

test.describe('Claims Page Tests', () => {

    let common: CommonPage
    let claims: ClaimsPage

    test.beforeEach(async ({ pageWithLogin }) => {
        common = new CommonPage(pageWithLogin)
        claims = new ClaimsPage(pageWithLogin)
    })

    test('TC-009_Verify Claims Page Navigation', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyClaimsPage()

    })

    test('TC-010_Verify new claim creation with valid details', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyClaimsPage()
        await claims.verifyNewClaimCreation()
    })

    test('TC-011_Verify validation for empty claim fields', async () => {
        await await common.navigateViaHomePage('Claims')
        await claims.verifyClaimsPage()
        await claims.validateMandatoryFields()
    })

    test('TC-_Verify Insured(s) selection during claim creation', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyClaimsPage()
        await claims.verifyInsuredPage()
    })

    test('TC-012_Verify occurrence selection during claim creation', async () => {

        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
    })

    test('TC-013_Verify Receiver section add functionality', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.verifyReceiverAddFunc()
    })

    test('TC-014_Verify Brokerage section add functionality', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.verifyBrokerageAddFunc()
    })

    test('TC-015_Verify system prevents saving claim without required fields', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyRequiredFields()
    })

    test('TC-017_Verify Brokerage and Receiver button should be visible and enable', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.verifyBrokerageAndReceiver()
    })

    test('TC-018_Verify "Name is required" validation message in brokerage section', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.verifyNameValidation()
    })

    test('TC_019_Verify Brokerage record should be saved successfully ', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.verifyBrokerageSaved()
    })

    test('TC_020_Verify "Name is required" validation message in receiver section', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.verifyNameValidation()

    })

    test('TC_21_Verify receiver record should be saved successfully', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.verifyReceiverSaved()
    })

    test('TC-027_Verify System should display the validation message:"Name is required"', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.validateClaimantName()
    })

    test('TC-028_Verify Claimant Solicitor should be saved successfully and available in dropdown.', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.verifyAndSaveClaimantSolicitor()
    })

    test('TC-029_Verify System should display the validation message:"Name is required"', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.validateSolicitorName()
    })

    test('TC-030_Verify Claimant Solicitor with Province,save and available in dropdown', async () => {
        await common.navigateViaHomePage('Claims')
        await claims.verifyOccuranceSelection()
        await claims.verifyClaimantSolWithProvince()
    })
})
