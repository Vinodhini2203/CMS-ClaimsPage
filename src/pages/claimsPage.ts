import { Locator, expect, Page } from '@playwright/test'
//import { waitForDebugger } from 'node:inspector'
//nimport { time } from 'node:console';

export class ClaimsPage {
    page: Page
    newClaimBtn: Locator
    newClaimPage: Locator
    tablist: Locator
    claimInitDropdown: Locator
    selectPolicyYear: Locator
    selectedYear: Locator
    reportDate: Locator
    selectedClaimInitiation: Locator
    nextButton: Locator
    addInsuredBtn: Locator
    addBtn: Locator
    tradeTab: Locator
    primeLocation: Locator
    address1: Locator
    saveBtn: Locator
    reportDatErr: Locator
    claimInitErr: Locator
    insuredTab: Locator
    newCDCPClaimBtn: Locator
    chooseProg: Locator
    selectProg: Locator
    selectOccurance: Locator
    chooseOccurance: Locator
    occuranceNo: Locator
    occDetailsTab: Locator
    masterFile: Locator
    receiverLabel: Locator
    nameTxtBox: Locator
    newBtn: Locator
    addReceiverlabel: Locator
    brokerLabel: Locator
    addBrokerLabel: Locator
    selectProgErr: Locator
    contractYearErr: Locator
    selectOccuranceErr: Locator
    enterAddressErr: Locator
    selectClaimantErr: Locator
    nameReqErr: Locator
    searchBox:Locator
    lookupPanel:Locator
    frame:Locator
    newTestData:string
    claimantsListTitle:Locator
    claimantSolTxtBox:Locator
    newClaimantBtn:Locator
    addClaimantLabel:Locator
    solicitorFieldset:Locator
    addClaimantSolLabel:Locator
    claimantAddress:Locator
    claimantCity:Locator
    claimantPCode:Locator
    claimantProvince:Locator
    constructor(page: Page) {
        this.page = page;
        this.newClaimBtn = page.getByRole('button', { name: 'New Claim' })
        this.newClaimPage = page.locator('[class="rz-body"]')
        this.tablist = page.getByRole('tablist')
        this.claimInitDropdown = page.locator('label').filter({ hasText: 'Choose Initial Trigger' })
        this.selectPolicyYear = this.page.locator('.rz-dropdown-label').nth(2)
        this.selectedYear = this.page.getByRole('option', { name: '2025-26' })
        this.reportDate = this.page.locator('[id="ReportDate"]')
        this.selectedClaimInitiation = this.page.getByRole('option', { name: 'Application' })
        this.nextButton = this.page.getByRole('link', { name: 'Next' })
        this.addInsuredBtn = this.page.getByText('Add Insured', { exact: true })
        this.addBtn = this.page.getByText('Add', { exact: true })
        this.tradeTab = this.page.locator('.rz-steps-item', { hasText: 'Trade' })
        this.primeLocation = this.page.locator('[class="rz-fieldset-legend"]')
        this.address1 = this.page.locator('[name="TradeAddress1"]')
        this.saveBtn = this.page.getByText('Save', { exact: true })
        this.reportDatErr = this.page.getByText('Please enter a Report Date', { exact: true })
        this.claimInitErr = this.page.locator('[class="rz-message rz-messages-error "]').nth(1)
        this.insuredTab = this.page.locator('.rz-steps-item', { hasText: 'Insured(s)' })
        this.newCDCPClaimBtn = page.getByText('New CD/CP Claim', { exact: true })
        this.chooseProg = this.page.getByText('Choose Program', { exact: true })
        this.selectProg = this.page.getByRole('option', { name: 'Consumer Deposit Program' })
        this.selectOccurance = this.page.getByText('Select Occurrence', { exact: true })
        this.chooseOccurance = this.page.getByText('Choose Occurrence', { exact: true })
        this.occuranceNo = this.page.getByText('CD2025-010', { exact: true })
        this.occDetailsTab = this.page.getByText('Occurrence Details', { exact: true })
        this.masterFile = this.page.getByRole('tab')
        this.receiverLabel = this.page.getByText('Receiver', { exact: true })
        this.nameTxtBox = this.page.locator('[name="Name"]')
        this.newBtn = this.page.getByText('New', { exact: true })
        this.addReceiverlabel = this.page.getByText('Add Receiver', { exact: true })
        this.brokerLabel = this.page.getByText('Brokerage', { exact: true }).first()
        this.addBrokerLabel = this.page.getByText('Add Brokerage', { exact: true })
        this.selectProgErr = page.getByText('Please select a Program', { exact: true })
        this.contractYearErr = page.getByText('Please select a Contract Year', { exact: true })
        this.selectOccuranceErr = page.getByText('Please select an Occurrence', { exact: true })
        this.enterAddressErr = page.getByText('Must enter an Address', { exact: true })
        this.selectClaimantErr = page.getByText('Must select a Claimant', { exact: true })
        this.nameReqErr = this.page.getByText('Name is required', { exact: true })
        this.searchBox=this.page.getByRole('textbox', { name: 'Search...' })
        this.lookupPanel=this.page.locator('.rz-lookup-panel')
        this.frame=page.locator('#PING_IFRAME_FORM_DETECTION')
        this.newTestData=`TestData${Math.floor(Math.random()*10000)}`
        this.claimantsListTitle=this.page.getByText('List of Claimants', { exact: true })
        this.claimantSolTxtBox=this.page.locator('.rz-dropdown.valid.rz-clear').nth(1)
        this.newClaimantBtn=this.page.getByText('New Claimant', { exact: true })
        this.addClaimantLabel=this.page.getByText('Add Claimant', { exact: true })
        this.solicitorFieldset=this.page.locator('.rz-fieldset').nth(1)
        this.addClaimantSolLabel=this.page.getByText('Add Claimant Solicitor', { exact: true })
        this.claimantAddress=this.page.locator('[name="Address"]').nth(1)
        this.claimantCity=this.page.locator('[name="City"]').nth(1)
        this.claimantPCode=this.page.locator('[name="PostalCode"]').nth(1)
        this.claimantProvince=this.page.getByText('Choose Province AB BC MB NB')
    }

    async verifyClaimsPage() {
        await this.newClaimBtn.click()
        await this.newClaimPage.waitFor({ state: 'visible', timeout: 10000 })
        await this.page.locator('svg').isDisabled()
        await expect(this.tablist).toBeVisible()
    }

    async verifyNewClaimCreation() {
        await this.selectPolicyYear.click()
        await this.selectedYear.click()
        await this.reportDate.fill('6/27/2026')
        await expect(this.reportDate).toHaveValue('6/27/2026')
        await this.claimInitDropdown.click()
        await this.selectedClaimInitiation.click();
        await this.page.waitForTimeout(10000)
        await this.nextButton.click()
        await expect(this.addInsuredBtn).toBeVisible()
        await this.nextButton.click()
        await expect(this.addBtn).toBeVisible()
        await this.page.waitForTimeout(10000)
        await this.nextButton.click()
        await expect(this.tradeTab).toBeVisible()
        await this.primeLocation.click()
        await this.address1.fill('Kovai')
        await this.saveBtn.click();
        const notificationMsg = this.page.locator('[class="rz-notification"]', { hasText: 'Claim Has Been Saved ' })
        await expect(notificationMsg).toBeVisible();
        await expect(notificationMsg).toBeHidden({ timeout: 7000 })
    }
    async validateMandatoryFields() {
        await this.nextButton.click()
        await expect(this.reportDatErr).toBeVisible()
        await expect(this.claimInitErr).toBeVisible()
        await this.selectPolicyYear.click()
        await this.selectedYear.click()
        await this.reportDate.fill('6/27/2026')
        await expect(this.reportDate).toHaveValue('6/27/2026')
        await this.claimInitDropdown.click()
        await this.selectedClaimInitiation.click();
        await this.page.waitForTimeout(10000)
        await this.nextButton.click()
        await expect(this.addInsuredBtn).toBeVisible()
        await this.nextButton.click()
        await expect(this.addBtn).toBeVisible()
        await this.page.waitForTimeout(10000)
        await this.nextButton.click()
        await expect(this.tradeTab).toBeVisible()
        await this.primeLocation.click()
        await this.saveBtn.click();
        const notificationMsg = this.page.locator('[class="rz-notification"]', { hasText: 'Address is required' })
        await expect(notificationMsg).toBeVisible();
        await expect(notificationMsg).toBeHidden({ timeout: 7000 })

    }

    async verifyInsuredPage() {
        await this.selectPolicyYear.click()
        await this.selectedYear.click()
        await this.reportDate.fill('6/27/2026')
        await expect(this.reportDate).toHaveValue('6/27/2026')
        await this.claimInitDropdown.click()
        await this.selectedClaimInitiation.click();
        await this.page.waitForTimeout(10000)
        await this.nextButton.click()
        // const insuredTab = this.page.locator('.rz-steps-item', { hasText: 'Insured(s)' })
        await expect(this.insuredTab).toHaveClass(/rz-state-highlight/)
        await expect(this.insuredTab).toHaveClass(/rz-steps-current/);
    }

    async verifyOccuranceSelection() {
        await this.newCDCPClaimBtn.click()
        await this.chooseProg.click()
        await this.selectProg.click()
        await this.page.waitForTimeout(7000)
        await expect(this.selectPolicyYear).toBeVisible()
        await this.selectPolicyYear.click()
        await this.selectedYear.click()
        await this.page.waitForTimeout(7000)
        await expect(this.selectOccurance).toBeVisible()
        await this.chooseOccurance.click()
        await this.occuranceNo.click()
        await this.reportDate.fill('7/1/2026')
        await expect(this.reportDate).toHaveValue('7/1/2026')
        await this.page.waitForTimeout(7000)
        await this.nextButton.click()
        await this.page.waitForTimeout(7000)
        await expect(this.occDetailsTab).toBeVisible()
        await expect(this.masterFile).toBeVisible()
    }
    async verifyReceiverAddFunc() {
        await expect(this.receiverLabel).toBeVisible()
        await this.newBtn.nth(1).click()
        await expect(this.addReceiverlabel).toBeVisible()
        await this.nameTxtBox.fill(this.newTestData)
        await this.saveBtn.click()
        await this.page.waitForTimeout(7000)
        await expect(this.page.locator('[class="rz-dropdown valid"]', { hasText: this.newTestData })).toBeVisible()
    }
    async verifyBrokerageAndReceiver() {
        await expect(this.brokerLabel.first()).toBeVisible()
        await expect(this.newBtn.first()).toBeEnabled()
        await expect(this.receiverLabel).toBeVisible()
        await expect(this.newBtn.nth(1)).toBeEnabled()
    }
    async verifyBrokerageAddFunc() {
        await expect(this.brokerLabel).toBeVisible()
        await this.newBtn.first().click()
        await expect(this.addBrokerLabel).toBeVisible()
        await this.nameTxtBox.fill(this.newTestData)
        await this.saveBtn.click()
        await expect(this.addBrokerLabel).toBeHidden({ timeout: 10000 })
        await expect(this.page.locator('[class="rz-dropdown valid"]', { hasText: this.newTestData })).toBeVisible()
    }
    async verifyRequiredFields() {
        await this.newCDCPClaimBtn.click()
        await this.page.waitForTimeout(5000)
        await this.nextButton.click()
        await expect(this.selectProgErr).toBeVisible()
        await expect(this.contractYearErr).toBeVisible()
        await this.chooseProg.click()
        await this.selectProg.click()
        await this.page.waitForTimeout(7000)
        await expect(this.selectPolicyYear).toBeVisible()
        await this.selectPolicyYear.click()
        await this.selectedYear.click()
        await this.page.waitForTimeout(7000)
        await expect(this.selectOccurance).toBeVisible()
        await this.nextButton.click()
        await expect(this.selectOccuranceErr).toBeVisible()
        await expect(this.reportDatErr).toBeVisible()
        await this.chooseOccurance.click()
        await this.occuranceNo.click()
        await this.reportDate.fill('7/1/2026')
        await expect(this.reportDate).toHaveValue('7/1/2026')
        await this.page.waitForTimeout(7000)
        await this.nextButton.click()
        await this.page.waitForTimeout(7000)
        await expect(this.occDetailsTab).toBeVisible()
        await expect(this.masterFile).toBeVisible()
        await this.nextButton.click()
        await this.saveBtn.click()
        await expect(this.selectClaimantErr).toBeVisible()
        await expect(this.enterAddressErr).toBeVisible()
    }
    async verifyNameValidation() {
        await expect(this.brokerLabel).toBeVisible()
        await this.newBtn.first().click()
        await expect(this.addBrokerLabel).toBeVisible()
        await this.saveBtn.click()
        await expect(this.nameReqErr).toBeVisible()
    }
    async verifyBrokerageSaved() {
        await expect(this.brokerLabel).toBeVisible()
        await this.newBtn.first().click()
        await expect(this.addBrokerLabel).toBeVisible()
        await this.nameTxtBox.fill(this.newTestData)
        await this.saveBtn.click()
        await expect(this.addBrokerLabel).toBeHidden({ timeout: 10000 })
        const addedBroker = this.page.locator('[class="rz-dropdown valid"]', { hasText: this.newTestData })
        await expect(addedBroker).toBeVisible()
        await addedBroker.locator('[class="rz-dropdown-trigger  rz-corner-right"]').click()
        await this.page.waitForLoadState("load")
        await expect(this.searchBox).toBeVisible()
        await this.searchBox.pressSequentially(this.newTestData)
        await expect(this.page.getByRole('cell', { name: this.newTestData })).toBeVisible()
    }
    async verifyReceiverSaved() {
        await expect(this.receiverLabel).toBeVisible()
        await this.newBtn.nth(1).click()
        await expect(this.addReceiverlabel).toBeVisible()
        await this.nameTxtBox.fill(this.newTestData)
        await this.saveBtn.click()
        await expect(this.addReceiverlabel).toBeHidden({ timeout: 10000 })
        const addedReceiver = this.page.locator('[class="rz-dropdown valid"]', { hasText: this.newTestData })
        await expect(addedReceiver).toBeVisible()
        await addedReceiver.locator('[class="rz-dropdown-trigger  rz-corner-right"]').click()
        await this.page.waitForLoadState("load")
        await expect(this.searchBox).toBeVisible()
        await this.searchBox.pressSequentially(this.newTestData)
        await expect(this.page.getByRole('cell', { name: this.newTestData })).toBeVisible()
    }
    async validateClaimantName(){
        await this.nextButton.click()
        await expect (this.claimantsListTitle).toBeVisible()
        await this.page.getByText('New Claimant', { exact: true }).click()
        await this.page.waitForTimeout(10000)
        await expect(this.page.getByText('Add Claimant', { exact: true })).toBeVisible()
        await this.saveBtn.nth(0).click()
        await this.page.waitForTimeout(12000)
        await expect(this.nameReqErr).toBeVisible()
    }
    async validateSolicitorName(){
        await this.nextButton.click()
        await expect (this.claimantsListTitle).toBeVisible()
        await this.newClaimantBtn.click()
        await this.page.waitForTimeout(10000)
        await expect(this.addClaimantLabel).toBeVisible()
        await expect(this.solicitorFieldset).toBeVisible()
        await this.newBtn.nth(1).click()
        await this.page.waitForTimeout(10000)
        await expect(this.addClaimantSolLabel).toBeVisible()
        await this.page.getByRole('button', { name: 'save Save' }).click()
        await expect(this.nameReqErr).toBeVisible()
    }
    async verifyAndSaveClaimantSolicitor(){
        await this.nextButton.click()
        await expect (this.claimantsListTitle).toBeVisible()
        await this.newClaimantBtn.click()
        await this.page.waitForTimeout(10000)
        await expect(this.addClaimantLabel).toBeVisible()
        await expect(this.solicitorFieldset).toBeVisible()
        await this.newBtn.nth(1).click()
        await this.page.waitForTimeout(10000)
        await expect(this.addClaimantSolLabel).toBeVisible()
        await this.nameTxtBox.nth(1).fill(this.newTestData)
        await this.claimantAddress.fill('CBE')
        await this.claimantCity.fill('CBE')
        await this.claimantPCode.fill('A1A2A3')
        await this.page.getByRole('button', { name: 'save Save' }).click()
        await expect(this.addClaimantSolLabel).toBeHidden()
        const addedClaimantSol=await this.claimantSolTxtBox.filter({hasText: this.newTestData})
        await expect(addedClaimantSol).toBeVisible()
        await addedClaimantSol.locator('[class="rz-dropdown-trigger  rz-corner-right"]').click()
        await this.page.waitForLoadState("load")
        await expect(this.searchBox).toBeVisible()
        await this.searchBox.pressSequentially(this.newTestData)
        await expect(this.page.getByRole('cell', { name: this.newTestData })).toBeVisible()
    }
    async verifyClaimantSolWithProvince(){
        await this.nextButton.click()
        await expect (this.claimantsListTitle).toBeVisible()
        await this.newClaimantBtn.click()
        await this.page.waitForTimeout(10000)
        await expect(this.addClaimantLabel).toBeVisible()
        await expect(this.solicitorFieldset).toBeVisible()
        await this.newBtn.nth(1).click()
        await this.page.waitForTimeout(10000)
        await expect(this.addClaimantSolLabel).toBeVisible()
        await this.nameTxtBox.nth(1).fill(this.newTestData)
        await this.claimantAddress.fill('CBE')
        await this.claimantCity.fill('CBE')
        await this.claimantProvince.click()
        await this.claimantProvince.filter({hasText:'ON'}).click()
        await this.page.getByRole('option', { name: 'AB', exact: true }).click()
        await expect(this.page.locator('label').filter({ hasText: 'AB' })).toBeVisible()
        await this.claimantPCode.fill('A1A2A3')
        await this.page.getByRole('button', { name: 'save Save' }).click()
        await expect(this.addClaimantSolLabel).toBeHidden()
        const addedClaimantSol=await this.claimantSolTxtBox.filter({hasText: this.newTestData})
        await expect(addedClaimantSol).toBeVisible()
        await addedClaimantSol.locator('[class="rz-dropdown-trigger  rz-corner-right"]').click()
        await this.page.waitForLoadState("load")
        await expect(this.searchBox).toBeVisible()
        await this.searchBox.pressSequentially(this.newTestData)
        await expect(this.page.getByRole('cell', { name: this.newTestData })).toBeVisible()
    }
    
}