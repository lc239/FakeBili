// obj:{svg} initFunc:svg => void
function svgObjLoad(loadEvent, initFunc, obj){
    if(obj) obj.svg = loadEvent.target.contentDocument.firstChild
    initFunc(loadEvent.target.contentDocument.firstChild)
}
export { svgObjLoad }