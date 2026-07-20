import { Page } from 'playwright'

export class CommonPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigateViaHomePage(parentMenu:string,childMenu?:string) {

        await this.page.getByText(parentMenu, { exact: true }).click()
        if(childMenu){
        await this.page.getByRole('link', { name: childMenu }).waitFor({ state: 'visible', timeout: 30000 })
        await this.page.getByRole('link', { name: childMenu }).click()
        }
        await this.page.waitForTimeout(30000)

    }

}