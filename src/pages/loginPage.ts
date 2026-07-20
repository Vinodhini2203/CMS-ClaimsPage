import { Locator, Page, expect } from '@playwright/test'
import testData from '../testData/testData.json'

//const {homePageUrl} = testData
export class LoginPage {

    page: Page;
    username: Locator;
    password: Locator;
    loginBtn: Locator;
    homePageUrl: string;
    panelMenu: Locator;
    baseUrl: string
    userNameValue: string
    passWordValue: string


    constructor(page: Page) {
        this.page = page
        this.username = page.locator('[name="Username"]')
        this.password = page.locator('[name="Password"]')
        this.loginBtn = page.locator('[type="submit"]')
        this.homePageUrl = 'https://testcms.reco-claims.ca'
        this.panelMenu = page.locator('[class="rz-panel-menu"]')
        this.baseUrl = process.env.BASE_URL || ''
        this.userNameValue = process.env.USER_NAME || ''
        this.passWordValue = process.env.PASS_WORD || ''
    }
    async LoginFunc() {
        await this.page.goto(`${this.baseUrl}/Login`)
        await this.username.fill(this.userNameValue)
        await this.password.fill(this.passWordValue)
        await this.loginBtn.click()
        await this.page.waitForURL(this.homePageUrl, { timeout: 60000 })
        // await expect(this.page('https://testcms.reco-claims.ca/')).toHaveUrl()
        await this.page.waitForTimeout(30000)
        await expect(this.panelMenu).toBeVisible()
    }
}
