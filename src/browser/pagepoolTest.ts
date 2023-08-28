import puppeteer from 'puppeteer';
import { parsePage } from "../parser/parser";


export async function run(){
	{
		// Launch the browser and open a new blank page
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		
	
		// Navigate the page to a URL
		// const so =await page.goto('http://sc.cqnync.cn/marketSta/?vexp=1&classId=1');
		await page.goto("https://translate.google.com/", {
			waitUntil: "networkidle2",
		});
		const res = await parsePage(page, { text:"hello",
		 from:"auto",
		  to:"zh-CN",
			 lite:false });
		// console.log("🚀 ~ file: pagepoolTest.ts:18 ~ res >>>", res)
	const response = {
		result: res.result,
		pronunciation: res.pronunciation,
		from: {
			// iso: res.fromISO,
			pronunciation: res.fromPronunciation,
			didYouMean: res.fromDidYouMean,
			suggestions: res.fromSuggestions,
		},
		definitions: res.definitions,
		examples: res.examples,
		translations: res.translations,
	};
	console.log("🚀 ~ file: pagepoolTest.ts:35 ~ response >>>", response)

		try {
			const btnSelector = 'button[aria-label="Reject all"]';
			await page.waitForSelector(btnSelector, { timeout: 1000 });
			await page.$eval(btnSelector, (btn) => {
				(btn as HTMLButtonElement).click();
			});
			console.log("rejected privacy consent");
		} catch {
			console.log("no privacy consent");
		}
		// // console.log("🚀 ~ file: pagepoolTest.ts:13 ~ so >>>", so)
	
		// // Set screen size
		// // await page.setViewport({width: 1080, height: 1024});
	
		// // // Type into search box
		// // await page.type('.search-box__input', 'automate beyond recorder');
	
		// // // Wait and click on first result
		// const searchResultSelector = '#ctl00_list__list > tbody';
		// const aa = await page.waitForSelector(searchResultSelector);
		// console.log("🚀 ~ file: pagepoolTest.ts:21 ~ aa >>>", aa)
		// // await page.click(searchResultSelector);
	
		// // // Locate the full title with a unique string
		// // const textSelector = await page.waitForSelector(
		// // 	'text/Customize and automate'
		// // );
		// // console.log("🚀 ~ file: pagepoolTest.ts:28 ~ textSelector >>>", textSelector)
		// const fullTitle = await aa?.evaluate(el => el.textContent);
	
		// // // Print the full title
		// console.log('The title of this blog post is "%s".', fullTitle);
	
		await browser.close();
	}
}
