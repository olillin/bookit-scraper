import { BOOKIT_URL } from './constants.mjs'
import { Builder, Browser, By, Key, until, IWebDriverOptionsCookie } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/firefox.js'
import { TimeoutError } from 'selenium-webdriver/lib/error.js'

/**
 * Log in to BookIT with Gamma and get the generated cookie
 * @param username The username or email of the Gamma account
 * @param password The password for the Gamma account
 * @param timeout How long to wait before timing out the Gamma login in milliseconds
 * @returns The cookie as a string. Ready to be sent in a `Cookie` header
 */
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
            resolve(serializeCookie(cookie))
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

/**
 * Serialize a cookie object from Selenium into a string
 * @param cookie The cookie from Seleniums `getCookie` method
 * @returns The cookie as a string. Ready to be sent in a `Cookie` header
 */
export function serializeCookie(cookie: IWebDriverOptionsCookie): string {
    const attributes = [
        `${cookie.name}=${cookie.value}`,
        cookie.domain ? `Domain=${cookie.domain}` : null,
        cookie.expiry ? `Expires=${formatExpiryDate(cookie.expiry)}` : null,
        cookie.httpOnly ? 'HttpOnly' : null,
        cookie.path ? `Path=${cookie.path}` : null,
        cookie.secure ? 'Secure' : null,
        cookie.sameSite ? `SameSite=${cookie.sameSite}` : null,
    ].filter(x => !!x)
    return attributes.join(';')
}

/** Convert a date or number into a UTC date string */
export function formatExpiryDate(date: number | Date): string {
    return (typeof date === 'number' ? new Date(date * 1000) : date).toUTCString()
}