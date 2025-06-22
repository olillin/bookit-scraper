import { BOOKIT_URL } from './constants.mjs'
import { Builder, Browser, By, Key, until } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/firefox.js'
import { TimeoutError } from 'selenium-webdriver/lib/error.js'

export function createCookie(username: string, password: string, timeout: number = 5000): Promise<string> {
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
            await driver.wait(until.urlMatches(/^https:\/\/bookit\.chalmers\.it.*/), timeout)

            const cookie = await driver.manage().getCookie('appSession')
            resolve(`${cookie.name}=${cookie.value}`)
        } catch (e) {
            if (e instanceof TimeoutError) {
                const url = await driver.getCurrentUrl()
                const pageBody = await driver.getPageSource()
                reject(`Gamma login timed out: ${e}\nCurrent page (${url}):\n${pageBody}`)
            }
        } finally {
            await driver.quit()
        }
    })
}