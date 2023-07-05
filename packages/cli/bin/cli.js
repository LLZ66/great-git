#!/usr/bin/env node

import importLocal from 'import-local';
import entry from '../lib/index.js'

entry(process.argv)


// if(importLocal(import.meta.url)) {
//     console.log("使用本地版本");
// }else {
// }