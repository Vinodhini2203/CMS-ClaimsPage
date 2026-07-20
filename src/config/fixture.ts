import {test as baseTest,Page} from '@playwright/test'
import { LoginPage } from '../Pages/loginPage'

type LoginFixtures = {
    pageWithLogin: Page
}

export const test = baseTest.extend<LoginFixtures> ({
    pageWithLogin:async ({page},use) => {
        const login = new LoginPage(page)
        await login.LoginFunc()
        await use(page)
    }
})