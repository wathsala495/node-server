import {createServer} from 'node:http'
import {fileURLToPath} from 'node:url'
import {dirname,join} from 'node:path'
import {pool} from 'workerpool'
import { error } from 'node:console'
import {log} from 'node:console'

const __filename = fileURLToPath(import.meta.url)
 const __dirname = dirname(__filename)

const port=process.env.PORT  || 3000
const fileReadPool=pool(join(__dirname,'file-read-workers.js'))

const server=createServer(async (req,res)=>{
    log(req.url)
     if(req.url==='/'){
        res.writeHead(200,{'Content-Type':'text/html'})

        try {
              const result=await  fileReadPool
              .exec('html', ['index.html'])
              res.end(result)
        } catch (error) {
            
        }
        finally{
          fileReadPool.terminate()
        }
       
      
     }else if(req.url==='/about'){
        res.writeHead(200,{'Content-Type':'text/html'})

        try {
              const result=await  fileReadPool
              .exec('html', ['about.html'])
              res.end(result)
        } catch (error) {
            
        }
        finally{
          fileReadPool.terminate()
        }
     }
})
server.listen(3000,()=>log("server Running..."+port))