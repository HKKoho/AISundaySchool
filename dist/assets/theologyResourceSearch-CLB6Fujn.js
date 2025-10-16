import{G as E}from"./index-D51v0HB7.js";var $={};const p=$.GEMINI_API_KEY||"";p||console.warn("GEMINI_API_KEY not configured - search will not work");const x=new E({apiKey:p});var G=(e=>(e.GOOGLE_SEARCH="googleSearch",e.URL_CONTEXT="urlContext",e.CODE_EXECUTION="codeExecution",e.GENERAL_KNOWLEDGE="generalKnowledge",e))(G||{});async function y(e,n,c="googleSearch",t,o){if(!p)throw new Error("GEMINI_API_KEY is not configured. Please add it to .env.local to use search.");const h=n&&n!=="all"?`Focus on finding ${n} resources. `:"";let u="",r=[],w={};switch(c){case"googleSearch":u=`
你是一位神學研究專家。請使用 Google Search 搜尋關於「${e}」的神學資源。

${h}請找出：
1. 相關的神學書籍
2. 學術文章和論文
3. 聖經註釋
4. 神學百科條目
5. 可信的神學網站

對於每個資源，請提供：
- 準確的標題（中文或英文）
- 作者姓名
- 資源類型（書籍、文章、註釋、百科、論文、網站）
- 簡短描述（2-3句話）
- 網址（如果有）
- 相關標籤

請優先考慮正統基督教神學資源，並確保信息的準確性和學術性。
`,r=[{googleSearch:{}}];break;case"urlContext":if(!t||t.length===0)throw new Error("URL Context mode requires target URLs");u=`
請分析以下神學網站的內容，找出關於「${e}」的相關信息：

目標網站：
${t.map(i=>`- ${i}`).join(`
`)}

${h}請提供：
1. 每個網站上的相關內容
2. 作者或組織名稱
3. 資源類型
4. 關鍵引用和摘要
5. 內容的神學立場

請整理成結構化的資源列表。
`,r=[{urlContext:{urls:t}}];break;case"codeExecution":u=`
請使用代碼執行能力分析神學文獻搜尋結果「${e}」。

${h}執行以下任務：
1. 分類不同類型的神學資源
2. 統計資源的時代分布
3. 識別主要作者和學派
4. 生成資源推薦優先級

請提供結構化的分析報告和資源列表。
`,r=[{codeExecution:{}}];break;case"generalKnowledge":u=`
基於你的神學知識庫，請提供關於「${e}」的神學資源推薦。

${h}請列出：
1. 經典神學著作
2. 重要學者和作品
3. 相關聖經註釋
4. 神學百科條目
5. 推薦閱讀順序

請提供準確的書目信息和簡短描述。
`,r=[],w.temperature=.5;break}try{const i={temperature:w.temperature??.3,topP:.9,maxOutputTokens:3e3,...r.length>0&&{tools:r}},l=(await x.models.generateContent({model:"gemini-2.0-flash",contents:u,config:i})).text,a=_(l),g={googleSearch:"Google Search",urlContext:"URL Context",codeExecution:"Code Execution Analysis",generalKnowledge:"Knowledge Base"},f={reformed:"改革宗資源",catholic:"天主教資源",orthodox:"東正教資源",academic:"學術資源",chinese:"華人神學資源"};let d=`Gemini MCP: ${g[c]}`;return c==="urlContext"&&o&&(d=`${f[o]||o} (URL Context)`),{results:a.map(m=>({...m,source:m.source||d})),summary:`透過 ${g[c]} 找到 ${a.length} 個關於「${e}」的神學資源`}}catch(i){throw console.error("Theology search error:",i),new Error(`搜尋失敗：${i.message}`)}}function _(e){const n=[],c=e.split(/\n\d+\.\s+/).filter(t=>t.trim());for(const t of c)try{const o=C(t);o&&n.push(o)}catch(o){console.warn("Failed to parse section:",o)}return n}function C(e){const n=e.match(/(?:標題|Title|書名)[:：]\s*(.+?)(?:\n|$)/i),c=e.match(/(?:作者|Author)[:：]\s*(.+?)(?:\n|$)/i),t=e.match(/(?:描述|Description|簡介)[:：]\s*(.+?)(?:\n|$)/i),o=e.match(/(https?:\/\/[^\s]+)/),h=e.match(/(?:類型|Type)[:：]\s*(.+?)(?:\n|$)/i);if(!n)return null;const u=n[1].trim(),r=c?c[1].trim():"未知作者",w=t?t[1].trim():e.substring(0,150),i=o?o[1]:void 0,s=h?h[1].toLowerCase():"";let l="article";s.includes("書")||s.includes("book")?l="book":s.includes("註釋")||s.includes("commentary")?l="commentary":s.includes("百科")||s.includes("encyclopedia")?l="encyclopedia":s.includes("論文")||s.includes("thesis")?l="thesis":(s.includes("網")||s.includes("website"))&&(l="website");const a=[];return e.includes("神學")&&a.push("神學"),e.includes("聖經")&&a.push("聖經"),e.includes("改革宗")&&a.push("改革宗"),e.includes("系統神學")&&a.push("系統神學"),{title:u,author:r,type:l,description:w,url:i,tags:a,source:"Google Search (Gemini)"}}const O={reformed:["https://www.monergism.com","https://www.ligonier.org","https://www.thegospelcoalition.org"],catholic:["https://www.vatican.va","https://www.catholic.com","https://www.newadvent.org"],orthodox:["https://www.oca.org","https://www.goarch.org"],academic:["https://www.logos.com","https://www.biblicalstudies.org.uk","https://www.jstor.org"],chinese:["https://www.ccbiblestudy.org","https://www.cclw.net","https://www.livingwater4u.com"]};export{G as SearchMode,O as THEOLOGY_RESOURCE_URLS,y as searchTheologyResources};
