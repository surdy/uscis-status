const puppeteer = require('puppeteer')

const url = `https://egov.uscis.gov/casestatus/landing.do`
const formatYmd = date => date.toISOString().slice(0, 10)
function removeTags(str) {
    if ((str===null) || (str===''))
    return false
    else  {
        return str.replace('+','').trim().replace(/\r?\n|\r/g, " ").replace( /(<([^>]+)>)/ig, '')
    }
    
 }
async function run (receipt_num) {
    const today = formatYmd(new Date()) 
    const browser = await puppeteer.launch({
        executablePath: 'chromium',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage'
        ]
    })
    const page = await browser.newPage()
    //console.log("going to URL")
    await page.goto(url)
    await page.$eval('#receipt_number', (el,receipt) => el.value = `${receipt}`, receipt_num)
    await page.click('input[type="submit"]')
    //console.log("waiting for submission to be completed.")
    await page.waitForSelector('div.current-status-sec').catch(t => console.log("Not able to load status screen"))
    const status = removeTags(await page.$eval('.current-status-sec', el => el.innerText))
    //console.log(`${today}: ${status}`)
    console.log(`${status}`)
    await page.screenshot({path: `/output/${receipt_num}.png`})
    browser.close()
}
if (process.argv.length === 2) {
  console.error('Pass the receipt number as an argument.');
  process.exit(1);
}

run(process.argv[2])
