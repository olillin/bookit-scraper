import { BOOKIT_URL } from './constants.mjs'
import { Builder, Browser, By, Key, until } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/firefox.js'

export function createCookie(username: string, password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const options = new Options()
        options.addArguments('--headless')
        const driver = await new Builder()
            .setFirefoxOptions(options)
            .forBrowser(Browser.FIREFOX)
            .build()
        try {
            await driver.get(BOOKIT_URL)
            await driver.findElement(By.name('username')).sendKeys(username)
            await driver.findElement(By.name('password')).sendKeys(password, Key.RETURN)
            await driver.wait(until.urlMatches(/^https:\/\/bookit\.chalmers\.it.*/), 5000)

            const cookie = await driver.manage().getCookie('appSession')
            resolve(`${cookie.name}=${cookie.value}`)
        } catch (e) {
            reject(e)
        } finally {
            await driver.quit()
        }
    })
}