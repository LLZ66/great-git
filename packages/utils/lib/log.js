import log from 'npmlog';
import isDebug from './isDebug.js'

if(isDebug) {
    log.level = 'verbose'
}else {
    log.level = 'info'
}

log.heading = 'llz';
log.headingStyle = {
    bg: 'green'
}

export default log