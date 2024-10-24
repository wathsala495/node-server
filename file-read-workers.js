import {worker} from 'workerpool'

import {fileURLToPath} from 'node:url'
import {dirname,join} from 'node:path'
import {readFileSync} from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
 const __dirname = dirname(__filename)

const readHTMLFile=(filename)=>{
      const data=readFileSync(join(__dirname,'public',filename))
      return data
}
worker({
    html:readHTMLFile
})