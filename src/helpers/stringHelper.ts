export const stringToId = (string:string):string => {
    return string
            .replace(/[^\w\s]/gi,'')
            .replace(/( |\n)/g,'')
            .toLowerCase()
}